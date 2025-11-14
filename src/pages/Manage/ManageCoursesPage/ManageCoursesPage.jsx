import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, PlusIcon, CourseList } from '@/components';
import { CourseSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManageCoursesPage.module.scss';

const ManageCoursesPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const courses = useSelector(CourseSlice.selectors.selectAllCourses);

  const onAddItem = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    dispatch(CourseSlice.actions.addCourse({
      title: {},
      content: {},
      isPublished: false,
      createdAt: now,
    }));
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(CourseSlice.actions.loadCourses());
  }, [ dispatch ]);

  return (
    <div className={styles.ManageCoursesPage}>
      <h1>{t('Manage Courses')}</h1>

      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddItem}
      >
        {t('Add Course')}
      </Button>

      {courses ? (
        <CourseList
          items={courses}
        />
      ) : <></>}
    </div>
  );
};

const ManageCoursesPageMemo = memo(ManageCoursesPage);

export { ManageCoursesPageMemo as ManageCoursesPage };
