/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import React, { useMemo, useRef, useState } from "react";
import { FeelingPhotoItem } from "src/features/identifyingFeelings/containers/FeelingPhoto/FeelingPhotoItem";
import { FeelPhotoPickerContainer } from "src/features/identifyingFeelings/containers/FeelingPhoto/FeelPhotoPicker";
import {
  GAME_MODE,
  updateFeelingData,
} from "src/reducers/identifyFeeling.slice";

export const FeelingPhotoContainer = ({ goBack, onNext }) => {
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const selectedFeelingItem = useRef();
  const gameData = useSelector(
    (state) => state.identifyFeelingGamePlay,
    shallowEqual
  );
  const currentRound = useSelector(
    (state) => state.identifyFeelingGamePlay.currentRound,
    shallowEqual
  );
  const dispatch = useDispatch();

  const getRoundData = useMemo(() => {
    if (currentRound === 1) {
      return gameData.firstRound;
    } else {
      return gameData.secondRound;
    }
  }, [currentRound, gameData]);

  const isShowPlayButton = useMemo(() => {
    return (
      gameData.gameMode !== GAME_MODE.SINGLE &&
      getRoundData.filter((item) => item.isCustomAvatar).length ===
        getRoundData.length
    );
  }, [currentRound, gameData, getRoundData]);

  const onSelectAvatar = (item) => {
    selectedFeelingItem.current = item;
    setShowPhotoPicker(true);
  };

  const onSubmitPhoto = (url) => {
    dispatch(
      updateFeelingData({
        image: url,
        label: selectedFeelingItem.current.label_feeling,
      })
    );

    setShowPhotoPicker(false);
    selectedFeelingItem.current = null;
  };

  const renderFeelingItem = (item) => {
    return (
      <FeelingPhotoItem
        key={item.label_feeling}
        feelingData={item}
        onDeleteAvatar={() => {
          dispatch(
            updateFeelingData({
              label: item.label_feeling,
              isDelete: true,
            })
          );
        }}
        onSelectAvatar={() => onSelectAvatar(item)}
      />
    );
  };

  return (
    <div className="-mx-[47px] overflow-auto flex flex-col items-center">
      <div className="flex items-center flex-col w-full md:px-[1rem] xl:px-0">
        <h3 className="text-game1-secondary font-bold font-sans text-[2.375rem] text-center">
          Player 1
        </h3>

        <div
          className="font-roboto text-white text-[1.625rem] text-center max-w-[820px]"
          dangerouslySetInnerHTML={{
            __html: gameData.description_before_ready,
          }}
        />

        <div
          className={`w-full grid pt-4 ${
            currentRound < 2
              ? "grid-cols-4 gap-4 max-w-[1100px]"
              : "grid-cols-3 gap-4 max-w-[780px] pb-4"
          }`}
        >
          {getRoundData.map(renderFeelingItem)}
        </div>

        <div
          className={`flex items-center justify-center md:pt-4 xl:pt-8 relative flex-shrink-0 ${
            currentRound === 2 ? "pb-8" : ""
          }`}
        >
          {currentRound < 2 && (
            <button
              onClick={goBack}
              className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
            >
              Back
            </button>
          )}
          <button
            disabled={!isShowPlayButton}
            onClick={onNext}
            className={`gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right ${
              isShowPlayButton ? "opacity-100" : "opacity-50"
            }`}
          >
            Play game
          </button>
        </div>

        <FeelPhotoPickerContainer
          visible={showPhotoPicker}
          onSubmitPhoto={onSubmitPhoto}
          onRequestClose={() => {
            selectedFeelingItem.current = null;
            setShowPhotoPicker(false);
          }}
        />
      </div>
    </div>
  );
};
