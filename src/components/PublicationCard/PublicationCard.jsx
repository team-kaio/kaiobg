import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ArticleContent, Button, ButtonConstants } from '@/components';
import { utils } from '@/utils';

import styles from './PublicationCard.module.scss';

const PublicationCard = (props) => {
  const { publication } = props;
  const { t } = useTranslation();

  const articlePath = useMemo(() => {
    const path = utils.getContentByUserLanguages(publication);

    return path ? utils.normalizeArticlePath(path) : null;
  }, [ publication ]);

  const title = utils.getTitleByUserLanguages(publication);

  return (
    <div className={styles.PublicationCard}>
      <h2>{title}</h2>

      {
        articlePath ? (
          <ArticleContent
            path={articlePath}
            className={styles.PublicationCardContent}
          />
        ) : <p>{t('<empty>')}</p>
      }

      <Link to={{ pathname: '/publication', search: `?id=${publication.id}` }}>
        <Button className={styles.btnReadMore} category={ButtonConstants.ButtonCategories.PRIMARY}>
          {t('Read more')}
        </Button>
      </Link>
    </div>
  );
};

const PublicationCardMemo = memo(PublicationCard);

export { PublicationCardMemo as PublicationCard };
