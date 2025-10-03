import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, CameraIcon, Image } from '@/components';
import { utils } from '@/utils';

import styles from './AvatarPlaceholder.module.scss';

const AvatarPlaceholder = (props) => {
  const { userName, avatar } = props;
  const { uploadDialogFnsRef } = props;

  const { t } = useTranslation();

  return (
    <div className={styles.AvatarContainer}>
      <div
        className={styles.AvatarPlaceholder}
        data-change-text={t('Update')}
      >
        {
          avatar ? (
            <Image
              src={avatar}
            />
          ) : utils.getInitialsName(userName)
        }
      </div>

      <Button
        category={ButtonConstants.ButtonCategories.PRIMARY}
        icon={<CameraIcon />}
        onClick={() => uploadDialogFnsRef?.current?.show()}
      >
        {t('Update')}
      </Button>
    </div>
  );
};

const AvatarPlaceholderMemo = memo(AvatarPlaceholder);

export { AvatarPlaceholderMemo as AvatarPlaceholder };
