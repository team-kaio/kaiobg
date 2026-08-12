import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SearchableSelect.module.scss';

const stripDiacritics = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '');

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

  const filteredOptions = useMemo(() => {
    if (!filterText) return options;
    const q = stripDiacritics(filterText.toLowerCase());
    return options.filter(opt => {
      const label = stripDiacritics(String(opt[displayKey] ?? '')).toLowerCase();
      const val = stripDiacritics(String(opt[valueKey] ?? '')).toLowerCase();
      return label.includes(q) || val.includes(q);
    });
  }, [ options, filterText, displayKey, valueKey ]);

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
    if (focusedIndex < 0) return;
    const el = containerRef.current?.querySelector(`li[data-idx="${focusedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
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
      <ul className={styles.SearchableSelectList}>
        {filteredOptions.length === 0 ? (
          <li className={styles.SearchableSelectEmpty}>{t('No results')}</li>
        ) : filteredOptions.map((opt, idx) => (
          <li
            key={opt[valueKey]}
            data-idx={idx}
            className={`${styles.SearchableSelectOption} ${
              opt[valueKey] === value ? styles.SearchableSelectOptionSelected : ''
            } ${idx === focusedIndex ? styles.SearchableSelectOptionFocused : ''}`}
            onClick={() => handleSelect(idx)}
            onMouseEnter={() => setFocusedIndex(idx)}
            role="option"
            aria-selected={opt[valueKey] === value}
          >
            {opt[displayKey]} ({String(valueDisplayKey ? opt[valueDisplayKey] : opt[valueKey])})
          </li>
        ))}
      </ul>
    </div>
  );
};

const SearchableSelectMemo = memo(SearchableSelect);

export { SearchableSelectMemo as SearchableSelect };
