import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ArticleContent, Button, ButtonConstants } from '@/components';
import { utils } from '@/utils';

import styles from './CourseCard.module.scss';

const CourseCard = (props) => {
  const { course } = props;
  const { t } = useTranslation();

  const contentPath = useMemo(() => {
    const path = utils.getContentByUserLanguages(course);

    return path ? utils.normalizeArticlePath(path) : null;
  }, [ course ]);

  const title = utils.getTitleByUserLanguages(course);

  return (
    <div className={styles.CourseCard}>
      <h2>{title}</h2>

      {
        contentPath ? (
          <ArticleContent
            path={contentPath}
            className={styles.CourseCardContent}
          />
        ) : <p>{t('<empty>')}</p>
      }

      <Link to={{ pathname: '/course', search: `?id=${course.id}` }}>
        <Button className={styles.btnReadMore} category={ButtonConstants.ButtonCategories.PRIMARY}>
          {t('Read more')}
        </Button>
      </Link>
    </div>
  );
};

const CourseCardMemo = memo(CourseCard);

export { CourseCardMemo as CourseCard };
