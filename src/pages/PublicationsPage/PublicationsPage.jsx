import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PublicationCard } from '@/components';
import { PublicationSlice } from '@/store/slices';

import styles from './PublicationsPage.module.scss';

const PublicationsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const publications = useSelector(PublicationSlice.selectors.selectAllPublications);

  useEffect(() => {
    dispatch(PublicationSlice.actions.loadPublishedPublications());
  }, [ dispatch ]);

  return (
    <div className={styles.PublicationsPage}>
      <h2 className={styles.header}>{t('Publications')}</h2>
      <div className={styles.publicationsGrid}>
        {
          !publications?.length ? (
            <span>{t('No publications found')}</span>
          ) : <></>
        }

        {publications?.map((publication) => {
          return (
            <PublicationCard key={publication.id} publication={publication} />
          );
        })}
      </div>
    </div>
  );
};

const PublicationsPageMemo = memo(PublicationsPage);

export { PublicationsPageMemo as PublicationsPage };
