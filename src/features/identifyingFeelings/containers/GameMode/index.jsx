import { GameModeItemContainer } from "src/features/identifyingFeelings/containers/GameMode/GameModeItem";
import React from "react";
import { useDispatch } from "react-redux";
import { GAME_MODE, updateGameData } from "src/reducers/identifyFeeling.slice";

export const IdentifyingFeelingGameModeContainer = ({
  gameModeData = [],
  title,
  onNext,
  onClickMode: propOnClickMode,
  goBack,
}) => {
  const dispatch = useDispatch();
  const onClickMode = (mode) => {
    dispatch(
      updateGameData({
        gameMode: mode,
      })
    );
    onNext();
  };

  const renderGameModeItem = (mode, index) => {
    return (
      <div
        key={mode.heading_gamemode}
        className="pl-4 pt-4"
      >
        <GameModeItemContainer
          mode={mode}
          onClickMode={() => {
            if (propOnClickMode) {
              return propOnClickMode(mode);
            }
            onClickMode(!index ? GAME_MODE.SINGLE : GAME_MODE.MULTIPLE);
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-column items-center">
        <h1 className="text-[1.75rem] leading-[2rem] text-center font-sans font-bold text-game1-secondary">
          {title}
        </h1>
      </div>

      <div className="flex justify-center pr-4">
        {gameModeData.map(renderGameModeItem)}
      </div>

      <div className="block-action block-action_absolute">
        <button
          onClick={goBack}
          className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
        >
          Back
        </button>
      </div>
    </div>
  );
};
