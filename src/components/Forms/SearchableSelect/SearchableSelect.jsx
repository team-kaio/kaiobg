import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SearchableSelect.module.scss';

const stripDiacritics = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '');

const VIRTUAL_ROW_HEIGHT = 36;
const MAX_VISIBLE_ITEMS = 15;
const FOCUS_SCROLL_BUFFER = 10;

const SearchableSelect = (props) => {
  const {
    options = [],
    value = null,
    onChange,
    placeholder = 'Select item',
    searchPlaceholder = 'Search...',
    displayKey = 'label',
    valueKey = 'value',
    valueDisplayKey,
    ...otherProps
  } = props;

  const { t } = useTranslation();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [ filterText, setFilterText ] = useState('');
  const [ focusedIndex, setFocusedIndex ] = useState(-1);
  const [ listScrollTop, setListScrollTop ] = useState(0);
  const listRef = useRef(null);

  const filteredOptions = useMemo(() => {
    if (!filterText) return options;
    const q = stripDiacritics(filterText.toLowerCase());
    return options.filter(opt => {
      const label = stripDiacritics(String(opt[displayKey] ?? '')).toLowerCase();
      const val = stripDiacritics(String(opt[valueKey] ?? '')).toLowerCase();
      return label.includes(q) || val.includes(q);
    });
  }, [ options, filterText, displayKey, valueKey ]);

  const handleScroll = useCallback((e) => {
    setListScrollTop(e.currentTarget.scrollTop);
  }, []);

  const { startIndex, endIndex, paddingTop, paddingBottom } = useMemo(() => {
    if (!filteredOptions.length) return { startIndex: 0, endIndex: 0, paddingTop: 0, paddingBottom: 0 };

    if (filteredOptions.length <= MAX_VISIBLE_ITEMS) {
      return { startIndex: 0, endIndex: filteredOptions.length, paddingTop: 0, paddingBottom: 0 };
    }

    const visibleCount = MAX_VISIBLE_ITEMS;
    const start = Math.max(0, Math.min(Math.floor(listScrollTop / VIRTUAL_ROW_HEIGHT), filteredOptions.length - visibleCount));
    const end = Math.min(start + visibleCount, filteredOptions.length);

    return {
      startIndex: start,
      endIndex: end,
      paddingTop: Math.floor(start * VIRTUAL_ROW_HEIGHT),
      paddingBottom: Math.floor((filteredOptions.length - end) * VIRTUAL_ROW_HEIGHT),
    };
  }, [ listScrollTop, filteredOptions.length ]);

  const visibleItems = useMemo(() => {
    return filteredOptions.slice(startIndex, endIndex);
  }, [ filteredOptions, startIndex, endIndex ]);

  const handleSelect = useCallback((optIdx) => {
    const option = filteredOptions[optIdx];
    if (!option) return;
    setFilterText('');
    onChange?.(option[valueKey]);
  }, [ filteredOptions, onChange, valueKey ]);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => (i + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => (i - 1 + filteredOptions.length) % filteredOptions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(focusedIndex);
        } else if (filteredOptions.length === 1) {
          handleSelect(0);
        }
        break;
      case 'Escape':
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [ filteredOptions, focusedIndex, handleSelect ]);

  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;

    const top = Math.max(0, (focusedIndex - FOCUS_SCROLL_BUFFER) * VIRTUAL_ROW_HEIGHT);
    listRef.current.scrollTop = top;
  }, [ focusedIndex ]);

  return (
    <div ref={containerRef} className={styles.SearchableSelect}>
      <input
        ref={inputRef}
        type="text"
        placeholder={t(searchPlaceholder)}
        value={filterText}
        onChange={(e) => { setFilterText(e.target.value); setFocusedIndex(-1); }}
        onKeyDown={handleKeyDown}
        className={styles.SearchableSelectInput}
      />
      <div ref={listRef} className={styles.SearchableSelectList} onScroll={handleScroll}>
        <div style={{ position: 'relative', height: `${filteredOptions.length * VIRTUAL_ROW_HEIGHT}px` }}>
          {filteredOptions.length === 0 ? (
            <li className={styles.SearchableSelectEmpty}>{t('No results')}</li>
          ) : (
            paddingTop > 0 && (
              <div style={{ height: `${paddingTop}px`, pointerEvents: 'none' }} />
            )
          )}
          {visibleItems.map((opt, vi) => {
            const idx = startIndex + vi;
            return (
              <li
                key={opt[valueKey]}
                data-idx={idx}
                style={{ height: `${VIRTUAL_ROW_HEIGHT}px` }}
                className={`${styles.SearchableSelectOption} ${
                  opt[valueKey] === value ? styles.SearchableSelectOptionSelected : ''
                } ${idx === focusedIndex ? styles.SearchableSelectOptionFocused : ''}`}
                onClick={() => handleSelect(idx)}
                role="option"
                aria-selected={opt[valueKey] === value}
              >
                <span>{opt[displayKey]}</span>
                {valueDisplayKey && (
                  <>({String(opt[valueDisplayKey])})</>
                )}
              </li>
            );
          })}
          {paddingBottom > 0 && (
            <div style={{ height: `${paddingBottom}px`, pointerEvents: 'none' }} />
          )}
        </div>
      </div>
    </div>
  );
};

const SearchableSelectMemo = memo(SearchableSelect);

export { SearchableSelectMemo as SearchableSelect };
