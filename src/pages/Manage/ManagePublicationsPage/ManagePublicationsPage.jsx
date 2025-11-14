import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, PlusIcon, PublicationList } from '@/components';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManagePublicationsPage.module.scss';

const ManagePublicationsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const publications = useSelector(PublicationSlice.selectors.selectAllPublications);

  const onAddItem = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    dispatch(PublicationSlice.actions.addPublication({
      title: {},
      content: {},
      isPublished: false,
      createdAt: now,
    }));
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(PublicationSlice.actions.loadPublications());
  }, [ dispatch ]);

  return (
    <div className={styles.ManagePublicationsPage}>
      <h1>{t('Manage Publications')}</h1>

      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddItem}
      >
        {t('Add Publication')}
      </Button>

      {publications ? (
        <PublicationList
          items={publications}
        />
      ) : <></>}
    </div>
  );
};

const ManagePublicationsPageMemo = memo(ManagePublicationsPage);

export { ManagePublicationsPageMemo as ManagePublicationsPage };
