import React from 'react';
import { DicomMetadataStore } from '@ohif/core';
import { getI18n } from 'react-i18next';
import i18n from '@ohif/i18n';

/**
 *
 * @param {*} servicesManager
 */
async function createReportAsync({ servicesManager, getReport, reportType = 'measurement' }) {
  const { displaySetService, uiNotificationService, uiDialogService } = servicesManager.services;
  const loadingDialogId = uiDialogService.create({
    showOverlay: true,
    isDraggable: false,
    centralize: true,
    content: Loading,
  });
  const i18n = getI18n();
  try {
    const naturalizedReport = await getReport();

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    DicomMetadataStore.addInstances([naturalizedReport], true);

    const displaySet = displaySetService.getMostRecentDisplaySet();

    const displaySetInstanceUID = displaySet.displaySetInstanceUID;

    uiNotificationService.show({
      title: i18n.t('MeasurementTable:Create Report'),
      message: `${reportType} ${i18n.t("Dialog:saved successfully")}`,
      type: 'success',
    });

    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: i18n.t('MeasurementTable:Create Report'),
      message: error.message || `${i18n.t("Dialog:Failed to store")} ${reportType}`,
      type: 'error',
    });
  } finally {
    uiDialogService.dismiss({ id: loadingDialogId });
  }
}

function Loading() {
  return <div className="text-primary-active">{i18n.t("Common:Loading")}...</div>;
}

export default createReportAsync;
