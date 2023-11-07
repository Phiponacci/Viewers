import React from 'react';
import { WrappedPanelStudyBrowser, PanelMeasurementTable } from './Panels';
import { getI18n } from 'react-i18next';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  const i18n = getI18n()
  const wrappedMeasurementPanel = () => {
    return (
      <PanelMeasurementTable
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
      />
    );
  };

  return [
    {
      name: 'seriesList',
      iconName: 'tab-studies',
      iconLabel: 'Studies',
      label: i18n.t('StudyList:Studies'),
      component: WrappedPanelStudyBrowser.bind(null, {
        commandsManager,
        extensionManager,
        servicesManager,
      }),
    },
    {
      name: 'measure',
      iconName: 'tab-linear',
      iconLabel: 'Measure',
      label: i18n.t('MeasurementTable:Measurements'),
      secondaryLabel: i18n.t('MeasurementTable:Measurements'),
      component: wrappedMeasurementPanel,
    },
  ];
}

export default getPanelModule;
