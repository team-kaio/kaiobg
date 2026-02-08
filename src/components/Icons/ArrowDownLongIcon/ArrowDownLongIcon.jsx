import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ArrowDownLongIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faArrowDownLong}
      {...props}
    />
  );
};

const ArrowDownLongIconMemo = memo(ArrowDownLongIcon);

export { ArrowDownLongIconMemo as ArrowDownLongIcon };
