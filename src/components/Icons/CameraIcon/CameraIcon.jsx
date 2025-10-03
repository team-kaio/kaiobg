import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CameraIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faCamera}
      {...props}
    />
  );
};

const CameraIconMemo = memo(CameraIcon);

export { CameraIconMemo as CameraIcon };
