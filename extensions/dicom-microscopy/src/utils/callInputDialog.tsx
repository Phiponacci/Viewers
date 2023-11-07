import React from 'react';
import { Input, Dialog, ButtonEnums } from '@ohif/ui';
import { getI18n, useTranslation } from 'react-i18next';
const i18n = getI18n();
/**
 *
 * @param {*} data
 * @param {*} data.text
 * @param {*} data.label
 * @param {*} event
 * @param {func} callback
 * @param {*} isArrowAnnotateInputDialog
 */
export default function callInputDialog({
  uiDialogService,
  title = 'Annotation',
  defaultValue = '',
  callback = (value: string, action: string) => { },
}) {
  const dialogId = 'microscopy-input-dialog';

  const onSubmitHandler = ({ action, value }) => {
    switch (action.id) {
      case 'save':
        callback(value.value, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({ id: dialogId });
  };

  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: Dialog,
      contentProps: {
        title: title,
        value: { value: defaultValue },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({ id: dialogId }),
        actions: [
          { id: 'cancel', text: i18n.t('Common:Cancel'), type: ButtonEnums.type.secondary },
          { id: 'save', text: i18n.t('Common:Save'), type: ButtonEnums.type.primary },
        ],
        onSubmit: onSubmitHandler,
        body: ({ value, setValue }) => {
          const { t } = useTranslation("Dialog");
          return (
            <Input
              label={t('Dialog:Enter your annotation')}
              labelClassName="text-white text-[14px] leading-[1.2]"
              autoFocus
              className="border-primary-main bg-black"
              type="text"
              value={value.defaultValue}
              onChange={event => {
                event.persist();
                setValue(value => ({ ...value, value: event.target.value }));
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
