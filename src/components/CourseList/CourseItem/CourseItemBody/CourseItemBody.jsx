import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleContent, FieldWithLabel, Input } from '@/components';
import { SUPPORTED_LANGUAGES_ARRAY } from '@/constants';
import { utils } from '@/utils';

import styles from './CourseItemBody.module.scss';

const CourseItemBody = (props) => {
  const { item, selectedLanguage, editMode, onUpdateItemProperty } = props;

  const { t } = useTranslation();

  const renderEditMode = useCallback(() => {
    return (
      <div className={styles.allLanguagesContainer}>
        {SUPPORTED_LANGUAGES_ARRAY.map(language => {
          const articlePath = item.content[language.code] || '';

          const onUpdateArticlePath = (event) => {
            const updatedContent = {
              ...item.content,
              [language.code]: event.target.value,
            };

            onUpdateItemProperty('content', updatedContent);
          };

          return (
            <FieldWithLabel
              key={language.code}
              label={`${t('Course path')} (${language.name})`}
              field={(
                <Input
                  type="text"
                  name={`coursePath-${language.code}`}
                  value={articlePath}
                  placeholder={`/courses/exemplo-${language.code}.html`}
                  onChange={onUpdateArticlePath}
                />
              )}
            />
          );
        })}
      </div>
    );
  }, [ item.content, onUpdateItemProperty, t ]);

  const renderViewMode = useCallback(() => {
    const articlePath = item.content[selectedLanguage] || '';

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
  }, [ item.content, selectedLanguage, t ]);

  return (
    <div className={styles.CourseItemBody}>
      {editMode ? renderEditMode() : renderViewMode()}
    </div>
  );
};

const CourseItemBodyMemo = memo(CourseItemBody);

export { CourseItemBodyMemo as CourseItemBody };