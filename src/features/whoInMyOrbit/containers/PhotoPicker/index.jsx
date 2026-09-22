/* eslint-disable react-hooks/exhaustive-deps */
import { animate, motion, useMotionValue } from "framer-motion";
import { PhotoPicker } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoPicker";
import { useEffect, useRef, useState } from "react";
import { PhotoCapture } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoCapture";
import { PhotoCaptureConfirm } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoCaptureConfirm";

export const PhotoPickerContainer = ({
  visible = false,
  isShowHelmet = true,
  onRequestClose,
  onSubmitPhoto,
}) => {
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [capturedPhoto, setCapturePhoto] = useState(null);
  const inputFileRef = useRef();
  const top = useMotionValue("100%");
  const left = useMotionValue("50%");
  const translateX = useMotionValue("0");
  const translateY = useMotionValue("0");

  useEffect(() => {
    if (visible) {
      translateX.set("-50%");
      translateY.set("-50%");
      animate(top, "50%");
    } else {
      animate(top, "150%", {
        onComplete: () => {
          translateX.set("0");
          translateY.set("0");
        },
      });
    }
  }, [visible]);

  const onSelectFromLibrary = () => {
    inputFileRef.current.click();
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      inputFileRef.current.value = "";
      setCapturePhoto(reader.result);
    };
    reader.onerror = function (error) {
      console.error(error);
    };
  };

  const onCapturePhoto = (photo) => {
    setCapturePhoto(photo);
  };

  const onConfirmCaptured = () => {
    onSubmitPhoto(capturedPhoto);
    setCapturePhoto(null);
    setShowPhotoCapture(false);
  };

  if (capturedPhoto) {
    return (
      <div className="absolute w-full top-[100%] left-[50%] -translate-x-[50%] -translate-y-[100%] z-20">
        <PhotoCaptureConfirm
          isShowHelmet={isShowHelmet}
          source={capturedPhoto}
          onRequestClose={() => {
            setShowPhotoCapture(false);
            setCapturePhoto(null);
            onRequestClose();
          }}
          onConfirm={() => {
            onConfirmCaptured();
          }}
          onRetake={() => {
            setCapturePhoto(null);
          }}
        />
      </div>
    );
  }

  return (
    <>
      {!showPhotoCapture && (
        <motion.div
          className={`absolute lg:w-[60%] md:w-[70%] flex flex-col items-center z-20 ${
            visible ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ translateX, translateY, top, left }}
        >
          <PhotoPicker
            onCancel={onRequestClose}
            onCapturePhoto={() => setShowPhotoCapture(true)}
            onSelectFromLibrary={onSelectFromLibrary}
          />
          <input
            type="file"
            multiple={false}
            style={{ display: "none" }}
            onChange={onChangeFile}
            className="hidden"
            accept=".png,.jpg,.jpeg,.gif"
            ref={inputFileRef}
          />
        </motion.div>
      )}

      <div className="absolute w-full top-[100%] left-[50%] -translate-x-[50%] -translate-y-[100%] z-20">
        {showPhotoCapture && (
          <PhotoCapture
            isShowHelmet={isShowHelmet}
            onRequestClose={() => {
              setShowPhotoCapture(false);
            }}
            onCapturePhoto={onCapturePhoto}
          />
        )}
      </div>
    </>
  );
};
