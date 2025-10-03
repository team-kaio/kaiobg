import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FieldWithLabel, GrowlFns, Input, Select } from '@/components';
import { CheckInList } from '@/components/CheckInList';
import { CheckInSlice, UserSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManageCheckInsPage.module.scss';

const ManageCheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoadingCheckInsStatus = useSelector(CheckInSlice.selectors.selectIsLoadingCheckInsStatus);
  const loadCheckInsError = useSelector(CheckInSlice.selectors.selectLoadCheckInsError);
  const checkIns = useSelector(CheckInSlice.selectors.selectAllCheckIns);
  const users = useSelector(UserSlice.selectors.selectUsers);

  const [ viewLastCheckIns, setViewLastCheckIns ] = useState(true);
  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));
  const [ viewAllUsersCheckIns, setViewAllUsersCheckIns ] = useState(true);
  const [ selectedUser, setSelectedUser ] = useState(null);

  const usersMap = useMemo(() => {
    if(utils.isArrayEmpty(users)) {
      return new Map();
    }

    const map = new Map();

    users.forEach(user => {
      map.set(user.uid, user);
    });

    return map;
  }, [ users ]);

  const getUserByUid = useCallback((uid) => {
    return utils.deepClone(users.find(user => user.uid === uid));
  }, [ users ]);

  const normalizedCheckIns = useMemo(() => {
    return checkIns.map((checkIn) => {
      const user = usersMap.get(checkIn.userUid);

      const normalizedUser = user || {
        fullName: t('<user not found>'),
      };

      const normalizedDescription = checkIn.description ? `(${checkIn.description})` : '';

      const workoutData = {
        ...checkIn,
        title: `${normalizedUser.fullName} (${utils.getDateFormatted(new Date(checkIn.createdAt), { weekday: 'long' })})`,
        description: `${checkIn.title} ${normalizedDescription}`,
      };

      return workoutData;
    });
  }, [ checkIns, t, usersMap ]);

  const renderUsers = useCallback(() => {
    if(!users?.length) {
      return <span>{t('You don\'t have users :C')}</span>;
    }

    const renderUsers = () => {
      return users.map(user => {
        return <option key={user.uid} value={user.uid}>{user.fullName} ({user.email})</option>;
      });
    };

    return (
      <Select
        name="users"
        emptyItemText="Select an user"
        value={selectedUser?.uid}
        onChange={(event) => setSelectedUser(getUserByUid(event.target.value))}
        renderItems={renderUsers}
      />
    );
  }, [ getUserByUid, selectedUser?.uid, t, users ]);

  const onCloseLoadCheckInsErrorGrowl = useCallback(() => {
    dispatch(CheckInSlice.actions.clearLoadCheckInsError());
  }, [ dispatch ]);

  useEffect(() => {
    if(!viewAllUsersCheckIns && !selectedUser) {
      return;
    }

    const userToFilterBy = !viewAllUsersCheckIns ? selectedUser : null;

    if(viewLastCheckIns) {
      dispatch(CheckInSlice.actions.loadCheckIns(userToFilterBy));
      return;
    }

    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(CheckInSlice.actions.loadCheckInsByDate(utils.getDateIsoFormat(date), userToFilterBy));
    }
  }, [ dispatch, selectedDate, selectedUser, viewAllUsersCheckIns, viewLastCheckIns ]);

  return (
    <div className={styles.ManageCheckInsPage}>
      <h1>{t('Manage Check-ins')}</h1>

      <FieldWithLabel
        label={t('View last 100 check-ins')}
        field={(
          <Input
            type="checkbox"
            name="view-last-100-check-ins"
            checked={viewLastCheckIns}
            onChange={() => setViewLastCheckIns(currentViewLastCheckIns => !currentViewLastCheckIns)}
          />
        )}
      />

      {
        !viewLastCheckIns ? (
          <FieldWithLabel
            label={t('Date')}
            field={(
              <Input
                type="date"
                name="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            )}
          />
        ) : <></>
      }

      <FieldWithLabel
        label={t('View all users check-ins')}
        field={(
          <Input
            type="checkbox"
            name="view-all-users-check-ins"
            checked={viewAllUsersCheckIns}
            onChange={() => setViewAllUsersCheckIns(currentViewAllUsersCheckIns => !currentViewAllUsersCheckIns)}
          />
        )}
      />

      {
        !viewAllUsersCheckIns ? (
          <div>
            {renderUsers()}
          </div>
        ) : <></>
      }

      {
        !isLoadingCheckInsStatus ? (
          <CheckInList
            checkIns={normalizedCheckIns}
          />
        ) : <p>{t('Loading...')}</p>
      }

      {GrowlFns.renderErrorGrowl({
        message: loadCheckInsError,
        onCloseGrowl: onCloseLoadCheckInsErrorGrowl,
      })}
    </div>
  );
};

const ManageCheckInsPageMemo = memo(ManageCheckInsPage);

export { ManageCheckInsPageMemo as ManageCheckInsPage };
