import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';

import { ArticleContent, ArrowLeftLongIcon, Button } from '@/components';
import { REQUEST_STATUS } from '@/constants';
import { CourseSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './CoursePage.module.scss';

const CoursePage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ searchParams ] = useSearchParams();

  const courseId = searchParams.get('id') || null;

  const course = useSelector(CourseSlice.selectors.selectCourseById(courseId));
  const loadCoursesStatus = useSelector(CourseSlice.selectors.selectLoadCoursesStatus);

  const isCourseLoading = useMemo(() => {
    if([ REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING ].includes(loadCoursesStatus)) {
      return true;
    }

    return false;
  }, [ loadCoursesStatus ]);

  const coursePath = useMemo(() => {
    if(!course) {
      return null;
    }

    let path = utils.getContentByUserLanguages(course);

    if(path && !path.startsWith('http')) {
      if(!path.startsWith('/courses/')) {
        const title = utils.getTitleByUserLanguages(course);
        const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        path = `/courses/${course.id}-${sanitizedTitle}.html`;
      }
    }

    return path ? utils.normalizeArticlePath(path) : null;
  }, [ course ]);

  const title = useMemo(() => {
    if(!course) {
      return null;
    }
    return utils.getTitleByUserLanguages(course);
  }, [ course ]);

  useEffect(() => {
    if(REQUEST_STATUS.IDLE == loadCoursesStatus) {
      dispatch(CourseSlice.actions.loadPublishedCourses());
    }
  }, [ dispatch, loadCoursesStatus ]);

  return (
    <div className={styles.CoursePage}>
      {
        course ? (
          <>
            <div className={styles.header}>
              <h2>{title}</h2>
              <p className={styles.date}>{utils.getDateFormatted(new Date(course.createdAt), { weekday: 'long' })}</p>
            </div>

            {
              coursePath ? (
                <ArticleContent
                  path={coursePath}
                  className={styles.CourseCardContent}
                />
              ) : (
                <p>{t('Course content not available')}</p>
              )
            }
          </>
        ) : (
          <p>{t(isCourseLoading ? 'Loading...' : 'Course not found')}</p>
        )
      }
      
      <Link className={styles.btnBack} to={{ pathname: '/courses' }}>
        <Button>
          <ArrowLeftLongIcon />
          {t('Back')}
        </Button>
      </Link>
    </div>
  );
};

const CoursePageMemo = memo(CoursePage);

export { CoursePageMemo as CoursePage };
