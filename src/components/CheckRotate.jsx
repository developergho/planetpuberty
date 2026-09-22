import React, { useMemo } from "react";
import classNames from "classnames";
import rotate from "../assets/images/rotate-icon.png";
import { GAMEPLAY } from "src/reducers/player.slice";
import { useSelector } from "react-redux";

const CheckRotate = (props) => {
  const { pageActive, currentPage } = props;
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);

  const getGamePlayBackground = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "bg-game-orbit-rotate"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "bg-game-feeling-rotate"
      : "bg-game-rotate";
  }, [currentGamePlay]);

  return (
    <div
      className={classNames(
        `game-container fullscreen ${getGamePlayBackground} fullscreen-not-scroll pb-0 hidden-layout`,
        {
          "active-layout": currentPage === pageActive,
        }
      )}
    >
      <div className="block-rotate">
        <img src={rotate} alt="icon rotate" />
        <span>Rotate your device</span>
      </div>
    </div>
  );
};

export default CheckRotate;
