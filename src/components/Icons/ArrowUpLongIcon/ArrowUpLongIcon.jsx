import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ArrowUpLongIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faArrowUpLong}
      {...props}
    />
  );
};

const ArrowUpLongIconMemo = memo(ArrowUpLongIcon);

export { ArrowUpLongIconMemo as ArrowUpLongIcon };
