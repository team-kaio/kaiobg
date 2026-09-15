import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { UsersList } from '@/components';
import { UserSlice } from '@/store/slices';

import styles from './ManageUsersPage.module.scss';

const ManageUsersPage = () => {
  const { t } = useTranslation();

  const users = useSelector(UserSlice.selectors.selectUsers);

  const activeUsers = users?.filter(user => user.active) ?? [];
  const inactiveUsers = users?.filter(user => !user.active) ?? [];

  return (
    <div className={styles.ManageUsersPage}>
      <h1>{t('Manage Users')}</h1>

      {activeUsers?.length ? (
        <>
          <h2>{t('Ativos')}</h2>
          <UsersList items={activeUsers} />
        </>
      ) : null}

      {inactiveUsers?.length ? (
        <>
          <h2>{t('Inativos')}</h2>
          <UsersList items={inactiveUsers} />
        </>
      ) : null}
    </div>
  );
};

const ManageUsersPageMemo = memo(ManageUsersPage);

export { ManageUsersPageMemo as ManageUsersPage };
