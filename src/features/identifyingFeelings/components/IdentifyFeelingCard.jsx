/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { delayed } from "src/common/helpers";
import { motion } from "framer-motion";

const container = {
  show: {
    translateY: "0%",
    opacity: 1,
  },
  hidden: {
    translateY: "100%",
    opacity: 0,
  },
};

export const IdentifyFeelingCard = ({ visible, feelingData, onGoNext }) => {
  const player = useSelector((state) => state.player, shallowEqual);
  const [showInCorrect, setShowInCorrect] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const onPressAnswer = async (position) => {
    if (position === feelingData.set_position_correct_value) {
      setShowCorrect(true);
      setShowInCorrect(false);

      await delayed(1000);
      onGoNext();
    } else {
      setShowInCorrect(true);
      setShowCorrect(false);
    }
  };

  const onClickTryAgain = () => {
    setShowCorrect(false);
    setShowInCorrect(false);
  };

  const renderButton = () => {
    if (showInCorrect) {
      return (
        <div className="flex items-end justify-center p-4 flex-shrink-0">
          <button
            key="try-again"
            onClick={() => onClickTryAgain()}
            className="relative group transition-[box-shadow] duration-[400ms] hover:shadow-button-primary-2-hovered flex items-center justify-center bg-error-1 max-w-[240px] h-[60px] w-1/2
             border-solid border-2 border-error-2 shadow-custom-error-1 py-3 rounded-[100px] w-full"
          >
            <span className="font-sans font-bold text-white-0 text-2xl group-hover:-translate-y-[2px] inline-block transition-[transform] duration-[400ms]">
              Try again
            </span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-end justify-center p-4">
        <button
          key="left"
          disabled={showCorrect}
          onClick={() => onPressAnswer("left")}
          className={`
          relative group flex items-center justify-center border-[2px]
             transition-[background]
             ${
               feelingData.set_position_correct_value === "left" && showCorrect
                 ? "border-success-2 shadow-success-2 bg-success-1"
                 : "border-feeling-primary shadow-feeling-primary bg-white-0 hover:bg-orbit-primary-1"
             }
             border-solid py-3 rounded-[1.875rem] w-full`}
        >
          <span
            className={`
            text-feeling-primary font-sans text-2xl ${
              feelingData.set_position_correct_value === "left" && showCorrect
                ? ""
                : "group-hover:text-white"
            }
          `}
          >
            {feelingData.set_position_correct_value === "left"
              ? feelingData.label_feeling
              : feelingData.set_incorrect_value}
          </span>
        </button>

        <span className="inline-block px-3" />

        <button
          key="right"
          disabled={showCorrect}
          onClick={() => onPressAnswer("right")}
          className={`
          relative group flex items-center justify-center border-[2px]
              transition-[background] 
              ${
                feelingData.set_position_correct_value === "right" &&
                showCorrect
                  ? "border-success-2 shadow-success-2 bg-success-1"
                  : "border-feeling-primary shadow-feeling-primary bg-white-0 hover:bg-orbit-primary-1"
              }
              py-3 rounded-[1.875rem] w-full`}
        >
          <span
            className={`
            text-feeling-primary font-sans text-2xl ${
              feelingData.set_position_correct_value === "right" && showCorrect
                ? ""
                : "group-hover:text-white"
            }
          `}
          >
            {feelingData.set_position_correct_value === "right"
              ? feelingData.label_feeling
              : feelingData.set_incorrect_value}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 flex ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      <div className="flex justify-center grow">
        <motion.div
          variants={container}
          initial="hidden"
          animate={visible ? "show" : "hidden"}
          className="h-full ratio-width-95 relative"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-end">
            <div className="bg-white rounded-t-[1.875rem] w-full max-w-[582px] max-h-[614px] flex flex-col grow border-4 border-feeling-primary border-bottom-0 h-full">
              <div className="w-full h-full relative transition-[position]">
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[1.875rem] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="w-full h-full px-3 pt-3">
                      {!showCorrect ? (
                        <div className="h-full w-full relative">
                          {showInCorrect && (
                            <div className="bg-gradient-error-1 absolute top-0 right-0 left-0 bottom-0 rounded-[1.875rem]" />
                          )}
                          <img
                            src={feelingData.image}
                            className={`w-full h-full object-cover rounded-[1.875rem] ${
                              showInCorrect && "border-error-1 border-[8px]"
                            }`}
                            alt="avatar"
                          />
                        </div>
                      ) : (
                        <div className="h-full w-full relative flex items-center justify-center">
                          <img
                            className="rounded-full aspect-square"
                            src="/game-orbit/common/thumbs-up.png"
                            alt="thumbs-up"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {showCorrect && (
                <h2 className="text-[2.375rem] font-sans fold-bold text-feeling-primary text-center">
                  {feelingData.description_for_popup_correct} {player.name}!
                </h2>
              )}

              {showInCorrect && (
                <p className="font-roboto text-error-1 text-[1.625rem] text-center mt-6 px-4">
                  {feelingData.description_for_popup_incorrect}
                </p>
              )}

              {renderButton()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
