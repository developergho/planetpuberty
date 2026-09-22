import { PhotoPickerContainer } from "src/features/whoInMyOrbit/containers/PhotoPicker";
import { motion } from "framer-motion";
import React from "react";

const backDrop = {
  show: {
    opacity: 0.5,
  },
  hidden: {
    opacity: 0,
  },
};

export const FeelPhotoPickerContainer = ({
  visible,
  onRequestClose,
  onSubmitPhoto,
}) => {
  return (
    <div
      className={`
    absolute flex top-0 left-0 right-0 bottom-0 ${
      visible ? "" : "pointer-events-none"
    }`}
    >
      <motion.div
        variants={backDrop}
        animate={visible ? "show" : "hidden"}
        initial="hidden"
        className="absolute top-0 right-0 bottom-0 left-0 bg-feeling-primary pointer-events-none z-20"
      />
      <PhotoPickerContainer
        isShowHelmet={false}
        visible={visible}
        onRequestClose={onRequestClose}
        onSubmitPhoto={onSubmitPhoto}
      />
    </div>
  );
};
