import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, Image } from '@/components';

import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.HeroSection}>
      <div className={styles.content}>
        <h1>{t('Science-based training')}</h1>
        <p>{t('More than 10 years combining scientific evidence and practice to transform health and performance.')}</p>
        <Button className={styles.primary} category={ButtonConstants.ButtonCategories.PRIMARY}>
          <a target='_blank' href='https://wa.me/19999472024?text=Me ajuda,%20gostaria%20de%20falar%20sobre%20treinamento!'>
            {t('Contact me!')}
          </a>
        </Button>
      </div>
      <Image className={styles.img} src="/images/kaio-hero-section.png" width='320px' />
    </section>
  );
};

const HeroSectionMemo = memo(HeroSection);

export { HeroSectionMemo as HeroSection };
