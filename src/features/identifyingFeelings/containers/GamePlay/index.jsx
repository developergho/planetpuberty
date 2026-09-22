/* eslint-disable react-hooks/exhaustive-deps */
import { shallowEqual, useSelector } from "react-redux";
import { GAME_MODE } from "src/reducers/identifyFeeling.slice";
import { IdentifyFeelingCard } from "src/features/identifyingFeelings/components/IdentifyFeelingCard";
import { useMemo, useState } from "react";
import { FinishRoundModal } from "src/components/FinishRoundModal";

export const IdentifyingFeelingGamePlayContainer = ({
  playNextRound: propPlayNextRound,
}) => {
  const player = useSelector((state) => state.player, shallowEqual);
  const gamePlayData = useSelector((state) => state.identifyFeelingGamePlay);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finishRoundVisible, setFinishRoundVisible] = useState(false);

  const getRoundData = useMemo(() => {
    if (gamePlayData.currentRound === 1) {
      return gamePlayData.firstRound;
    } else {
      return gamePlayData.secondRound;
    }
  }, [gamePlayData]);

  const renderRoundItem = (roundData, index) => {
    return (
      <IdentifyFeelingCard
        key={`IDENTITY_FEELING_CARD_${index}`}
        visible={currentIndex === index}
        onGoNext={getNextFeelingItem}
        feelingData={roundData}
      />
    );
  };

  const playNextRound = () => {
    propPlayNextRound();
  };

  const getNextFeelingItem = () => {
    if (currentIndex === getRoundData.length - 1) {
      setFinishRoundVisible(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onEdit = () => {
    setFinishRoundVisible(false);
  };

  return (
    <>
      <div className="flex flex-col grow">
        <h1 className="text-[1.875rem] text-game1-secondary font-sans font-bold text-center">
          {gamePlayData.gameMode === GAME_MODE.SINGLE
            ? player.name
            : "Player 2"}
        </h1>

        <h2 className="text-white text-[2.375rem] font-sans text-center">
          {gamePlayData.currentRound === 1
            ? gamePlayData.title_question_game
            : gamePlayData.title_question_game_r2}
        </h2>

        <div className="flex flex-col grow relative">
          {getRoundData.map(renderRoundItem)}
        </div>
      </div>

      <FinishRoundModal
        visible={finishRoundVisible}
        title={gamePlayData.title_popup_result_round}
        currentRound={gamePlayData.currentRound}
        content={gamePlayData.description_popup_result_round}
        contentGameOver={gamePlayData.description_game_over}
        image={gamePlayData?.icon_popup_result_round?.url}
        isEndGame={gamePlayData.currentRound === 2}
        otherGames={gamePlayData.play_games_other}
        onPlayNextRound={playNextRound}
        onExit={onEdit}
      />
    </>
  );
};
