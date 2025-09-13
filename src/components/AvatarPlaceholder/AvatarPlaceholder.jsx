import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@/components';
import { utils } from '@/utils';

import styles from './AvatarPlaceholder.module.scss';

const AvatarPlaceholder = (props) => {
  const { userName, avatar } = props;
  const { uploadDialogFnsRef } = props;

  const { t } = useTranslation();

  return (
    <>
      <div
        className={styles.AvatarPlaceholder}
        onClick={() => uploadDialogFnsRef?.current?.show()}
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
    </>
  );
};

const AvatarPlaceholderMemo = memo(AvatarPlaceholder);

export { AvatarPlaceholderMemo as AvatarPlaceholder };
