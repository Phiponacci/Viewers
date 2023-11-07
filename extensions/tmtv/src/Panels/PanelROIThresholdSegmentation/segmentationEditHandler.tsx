import React from 'react';
import { Input, Dialog, ButtonEnums } from '@ohif/ui';
import i18n from '@ohif/i18n';

function segmentationItemEditHandler({ id, servicesManager }) {
  const { segmentationService, uiDialogService } = servicesManager.services;

  const segmentation = segmentationService.getSegmentation(id);

  const onSubmitHandler = ({ action, value }) => {
    switch (action.id) {
      case 'save': {
        segmentationService.addOrUpdateSegmentation(
          {
            ...segmentation,
            ...value,
          },
          false, // don't suppress event
          true // it should update cornerstone
        );
      }
    }
    uiDialogService.dismiss({ id: 'enter-annotation' });
  };

  uiDialogService.create({
    id: 'enter-annotation',
    centralize: true,
    isDraggable: false,
    showOverlay: true,
    content: Dialog,
    contentProps: {
      title: i18n.t('Dialog:Enter your Segmentation'),
      noCloseButton: true,
      value: { label: segmentation.label || '' },
      body: ({ value, setValue }) => {
        const onChangeHandler = event => {
          event.persist();
          setValue(value => ({ ...value, label: event.target.value }));
        };

        const onKeyPressHandler = event => {
          if (event.key === 'Enter') {
            onSubmitHandler({ value, action: { id: 'save' } });
          }
        };
        return (
          <Input
            autoFocus
            className="border-primary-main bg-black"
            type="text"
            containerClassName="mr-2"
            value={value.label}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
          />
        );
      },
      actions: [
        { id: 'cancel', text: i18n.t("Common:Cancel"), type: ButtonEnums.type.secondary },
        { id: 'save', text: i18n.t("Common:Save"), type: ButtonEnums.type.primary },
      ],
      onSubmit: onSubmitHandler,
    },
  });
}

export default segmentationItemEditHandler;
