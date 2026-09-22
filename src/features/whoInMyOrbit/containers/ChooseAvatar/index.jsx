import { AvatarUploader } from "src/features/whoInMyOrbit/components/AvatarUploader";
import React, { useRef, useState } from "react";
import { PhotoPickerContainer } from "src/features/whoInMyOrbit/containers/PhotoPicker";
import { useDispatch } from "react-redux";
import { setPlayerData } from "src/reducers/player.slice";
import { motion } from "framer-motion";

const backDrop = {
  show: {
    opacity: 0.5,
  },
  hidden: {
    opacity: 0,
  },
};

export const ChooseAvatarContainer = ({ onNext, goBack }) => {
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [customAvatar, setCustomAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatarUploaderRef = useRef();
  const dispatch = useDispatch();

  const onPressTakePhoto = () => {
    setShowPhotoPicker(true);
  };

  const onSubmitAvatar = (url) => {
    setCustomAvatar(url);
    setShowPhotoPicker(false);

    avatarUploaderRef.current.onSelectedAvatar(null, 4, url);
  };

  const onSelectDefaultAvatar = (data) => {
    setSelectedAvatar(data);
  };

  const onFinishAvatarStep = () => {
    if (!selectedAvatar) return;

    dispatch(setPlayerData(selectedAvatar));
    onNext();
  };

  return (
    <>
      <div className="container">
        <AvatarUploader
          ref={avatarUploaderRef}
          customAvatar={customAvatar}
          onSelectAvatar={onSelectDefaultAvatar}
          onPressTakePhoto={onPressTakePhoto}
        />

        {!showPhotoPicker && (
          <div className="block-action block-action_absolute">
            <button
              onClick={goBack}
              className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
            >
              Back
            </button>
            {selectedAvatar != null && (
              <button
                onClick={onFinishAvatarStep}
                className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className={`absolute flex inset-0 z-20 ${
          showPhotoPicker ? "" : "pointer-events-none"
        }`}
      >
        <motion.div
          variants={backDrop}
          animate={showPhotoPicker ? "show" : "hidden"}
          initial="hidden"
          className="absolute inset-0 bg-orbit-primary pointer-events-none"
        />

        <PhotoPickerContainer
          visible={showPhotoPicker}
          onRequestClose={() => setShowPhotoPicker(false)}
          onSubmitPhoto={onSubmitAvatar}
        />
      </div>
    </>
  );
};
