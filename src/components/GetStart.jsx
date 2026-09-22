import React, { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import ufo from "../assets/images/UFO.svg";
import { useSelector } from "react-redux";
import { GAMEPLAY } from "src/reducers/player.slice";
import { GAME_MODE } from "src/reducers/identifyFeeling.slice";

const GetStart = (props) => {
  const { handleSetPage, pageActive, currentPage } = props;
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);
  const [countNumber, setCountdown] = useState(4);
  const isShowFeelingPlayer = useSelector((state) => {
    const { gameMode } = state.identifyFeelingGamePlay;
    const { currentGamePlay } = state.player;

    return (
      currentGamePlay === GAMEPLAY.IDENTITY_FEELING &&
      gameMode === GAME_MODE.MULTIPLE
    );
  });

  useEffect(() => {
    function countDown() {
      setTimeout(setCountdown(countNumber - 1), 1000);
      if (countNumber === 1) {
        handleSetPage(currentPage + 1);
      }
    }

    if (currentPage === pageActive) {
      if (countNumber === 4) {
        setTimeout(countDown, 4000);
      } else {
        setTimeout(countDown, 1000);
      }
    }
  }, [countNumber, currentPage]);

  const getTrapezoidClass = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "trapezoid-orbit"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "trapezoid-feeling"
      : "trapezoid";
  }, [currentGamePlay]);

  const getBackgroundGame = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "bg-game-ready bg-game-orbit-ready"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "bg-game-ready bg-game-feeling-ready"
      : "bg-game-ready";
  }, [currentGamePlay]);

  const getGamePlayBackgroundColor = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "bg-orbit-primary-1"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "bg-feeling-primary"
      : "bg-game-three";
  }, [currentGamePlay]);

  return (
    <div
      className={classNames(
        `game-container fullscreen ${getBackgroundGame} ${getGamePlayBackgroundColor} fullscreen-not-scroll pb-0 hidden-layout`,
        {
          "active-layout": currentPage === pageActive,
        }
      )}
    >
      {currentPage === pageActive && (
        <div className="box-ufo-ready">
          <img className="img-rotate" src={ufo} alt="" />
          <div className={getTrapezoidClass}>
            <span className="count-down__ready">
              {countNumber <= 3 && countNumber}
            </span>
          </div>

          <div className="flex flex-col items-center">
            {isShowFeelingPlayer && countNumber <= 3 && (
              <span className="text-game1-secondary font-sans text-[1.75rem]">
                Player 2
              </span>
            )}
            <span
              className={`title-block title-block__default title-block-custom__top text-center ${
                isShowFeelingPlayer ? "mt-0" : ""
              }`}
            >
              {countNumber <= 3 && <span>Get ready</span>}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStart;
