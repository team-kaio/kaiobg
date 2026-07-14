import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Image } from '@/components';

import styles from './About.module.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.About}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2>{t('Why join my team?')}</h2>
          <p>{t('I am a personal trainer and researcher - PhD candidate at Unicamp.')}</p>
          <p>{t('My approach combines objective assessments, individualized planning, and constant monitoring.')}</p>
          <ul>
            <li>{t('Plans fitted to your goals')}</li>
            <li>{t('Evidence-based method and practice')}</li>
            <li>{t('Weekly adjustments and close follow-up')}</li>
          </ul>
          <Link className={styles.link} to={{ pathname: '/resume' }}>{t('Learn More About Me')}</Link>
        </div>
        <Image className={styles.image} src="/images/kaio-aulao.jpg" alt={t('Team Kaio')} />
      </div>
    </section>
  );
};

const AboutMemo = memo(About);

export { AboutMemo as About };