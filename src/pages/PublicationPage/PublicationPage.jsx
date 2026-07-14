import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';

import { ArticleContent, ArrowLeftLongIcon, Button } from '@/components';
import { REQUEST_STATUS } from '@/constants';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './PublicationPage.module.scss';

const PublicationPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [ searchParams ] = useSearchParams();

  const publicationId = searchParams.get('id') || null;

  const publication = useSelector(PublicationSlice.selectors.selectPublicationById(publicationId));
  const loadPublicationsStatus = useSelector(PublicationSlice.selectors.selectLoadPublicationsStatus);

  const isPublicationLoading = useMemo(() => {
    if([ REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING ].includes(loadPublicationsStatus)) {
      return true;
    }

    return false;
  }, [ loadPublicationsStatus ]);

  const articlePath = useMemo(() => {
    if(!publication) {
      return null;
    }

    const path = utils.getContentByUserLanguages(publication);

    return path ? utils.normalizeArticlePath(path) : null;
  }, [ publication ]);

  const title = useMemo(() => {
    if(!publication) {
      return null;
    }
    return utils.getTitleByUserLanguages(publication);
  }, [ publication ]);

  useEffect(() => {
    if(REQUEST_STATUS.IDLE == loadPublicationsStatus) {
      dispatch(PublicationSlice.actions.loadPublishedPublications());
    }
  }, [ dispatch, loadPublicationsStatus ]);

  return (
    <div className={styles.PublicationPage}>
      {
        publication ? (
          <>
            <div className={styles.header}>
              <h2>{title}</h2>
              <p className={styles.date}>{utils.getDateFormatted(new Date(publication.createdAt), { weekday: 'long' })}</p>
            </div>

            {
              articlePath ? (
                <ArticleContent
                  path={articlePath}
                  className={styles.PublicationCardContent}
                />
              ) : (
                <p>{t('Publication not found')}</p>
              )
            }

            <Link className={styles.btnBack} to={{ pathname: '/publications' }}>
              <Button>
                <ArrowLeftLongIcon />
                {t('Back')}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p>{t(isPublicationLoading ? 'Loading...' : 'Publication not found')}</p>
            <Link className={styles.btnBack} to={{ pathname: '/publications' }}>
              <Button>
                <ArrowLeftLongIcon />
                {t('Back')}
              </Button>
            </Link>
          </>
        )
      }
    </div>
  );
};

const PublicationPageMemo = memo(PublicationPage);

export { PublicationPageMemo as PublicationPage };
