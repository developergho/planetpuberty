import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { GAMEPLAY } from "src/reducers/player.slice";

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

export const FinishRoundModal = ({
  visible,
  title,
  content,
  contentGameOver,
  image,
  otherGames,
  currentRound,
  isEndGame,
  onExit,
  onPlayNextRound,
}) => {
  const player = useSelector((state) => state.player, shallowEqual);
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);

  const getGamePlayBorder = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "border-orbit-primary-1 shadow-orbit-primary-1"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "border-feeling-primary shadow-feeling-primary"
      : "";
  }, [currentGamePlay]);

  const getGamePlayText = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "text-orbit-primary-1"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "text-feeling-primary"
      : "";
  }, [currentGamePlay]);

  const getRoundTextColor = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "text-orbit-primary-1"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "text-feeling-primary-1"
      : "";
  }, [currentGamePlay]);

  const renderOtherGame = (game, index) => {
    return (
      <div key={`OTHER_GAME_${index}`} className={`col-6 ${!index ? 'pr-[10px]' : 'pl-[10px]'}`}>
        <a
          key={game.link_item_play_game}
          href={game.link_item_play_game}
          className={`flex flex-col items-center`}
        >
          <div className="relative w-[260px] h-[181px]">
            <img
              className="object-cover inset-0 w-full absolute h-full"
              src={game.image_item_play_game.url}
              alt={game.title_item_play_game}
            />
          </div>

          <p className="font-sans font-bold text-orbit-primary-1 text-lg text-center pt-2">
            {game.title_item_play_game}
          </p>
        </a>
      </div>
    );
  };

  const renderContent = () => {
    if (isEndGame) {
      return (
        <div
          className={`w-full rounded-[1.875rem] border-solid border-4 ${getGamePlayBorder} bg-white py-4`}
        >
          <h2
            className={`font-sans ${getGamePlayText} text-center text-[2.375rem]`}
          >
            You did it {player.name}!
          </h2>

          <div
            className={`${getGamePlayText} text-[1.375rem] leading-[1.625rem] font-roboto text-center pb-4 px-4`}
            dangerouslySetInnerHTML={{
              __html: contentGameOver.replace(
                /\%PLAYER_NAME\%/gi,
                `<span>${player.name}</span>`
              ),
            }}
          />

          <div className="flex justify-center">
            <div className="row">{otherGames.map(renderOtherGame)}</div>
          </div>

          <div className="flex items-center justify-center pt-4">
            <button
              onClick={() => onExit()}
              className="gho-btn-action gho-btn-action__exit gho-icon-btn gho-icon-btn__exit f-20"
            >
              Exit
            </button>
            <button
              onClick={() => onPlayNextRound()}
              className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right f-20"
            >
              Play again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`w-full rounded-[1.875rem] border-solid border-4 ${getGamePlayBorder} bg-white py-4`}
      >
        <h2
          className={`font-sans ${getGamePlayText} text-center text-[2.375rem] mb-4`}
        >
          {title}
        </h2>

        <div className="flex flex-column items-center justify-center relative">
          <img src={image} alt="round-cover" />

          <div className="flex flex-col items-center justify-center absolute">
            <span className="font-sans opacity-75">Round</span>
            <div className="relative flex items-center justify-center">
              <h1
                className={`text-[7rem] font-sans ${getRoundTextColor} absolute translate-x-[3px] translate-y-[3px]`}
              >
                {currentRound}
              </h1>
              <h1 className={`text-[7rem] font-sans ${getGamePlayText} z-10`}>
                {currentRound}
              </h1>
            </div>
          </div>
        </div>

        <div
          className={`${getGamePlayText} text-[1.375rem] leading-[1.625rem] font-roboto text-center p-4`}
          dangerouslySetInnerHTML={{
            __html: content.replace(
              /\%PLAYER_NAME\%/gi,
              `<span>${player.name}</span>`
            ),
          }}
        />

        <div className="flex items-center justify-center">
          <button
            onClick={() => onExit()}
            className="gho-btn-action gho-btn-action__exit gho-icon-btn gho-icon-btn__exit f-20"
          >
            Exit
          </button>
          <button
            onClick={() => onPlayNextRound()}
            className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right f-20"
          >
            Play next round
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
    absolute flex top-0 left-0 right-0 bottom-0 ${
      visible ? "" : "pointer-events-none opacity-0"
    }`}
    >
      <motion.div
        variants={backDrop}
        animate={visible ? "show" : "hidden"}
        initial="hidden"
        className="absolute top-0 right-0 bottom-0 left-0 bg-feeling-primary pointer-events-none"
      />

      {visible && (
        <img
          className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          src="/game-orbit/common/firework.gif"
          alt=""
        />
      )}

      <motion.div
        variants={modalContainer}
        initial="hidden"
        animate={visible ? "show" : "hidden"}
        className={`absolute max-w-[820px] w-full flex flex-col items-center justify-center ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};
