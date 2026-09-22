import React from "react";

export const PhotoCaptureConfirm = ({
  source,
  onConfirm,
  onRetake,
  isShowHelmet = true,
  onRequestClose,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <h2 className="font-sans text-game1-secondary text-center text-[1.75rem]">
          Take a photo
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col bg-white tablet-lg:max-w-[582px] tablet:max-w-[550px] w-full rounded-t-[1.875rem] ml-[4.5rem] border-feeling-primary border-4 border-bottom-0">
          <div className="w-full ratio-square relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[1.875rem] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4">
                <div className="relative h-full w-full">
                  {isShowHelmet ? (
                    <>
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="aspect-square h-full avatar-clipper flex items-center justify-center">
                          <img
                            src={source}
                            className="h-full w-full object-cover"
                            alt="avatar"
                          />
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/game-orbit/default-avatar/helmet-1@3x.png"
                          className="aspect-square h-full object-cover"
                          alt="helmet"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full">
                      <img
                        src={source}
                        className="w-full h-full object-cover rounded-[1.875rem]"
                        alt="avatar"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pt-2 px-4 pb-4">
            <button
              onClick={onRetake}
              className="mr-2 group text-center bg-orbit-primary w-full tablet-lg:max-w-[260px] tablet:max-w-[240px] relative h-[60px] rounded-[100px] transition-[box-shadow] duration-[400ms] shadow-button-primary-1 hover:shadow-button-primary-1-hovered"
            >
              <span className="font-sans text-[1.5rem] font-bold text-white group-hover:-translate-y-[2px] transition-[transform] inline-block">
                Try again
              </span>
              <span className="text-white text-[1.5rem] absolute left-3 group-hover:-translate-x-[2px] transition-[transform]">
                <i className="icon-arrow-left" />
              </span>
            </button>

            <button
              onClick={onConfirm}
              className="ml-2 group text-center bg-orbit-pink w-full tablet-lg:max-w-[260px] tablet:max-w-[240px] relative h-[60px] rounded-[100px] transition-[box-shadow] duration-[400ms] shadow-button-primary-1 hover:shadow-button-primary-1-hovered"
            >
              <span className="font-sans text-[1.5rem] font-bold text-white group-hover:-translate-y-[2px] transition-[transform] inline-block">
                Confirm
              </span>
              <span className="text-white text-[1.5rem] absolute right-3 group-hover:translate-x-[2px] transition-[transform]">
                <i className="icon-arrow-right" />
              </span>
            </button>
          </div>
        </div>
        <button
          onClick={onRequestClose}
          className="rounded-full bg-white h-[3rem] w-[3rem] ml-4 shadow-white-1"
        >
          <span>
            <i className="icon-close" />
          </span>
        </button>
      </div>
    </div>
  );
};
