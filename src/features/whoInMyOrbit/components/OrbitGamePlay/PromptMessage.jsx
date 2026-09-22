import { motion } from "framer-motion";
import { useState } from "react";

const modalContainer = {
  show: {
    top: "0%",
    left: "50%",
    translateX: "-50%",
    translateY: "0",
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    top: "100%",
    left: "50%",
    translateX: "-50%",
    translateY: "-50%",
    transition: {
      duration: 0.4,
    },
  },
};

export const PromptMessage = ({
  visible,
  member,
  consentMessage,
  onRetry,
  onNext,
}) => {
  const [showInCorrect, setShowInCorrect] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const onSelectAnswer = (action) => {
    if (action === consentMessage.check_level_of_touch_for_member?.value) {
      setShowCorrect(true);
      setShowInCorrect(false);
    } else {
      setShowCorrect(false);
      setShowInCorrect(true);
    }
  };

  const onClickNext = () => {
    if (consentMessage.check_level_of_touch_for_member?.value.includes("no")) {
      onNext();
    } else {
      onNext(member);
    }

    setShowCorrect(false);
    setShowInCorrect(false);
  };

  const renderContent = () => {
    if (!consentMessage) return null;

    if (consentMessage.type === "alert") {
      return (
        <div
          className="rounded-t-[1.875rem] border-solid border-bottom-0 border-4
        overflow-hidden w-full max-w-[540px]
      flex flex-col justify-between border-orbit-primary-1 shadow-primary-1 bg-white px-12 py-10"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <div className="w-1/2 ratio-square-half relative">
                <div className="absolute inset-0 rounded-full border-error-1 border-8">
                  <img
                    src={member.image}
                    className="h-full w-full rounded-full object-cover"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-[1.625rem] font-roboto text-error-1 text-center my-3"
            dangerouslySetInnerHTML={{
              __html: consentMessage.message_incorrect_for_level.replace(
                /\%MEMBER_NAME\%/gi,
                `<span class="font-bold">${member.name}</span>`
              ),
            }}
          />

          <div className="flex items-end justify-center pr-4">
            <button
              key="prompt-try-again"
              onClick={onRetry}
              className="relative group flex items-center justify-center border-[2px]
              bg-error-1 w-[160px] transition-[box-shadow] duration-[400ms] hover:shadow-button-primary-2-hovered
             border-solid border-error-2 shadow-custom-error-1 py-2 rounded-[100px] w-full"
            >
              <span className="text-white md:text-xl font-sans sm:text-sm group-hover:-translate-y-[2px] inline-block transition-[transform] duration-[400ms]">
                Try again
              </span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="rounded-t-[1.875rem] border-solid border-bottom-0 border-4
        overflow-hidden w-full max-w-[540px] flex flex-col justify-between border-orbit-primary-1 shadow-primary-1 bg-white px-12 py-10"
      >
        {!!consentMessage.question_member && (
          <div
            className="text-[1.75rem] font-sans font-bold text-orbit-primary text-center"
            dangerouslySetInnerHTML={{
              __html: consentMessage.question_member.replace(
                /\%MEMBER_NAME\%/gi,
                `<span class="text-orbit-pink">${member.name}</span>`
              ),
            }}
          />
        )}

        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="w-1/2 ratio-square-half relative">
              <div className="absolute inset-0">
                {showCorrect ? (
                  <img
                    key="/game-orbit/common/thumbs-up@2x.png"
                    src="/game-orbit/common/thumbs-up@2x.png"
                    className="h-full w-full rounded-full object-cover"
                    alt={member.name}
                  />
                ) : (
                  <img
                    key={member.name}
                    src={member.image}
                    className={`h-full w-full rounded-full object-cover ${
                      showInCorrect ? "border-error-1 border-8" : ""
                    }`}
                    alt={member.name}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {showInCorrect && (
          <>
            <div
              className="text-[1.625rem] font-roboto text-error-1 text-center my-3"
              dangerouslySetInnerHTML={{
                __html: consentMessage.description_for_popup_incorrect.replace(
                  /\%MEMBER_NAME\%/gi,
                  `<span class="font-bold">${member.name}</span>`
                ),
              }}
            />

            <div className="flex items-end justify-center pr-4">
              <button
                key="prompt-message-incorrect"
                onClick={() => {
                  setShowCorrect(false);
                  setShowInCorrect(false);
                }}
                className="relative group flex items-center justify-center border-[2px]
              bg-error-1 w-[160px] transition-[box-shadow] duration-[400ms] hover:shadow-button-primary-2-hovered
             border-solid border-error-2 shadow-custom-error-1 py-2 rounded-[100px] w-full"
              >
                <span className="text-white font-sans text-xl group-hover:-translate-y-[2px] inline-block transition-[transform] duration-[400ms]">
                  Try again
                </span>
              </button>
            </div>
          </>
        )}

        {showCorrect && (
          <>
            <div
              className="text-[1.625rem] font-roboto text-orbit-primary text-center my-3"
              dangerouslySetInnerHTML={{
                __html: consentMessage.description_for_popup_correct.replace(
                  /\%MEMBER_NAME\%/gi,
                  `<span class="font-bold">${member.name}</span>`
                ),
              }}
            />
            <div className="flex items-end justify-center pr-4">
              <button
                key="prompt-message-correct"
                onClick={onClickNext}
                className="group relative flex items-center justify-center border-[2px]
              bg-success-1 w-[160px] transition-[box-shadow] duration-[400ms] hover:shadow-button-primary-2-hovered
             border-solid border-success-2 shadow-success-2 py-2 rounded-[100px] w-full"
              >
                <span className="text-white font-sans text-xl group-hover:-translate-y-[2px] inline-block transition-[transform] duration-[400ms]">
                  Next
                </span>
              </button>
            </div>
          </>
        )}

        {!showCorrect && !showInCorrect && (
          <div className="flex items-end justify-around pr-4 mt-4">
            <div className="flex flex-1 pl-4">
              <button
                key="orbit-yes-btn"
                onClick={() => onSelectAnswer("no")}
                className="transition-[box-shadow] duration-[400ms]
          border-orbit-primary shadow-orbit-primary-1 hover:shadow-orbit-primary-1-hovered
          bg-white-0 hover:bg-orbit-primary
          border-solid py-2 rounded-[1.875rem] w-full
          relative group flex items-center justify-center border-[2px]"
              >
                <span className="text-feeling-primary font-sans group-hover:text-white text-xl">
                  No
                </span>
              </button>
            </div>

            <div className="flex flex-1 pl-4">
              <button
                key="orbit-no-btn"
                onClick={() => onSelectAnswer("yes")}
                className="
              transition-[box-shadow] duration-[400ms]
          border-orbit-primary shadow-orbit-primary-1 hover:shadow-orbit-primary-1-hovered
          bg-white-0 hover:bg-orbit-primary
          border-solid py-2 rounded-[1.875rem] w-full
          relative group flex items-center justify-center border-[2px]"
              >
                <span className="text-feeling-primary font-sans group-hover:text-white text-xl">
                  Yes
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={`
    absolute flex inset-0 ${visible ? "" : "pointer-events-none opacity-0"}`}
    >
      <motion.div
        variants={modalContainer}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
        className={`absolute lg:w-[50%] md:w-[70%] bottom-0 flex flex-col justify-end items-center ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};
