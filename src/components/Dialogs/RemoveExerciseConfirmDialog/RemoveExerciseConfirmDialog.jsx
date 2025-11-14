import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';
import { ExerciseSlice } from '@/store/slices';

const RemoveExerciseConfirmDialog = (props) => {
  const { dialogFnsRef, exercise } = props;

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
    dispatch(ExerciseSlice.actions.removeExercise(exercise.id));
  }, [ dispatch, exercise.id ]);

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
              onClick={onConfirm}
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

const RemoveExerciseConfirmDialogMemo = memo(RemoveExerciseConfirmDialog);

export { RemoveExerciseConfirmDialogMemo as RemoveExerciseConfirmDialog };
