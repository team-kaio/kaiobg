import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components/Button';
import { SaveButton } from '@/components/Buttons';
import { Select } from '@/components/Forms';
import { EyeIcon, EyeSlashIcon, PenToSquareIcon, XIcon } from '@/components/Icons';
import { SUPPORTED_LANGUAGES_ARRAY } from '@/constants';

import styles from './PublicationItemFooter.module.scss';

const PublicationItemFooter = (props) => {
  const { item, editMode, selectedLanguage } = props;
  const {
    onCancelEdit = () => null,
    onPublish = () => null,
    onRemovePublication = () => null,
    onSaveEdit = () => null,
    setEditMode = () => null,
    setSelectedLanguage = () => null,
  } = props;

  const { t } = useTranslation();

  const [ isSaving, setIsSaving ] = useState(false);

  const renderEditMode = useCallback(() => {
    const handleSaveClick = async () => {
      setIsSaving(true);
      try {
        await onSaveEdit();
        // Close edit mode after successful save
        setEditMode(false);
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <>
        <div>
          <SaveButton
            onClick={handleSaveClick}
            disabled={isSaving}
          />
        </div>

        <div>
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            icon={<XIcon />}
            onClick={onCancelEdit}
          >
            {t('Cancel')}
          </Button>
        </div>
      </>
    );
  }, [ onCancelEdit, onSaveEdit, setEditMode, t, isSaving ]);

  const renderViewMode = useCallback(() => {
    const renderLanguages = () => {
      return SUPPORTED_LANGUAGES_ARRAY.map(language => {
        return <option key={language.code} value={language.code}>{language.name}</option>;
      });
    };

    return (
      <>
        <div>
          <Select
            name="languages"
            value={selectedLanguage}
            renderItems={renderLanguages}
            noEmptyOption={true}
            onChange={(event) => setSelectedLanguage(event.target.value)}
          />
        </div>

        <div>
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            icon={<PenToSquareIcon />}
            onClick={() => setEditMode(true)}
          >
            {t('Edit')}
          </Button>

          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            icon={!item.isPublished ? <EyeIcon /> : <EyeSlashIcon />}
            onClick={() => onPublish(!item.isPublished)}
          >
            {!item.isPublished ? t('Publish') : t('Unpublish')}
          </Button>
        </div>

        <div>
          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            icon={<XIcon />}
            onClick={onRemovePublication}
          >
            {t('Remove Publication')}
          </Button>
        </div>
      </>
    );
  }, [ item.isPublished, onPublish, onRemovePublication, selectedLanguage, setEditMode, setSelectedLanguage, t ]);

  return (
    <div className={styles.PublicationItemFooter}>
      {editMode ? renderEditMode() : renderViewMode()}
    </div>
  );
};

const PublicationItemFooterMemo = memo(PublicationItemFooter);

export { PublicationItemFooterMemo as PublicationItemFooter };
