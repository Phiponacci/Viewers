import React from 'react';
import { ServicesManager, CommandsManager, ExtensionManager } from '@ohif/core';
import { useViewportGrid } from '@ohif/ui';
import MicroscopyPanel from './components/MicroscopyPanel/MicroscopyPanel';
import { getI18n } from 'react-i18next';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

export default function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager,
}: {
  servicesManager: ServicesManager;
  commandsManager: CommandsManager;
  extensionManager: ExtensionManager;
}) {
  const wrappedMeasurementPanel = () => {
    const [{ activeViewportId, viewports }] = useViewportGrid();

    return (
      <MicroscopyPanel
        viewports={viewports}
        activeViewportId={activeViewportId}
        onSaveComplete={() => { }}
        onRejectComplete={() => { }}
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
      />
    );
  };
  const i18n = getI18n();
  return [
    {
      name: 'measure',
      iconName: 'tab-linear',
      label: i18n.t("MeasurementTable:Measurements"),
      iconLabel: 'Measure',
      secondaryLabel: i18n.t("MeasurementTable:Measurements"),
      component: wrappedMeasurementPanel,
    },
  ];
}
