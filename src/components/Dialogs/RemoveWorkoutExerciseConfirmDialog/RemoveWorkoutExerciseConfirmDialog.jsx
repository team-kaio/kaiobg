import { memo, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';

const RemoveWorkoutExerciseConfirmDialog = (props) => {
  const { dialogFnsRef, onRemoveExercise } = props;

  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);

  useImperativeHandle(dialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to remove this exercise?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onRemoveExercise}
            >
              {t('Remove Exercise')}
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

const RemoveWorkoutExerciseConfirmDialogMemo = memo(RemoveWorkoutExerciseConfirmDialog);

export { RemoveWorkoutExerciseConfirmDialogMemo as RemoveWorkoutExerciseConfirmDialog };
