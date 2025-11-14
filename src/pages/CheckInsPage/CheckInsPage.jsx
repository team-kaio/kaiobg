import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { CheckInList, FieldWithLabel, Input } from '@/components';
import { CheckInSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './CheckInsPage.module.scss';

const CheckInsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const checkIns = useSelector(CheckInSlice.selectors.selectUserCheckIns);

  const [ viewLastCheckIns, setViewLastCheckIns ] = useState(true);
  const [ selectedDate, setSelectedDate ] = useState(utils.getDateFormattedForInput(new Date()));

  const normalizedCheckIns = useMemo(() => {
    return checkIns.map((checkIn) => {
      const normalizedDescription = checkIn.description ? `(${checkIn.description})` : '';
  
      const workoutData = {
        ...checkIn,
        title: `${utils.getDateFormatted(new Date(checkIn.createdAt), { weekday: 'long' })}`,
        description: `${checkIn.title} ${normalizedDescription}`,
      };
  
      return workoutData;
    });
  }, [ checkIns ]);

  useEffect(() => {
    if(viewLastCheckIns) {
      dispatch(CheckInSlice.actions.loadUserCheckIns());
      return;
    }

    if(selectedDate) {
      const date = new Date(`${selectedDate} 00:00:00`);
      dispatch(CheckInSlice.actions.loadUserCheckInsByDate(utils.getDateIsoFormat(date)));
    }
  }, [ dispatch, selectedDate, viewLastCheckIns ]);

  return (
    <div className={styles.CheckInsPage}>
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

      <CheckInList
        checkIns={normalizedCheckIns}
      />
    </div>
  );
};

const CheckInsPageMemo = memo(CheckInsPage);

export { CheckInsPageMemo as CheckInsPage };
