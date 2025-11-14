import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';
import { PublicationSlice } from '@/store/slices';

const RemovePublicationConfirmDialog = (props) => {
  const { dialogFnsRef, publication } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(dialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onConfirm = useCallback(() => {
    dispatch(PublicationSlice.actions.removePublication(publication.id));
  }, [ dispatch, publication.id ]);

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to remove this publication?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onConfirm}
            >
              {t('Remove Publication')}
            </Button>
            <Button
              category={ButtonConstants.ButtonCategories.DEFAULT}
              onClick={() => setShow(false)}
            >
              {t('Cancel')}
            </Button>
          </>
        )}
      />
    </>
  );
};

const RemovePublicationConfirmDialogMemo = memo(RemovePublicationConfirmDialog);

export { RemovePublicationConfirmDialogMemo as RemovePublicationConfirmDialog };
