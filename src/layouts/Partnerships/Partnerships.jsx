import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@/components';

import styles from './Partnerships.module.scss';


const Partnerships = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.Partnerships}>
      <div className={styles.container}>
        <h2>{t('Partnerships')}</h2>
        <p>{t('(click to be redirected)')}</p>
        <div className={styles.gallery}>
          <div className={styles.partnerBox}>
            <a target='_blank'
              href="https://usekawana.com/?fbclid=PAZXh0bgNhZW0CMTEAAaZLHWi_tXVDk6FaxZGrepnskk6ScuZLpKR7CenFCth7-H8lEAFJJ-z2WeA_aem_AMsPWHxogYFXoPr6K5o1Bgm">
              <Image src="/images/kawana-partner.png" />
            </a>
          </div>
          <div className={styles.partnerBox}>
            <a target='_blank'
              href="https://www.kecjoias.com/?fbclid=PAZXh0bgNhZW0CMTEAAabESyH_VZta40OR99fjpzK5cj7lxZ_LQW1A5_bwoFKDpy1hXjC-OB0qOH4_aem_RUL4h-yN59kNzqnOESd2cQ">
              <Image src="/images/k%26c-joias-partner.png" />
            </a>
          </div>
          <div className={styles.partnerBox}>
            <a target='_blank'
              href="https://www.instagram.com/nutri.giovanapascoli/">
              <Image src="/images/giovana-partner.png" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnershipsMemo = memo(Partnerships);

export { PartnershipsMemo as Partnerships };
