import { motion } from "framer-motion";
import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";

const modalContainer = {
  show: {
    top: "50%",
    left: "50%",
    translateX: "-50%",
    translateY: "-50%",
  },
  hidden: {
    top: "150%",
    left: "50%",
    translateX: "-50%",
    translateY: "-50%",
  },
};

const backDrop = {
  show: {
    opacity: 0.5,
  },
  hidden: {
    opacity: 0,
  },
};

export const LastMinuteInstruction = ({ visible, onConfirm }) => {
  const orbitGamePlayData = useSelector(
    (state) => state.orbitGamePlay,
    shallowEqual
  );
  const getRoundData = useMemo(() => {
    if (orbitGamePlayData.currentRound === 1) {
      return orbitGamePlayData.firstRound;
    } else {
      return orbitGamePlayData.secondRound;
    }
  }, [orbitGamePlayData]);

  const renderMember = (member) => {
    return (
      <div
        key={member.id}
        className="h-full w-full flex flex-col items-center justify-start"
      >
        <div className="relative w-full ratio-square">
          <img
            src={member.image}
            className="h-full w-full absolute inset-0 object-cover rounded-full"
            alt=""
          />
        </div>

        <h6 className="text-lg text-center font-sans font-bold mt-2 text-orbit-primary-1">
          {member.name}
        </h6>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="rounded-[1.875rem] border-solid border-1 border-orbit-primary shadow-primary-1 bg-white py-4 max-w-[820px]">
        <h2 className="font-sans text-orbit-primary-1 text-center text-[2.375rem] mb-4">
          {orbitGamePlayData.gamePlayInfo?.heading_last_minute_instructions}
        </h2>

        <div
          className="text-orbit-primary-1 text-[1.375rem] font-roboto text-center mb-4 px-4"
          dangerouslySetInnerHTML={{
            __html:
              orbitGamePlayData.gamePlayInfo
                ?.description_last_minute_instructions,
          }}
        />

        <div className="px-4">
          <div className="grid grid-cols-6 gap-4">
            {getRoundData.map(renderMember)}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={onConfirm}
            className="relative flex max-w-[200px] transition-[box-shadow] duration-500 hover:shadow-button-primary-1-hovered items-center justify-center border-solid shadow-button-primary-1 bg-orbit-pink py-2 rounded-[1.875rem] w-full"
          >
            <span className="text-white font-sans text-xl">Got it</span>
            <span className="absolute right-3">
              <i className="icon-arrow-right text-white" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
    absolute flex inset-0 ${visible ? "" : "pointer-events-none opacity-0"}`}
    >
      <motion.div
        variants={backDrop}
        animate={visible ? "show" : "hidden"}
        initial="hidden"
        className="absolute inset-0 bg-orbit-primary pointer-events-none"
      />

      <motion.div
        variants={modalContainer}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
        className={`absolute w-full flex flex-col items-center ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};
