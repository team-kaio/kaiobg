import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleContent } from '@/components/ArticleContent';
import { FieldWithLabel, Input } from '@/components/Forms';
import { utils } from '@/utils';

import styles from './PublicationItemBody.module.scss';

const PublicationItemBody = (props) => {
  const { item, selectedLanguage, editMode, onUpdateItemProperty } = props;

  const { t } = useTranslation();

  const articlePath = item.content[selectedLanguage] || '';

  const onUpdateArticlePath = useCallback((event) => {
    const updatedContent = {
      ...item.content,
      [selectedLanguage]: event.target.value,
    };

    onUpdateItemProperty('content', updatedContent);
  }, [ item.content, onUpdateItemProperty, selectedLanguage ]);

  const renderEditMode = useCallback(() => {
    return (
      <FieldWithLabel
        label={t('Article path')}
        field={(
          <Input
            type="text"
            name="articlePath"
            value={articlePath}
            placeholder="/articles/exemplo.html"
            onChange={onUpdateArticlePath}
          />
        )}
      />
    );
  }, [ articlePath, onUpdateArticlePath, t ]);

  const renderViewMode = useCallback(() => {
    if(!articlePath) {
      return t('<empty>');
    }

    return (
      <div className={styles.articlePreview}>
        <p className={styles.articlePath}>{articlePath}</p>
        <ArticleContent
          path={utils.normalizeArticlePath(articlePath)}
          className={styles.articleContent}
        />
      </div>
    );
  }, [ articlePath, t ]);

  return (
    <div className={styles.PublicationItemBody}>
      {editMode ? renderEditMode() : renderViewMode()}
    </div>
  );
};

const PublicationItemBodyMemo = memo(PublicationItemBody);

export { PublicationItemBodyMemo as PublicationItemBody };
