import { centerCrop, makeAspectCrop } from 'react-image-crop';

export const centerAspectCrop = (data) => {
  const { width, height, aspect } = data || {};

  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      width,
      height,
    ),
    width,
    height,
  );
};
