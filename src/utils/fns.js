import { v7 as uuid } from 'uuid';

export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
    
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
    
  return age;
};

export const deepClone = (obj) => {
  if(obj === undefined) {
    return null;
  }

  return JSON.parse(JSON.stringify(obj));
};

export async function fetchArticleContent(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load article: ${response.status}`);
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const styles = [ ...doc.head.querySelectorAll('style') ]
    .map((node) => node.outerHTML)
    .join('');

  return `${styles}${doc.body.innerHTML}`;
}

export const getContentByUserLanguages = (publication) => {
  const userLanguagesList = getUserMainLanguagesList();

  const contentsByUserLanguage = userLanguagesList.map((language) => {
    return publication.content[language] || null;
  }).filter(Boolean);

  const contentsByUserLanguageWithDefaultValues = [
    ...contentsByUserLanguage,
    publication.content.en || publication.content.pt,
  ];

  return contentsByUserLanguageWithDefaultValues[0];
};

export const getDateFormatted = (date, extraOptions = {}) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...extraOptions,
  };

  return new Intl.DateTimeFormat(getUserLanguage(), options).format(date);
};

export const getDateFormattedForInput = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getDateIsoFormat = (date) => {
  return date.toISOString();
};

export const getInitialsName = (name) => {
  if (!name || typeof name !== 'string') return '';

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    // No last name → take first two letters
    return parts[0].substring(0, 2).toUpperCase();
  } else {
    // First letter of first name + first letter of last name
    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return (first + last).toUpperCase();
  }
};

export const getMainUserLanguage = () => {
  const language = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
  
  if(language.includes('-')) {
    return language.split('-')[0];
  }

  return language;
};

export const getTitleByUserLanguages = (publication) => {
  const userLanguagesList = getUserMainLanguagesList();

  const titlesByUserLanguage = userLanguagesList.map((language) => {
    return publication.title[language] || null;
  }).filter(Boolean);

  const titlesByUserLanguageWithDefaultValues = [
    ...titlesByUserLanguage,
    publication.title.en || publication.title.pt,
  ];

  return titlesByUserLanguageWithDefaultValues[0];
};

export const getUniqueId = () => {
  return uuid();
};

export const getUserLanguage = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  }
  
  return navigator.language;
};

export const getUserMainLanguagesList = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages.map(language => language.includes('-') ? language.split('-')[0] : language);
  }

  const language = navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language;
  
  return [ language ];
};

export const isArrayEmpty = (array) => {
  if(!array) {
    return true;
  }

  return array.length == 0;
};

export const normalizeArticlePath = (path) => {
  if(!path || typeof path !== 'string') {
    return path;
  }

  const trimmed = path.trim();

  if(!trimmed) {
    return trimmed;
  }

  if(trimmed.startsWith('/')) {
    return trimmed;
  }

  return `/${trimmed}`;
};
