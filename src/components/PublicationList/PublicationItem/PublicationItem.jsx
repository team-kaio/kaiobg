import { memo, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { RemovePublicationConfirmDialog } from '@/components';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import { PublicationItemBody } from './PublicationItemBody';
import { PublicationItemFooter } from './PublicationItemFooter';
import { PublicationItemHeader } from './PublicationItemHeader';

import styles from './PublicationItem.module.scss';

const PublicationItem = (props) => {
  const { item: originalItem } = props;

  const removePublicationDialogFnsRef = useRef(null);

  const dispatch = useDispatch();

  const [ editMode, setEditMode ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ selectedLanguage, setSelectedLanguage ] = useState(utils.getMainUserLanguage());

  const [ item, setItem ] = useState(originalItem);

  const onUpdateItemProperty = useCallback((property, value) => {
    setItem((currentItem) => {
      return {
        ...currentItem,
        [property]: value,
      };
    });
  }, []);

  const onChangeExpandedState = useCallback(() => {
    setIsExpanded((currentIsExpanded) => {
      return !currentIsExpanded;
    });
  }, []);

  const onSaveEdit = useCallback(() => {
    const normalizedContent = Object.fromEntries(
      Object.entries(item.content).map(([ language, path ]) => {
        return [ language, utils.normalizeArticlePath(path) ];
      }),
    );

    const updatedItem = {
      ...item,
      content: normalizedContent,
    };

    dispatch(PublicationSlice.actions.savePublication(updatedItem));

    setItem(updatedItem);
  }, [ dispatch, item ]);

  const onPublish = useCallback((updatedIsPublished) => {
    const updatedItem = {
      ...item,
      isPublished: updatedIsPublished,
    };

    dispatch(PublicationSlice.actions.savePublication(updatedItem));

    onUpdateItemProperty('isPublished', updatedIsPublished);
  }, [ dispatch, item, onUpdateItemProperty ]);

  const onCancelEdit = useCallback(() => {
    setItem(originalItem);
    setEditMode(false);
  }, [ originalItem ]);

  return (
    <div className={styles.PublicationItem}>
      <PublicationItemHeader
        item={item}
        editMode={editMode}
        isExpanded={isExpanded}
        selectedLanguage={selectedLanguage}
        onChangeExpandedState={onChangeExpandedState}
        onUpdateItemProperty={onUpdateItemProperty}
      />

      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        <PublicationItemBody
          item={item}
          selectedLanguage={selectedLanguage}
          editMode={editMode}
          onUpdateItemProperty={onUpdateItemProperty}
        />
      </div>

      {
        isExpanded ? (
          <PublicationItemFooter
            item={item}
            editMode={editMode}
            setEditMode={setEditMode}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onUpdateItemProperty={onUpdateItemProperty}
            onPublish={onPublish}
            onRemovePublication={() => removePublicationDialogFnsRef.current?.show()}
          />
        ) : <></>
      }

      <RemovePublicationConfirmDialog
        publication={item}
        dialogFnsRef={removePublicationDialogFnsRef}
      />
    </div>
  );
};

const PublicationItemMemo = memo(PublicationItem);

export { PublicationItemMemo as PublicationItem };
