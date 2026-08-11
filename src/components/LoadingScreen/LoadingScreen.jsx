import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './LoadingScreen.scss';

const LoadingScreen = ({ isLoading }) => {
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{t('Loading...')}</p>
      </div>
    </div>
  );
};

const LoadingScreenMemo = memo(LoadingScreen);

export { LoadingScreenMemo as LoadingScreen };