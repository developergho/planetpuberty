import React from "react";

export const FeelingPhotoItem = ({
  feelingData,
  onSelectAvatar,
  onDeleteAvatar,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-[1.875rem] overflow-hidden w-full max-w-[260px] max-h-[440px]">
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden">
          <div className="w-full ratio-220-310 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${feelingData.image})` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          {feelingData.isCustomAvatar ? (
            <div
              role="button"
              onClick={onDeleteAvatar}
              className="w-[3.75rem] h-[3.75rem] bg-feeling-primary rounded-full mt-[-1.875rem] flex items-center justify-center z-10"
            >
              <img
                src="/identify-feeling/common/feeling-delete-photo.png"
                alt="camera"
              />
            </div>
          ) : (
            <div
              role="button"
              onClick={onSelectAvatar}
              className="w-[3.75rem] h-[3.75rem] bg-feeling-primary rounded-full mt-[-1.875rem] flex items-center justify-center z-10"
            >
              <img
                src="/identify-feeling/common/feeling-camera.png"
                alt="camera"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <div className="flex grow items-center relative">
            <p className="font-bold font-sans text-feeling-primary text-center w-full">
              {feelingData.label_feeling}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
