import { memo, useCallback, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants, ConfirmationDialog } from '@/components';
import { CourseSlice } from '@/store/slices';

const RemoveCourseConfirmDialog = (props) => {
  const { dialogFnsRef, course } = props;

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
    dispatch(CourseSlice.actions.removeCourse(course.id));
  }, [ dispatch, course.id ]);

  if(!show) {
    return <></>;
  }

  return (
    <>
      <ConfirmationDialog
        bodyContent={(
          <>
            <p>{t('Are you sure you want to remove this course?')}</p>
            <p>{t('This action cannot be undone')}</p>
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              onClick={onConfirm}
            >
              {t('Remove Course')}
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

const RemoveCourseConfirmDialogMemo = memo(RemoveCourseConfirmDialog);

export { RemoveCourseConfirmDialogMemo as RemoveCourseConfirmDialog };
