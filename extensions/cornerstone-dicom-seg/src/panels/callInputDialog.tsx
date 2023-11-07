import React from 'react';
import { Input, Dialog, ButtonEnums } from '@ohif/ui';
import { getI18n } from 'react-i18next';

function callInputDialog(uiDialogService, label, callback) {
  const dialogId = 'enter-segment-label';

  const onSubmitHandler = ({ action, value }) => {
    switch (action.id) {
      case 'save':
        callback(value.label, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({ id: dialogId });
  };

  if (uiDialogService) {
    const i18n = getI18n();
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: Dialog,
      contentProps: {
        title: 'Segment',
        value: { label },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({ id: dialogId }),
        actions: [
          { id: 'cancel', text: i18n.t("Common:Cancel"), type: ButtonEnums.type.secondary },
          { id: 'save', text: i18n.t("Common:Confirm"), type: ButtonEnums.type.primary },
        ],
        onSubmit: onSubmitHandler,
        body: ({ value, setValue }) => {
          return (
            <Input
              label={i18n.t("Dialog:Enter the segment label")}
              labelClassName="text-white text-[14px] leading-[1.2]"
              autoFocus
              className="border-primary-main bg-black"
              type="text"
              value={value.label}
              onChange={event => {
                event.persist();
                setValue(value => ({ ...value, label: event.target.value }));
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  onSubmitHandler({ value, action: { id: 'save' } });
                }
              }}
            />
          );
        },
      },
    });
  }
}

export default callInputDialog;
