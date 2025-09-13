import { memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';

import { Button, ButtonConstants, Dialog } from '@/components';

import { centerAspectCrop } from './functions';

const UploadProfilePictureDialog = (props) => {
  const { dialogFnsRef, onConfirm = () => null } = props;

  const { t } = useTranslation();

  const [ show, setShow ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ crop, setCrop ] = useState();
  const [ completedCrop, setCompletedCrop ] = useState(null);

  const imageRef = useRef(null);

  useImperativeHandle(dialogFnsRef, () => {
    return {
      show() {
        setShow(true);
      },
    };
  });

  const onFileChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const onLoadImage = useCallback((e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop({
      width,
      height,
      aspect: 1,
    }));
  }, []);

  const onConfirmUpload = useCallback(() => {
    if (!imageRef.current || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');

    onConfirm({ avatar: base64Image });

    setShow(false);
  }, [ completedCrop, onConfirm ]);

  if(!show) {
    return <></>;
  }

  return (
    <>
      <Dialog
        title={t('Upload Picture')}
        bodyContent={(
          <>
            <input type="file" accept="image/*" onChange={onFileChange} />

            {image && (
              <div>
                <ReactCrop
                  src={image}
                  crop={crop}
                  aspect={1}
                  locked={true}
                  onChange={setCrop}
                  onComplete={setCompletedCrop}
                >
                  <img
                    ref={imageRef}
                    src={image}
                    style={{ maxWidth: '100%' }}
                    crossOrigin="anonymous"
                    onLoad={onLoadImage}
                  />
                </ReactCrop>
              </div>
            )}
          </>
        )}
        footerContent={(
          <>
            <Button
              category={ButtonConstants.ButtonCategories.DEFAULT}
              onClick={() => setShow(false)}
            >
              {t('Cancel')}
            </Button>
            <Button
              category={ButtonConstants.ButtonCategories.SUCCESS}
              onClick={onConfirmUpload}
            >
              {t('Upload Picture')}
            </Button>
          </>
        )}
      />
    </>
  );
};

const UploadProfilePictureDialogMemo = memo(UploadProfilePictureDialog);

export { UploadProfilePictureDialogMemo as UploadProfilePictureDialog };
