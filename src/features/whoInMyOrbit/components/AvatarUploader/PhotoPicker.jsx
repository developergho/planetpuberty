import React from "react";

export const PhotoPicker = ({
  onCapturePhoto,
  onSelectFromLibrary,
  onCancel,
}) => {
  return (
    <div className="rounded-[1.875rem] max-w-[820px] w-full border-solid border-1 border-orbit-primary-1 shadow-primary-1 bg-white py-4">
      <h2 className="font-sans text-orbit-primary-1 text-center text-[2.375rem]">
        Upload a photo
      </h2>

      <div className="flex items-center justify-around">
        <div
          onClick={onSelectFromLibrary}
          role="button"
          className="flex flex-col items-center"
        >
          <div className="w-72 aspect-[280/181]">
            <img
              src="/game-orbit/common/choose-from-gallery.png"
              className="w-full h-full object-cover"
              alt="gallery"
            />
          </div>
          <span className="text-orbit-primary-1 text-lg font-sans mt-4">
            Choose from gallery
          </span>
        </div>

        <div
          onClick={onCapturePhoto}
          role="button"
          className="flex flex-col items-center"
        >
          <div className="w-72 aspect-[280/181]">
            <img
              src="/game-orbit/common/take-photo.png"
              className="w-full h-full object-cover"
              alt="capture"
            />
          </div>
          <span className="text-orbit-primary-1 text-lg font-sans mt-4">
            Take a photo
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-3">
        <button
          onClick={onCancel}
          className="gho-btn-action gho-btn-action__exit gho-icon-btn f-20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
