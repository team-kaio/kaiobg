import { memo, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { RemoveCourseConfirmDialog } from '@/components';
import { CourseSlice } from '@/store/slices';
import { utils } from '@/utils';

import { CourseItemBody } from './CourseItemBody';
import { CourseItemFooter } from './CourseItemFooter';
import { CourseItemHeader } from './CourseItemHeader';

import styles from './CourseItem.module.scss';

const CourseItem = (props) => {
  const { item: originalItem } = props;

  const removeCourseDialogFnsRef = useRef(null);

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

    dispatch(CourseSlice.actions.saveCourse(updatedItem));

    setItem(updatedItem);
  }, [ dispatch, item ]);

  const onPublish = useCallback((updatedIsPublished) => {
    const updatedItem = {
      ...item,
      isPublished: updatedIsPublished,
    };

    dispatch(CourseSlice.actions.saveCourse(updatedItem));

    onUpdateItemProperty('isPublished', updatedIsPublished);
  }, [ dispatch, item, onUpdateItemProperty ]);

  const onCancelEdit = useCallback(() => {
    setItem(originalItem);
    setEditMode(false);
  }, [ originalItem ]);

  return (
    <div className={styles.CourseItem}>
      <CourseItemHeader
        item={item}
        editMode={editMode}
        isExpanded={isExpanded}
        selectedLanguage={selectedLanguage}
        onChangeExpandedState={onChangeExpandedState}
        onUpdateItemProperty={onUpdateItemProperty}
      />

      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        <CourseItemBody
          item={item}
          selectedLanguage={selectedLanguage}
          editMode={editMode}
          onUpdateItemProperty={onUpdateItemProperty}
        />
      </div>

      {
        isExpanded ? (
          <CourseItemFooter
            item={item}
            editMode={editMode}
            setEditMode={setEditMode}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onUpdateItemProperty={onUpdateItemProperty}
            onPublish={onPublish}
            onRemoveCourse={() => removeCourseDialogFnsRef.current?.show()}
          />
        ) : <></>
      }

      <RemoveCourseConfirmDialog
        course={item}
        dialogFnsRef={removeCourseDialogFnsRef}
      />
    </div>
  );
};

const CourseItemMemo = memo(CourseItem);

export { CourseItemMemo as CourseItem };
