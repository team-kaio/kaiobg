import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { utils } from '@/utils';

const ArticleContent = (props) => {
  const { path, className } = props;

  const { t } = useTranslation();

  const [ articleHtml, setArticleHtml ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if(!path) {
      setArticleHtml(null);
      setHasError(false);
      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    utils.fetchArticleContent(path)
      .then((html) => {
        if(!cancelled) {
          setArticleHtml(html);
        }
      })
      .catch(() => {
        if(!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if(!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ path ]);

  if(!path) {
    return null;
  }

  if(isLoading) {
    return <p>{t('Loading...')}</p>;
  }

  if(hasError) {
    return <p>{t('Article not found')}</p>;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: articleHtml }}
    />
  );
};

const ArticleContentMemo = memo(ArticleContent);

export { ArticleContentMemo as ArticleContent };
