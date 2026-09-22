/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import Introduction from "../components/Introduction.jsx";
import EnterName from "../components/EnterName.jsx";
import GetStart from "../components/GetStart.jsx";
import classNames from "classnames";
import game1 from "src/common/apis/game1.js";
import { IdentifyingFeelingGameModeContainer } from "src/features/identifyingFeelings/containers/GameMode";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  GAME_MODE,
  resetGamePlay,
  setCurrentRound,
  setRoundData,
} from "src/reducers/identifyFeeling.slice";
import { IdentifyingFeelingGamePlayContainer } from "src/features/identifyingFeelings/containers/GamePlay";
import { FeelingPhotoContainer } from "src/features/identifyingFeelings/containers/FeelingPhoto";
import { GAMEPLAY, setPlayerData } from "src/reducers/player.slice";
import { Landing } from "src/components/Landing";
import { useMediaQuery } from "react-responsive";
import { CheckRotate, Mobile } from "src/components";

const IdentifyingFeelings = () => {
  const dataGame = useSelector(
    (state) => state.identifyFeelingGamePlay,
    shallowEqual
  );
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const currentRound = useSelector(
    (state) => state.identifyFeelingGamePlay.currentRound,
    shallowEqual
  );
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [windowSizeHeight, setWindowSizeHeight] = useState(window.innerHeight);

  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth);
    setWindowSizeHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    const fetchGame1 = async () => {
      dispatch(
        setPlayerData({
          currentGamePlay: GAMEPLAY.IDENTITY_FEELING,
        })
      );

      try {
        const response = await game1
          .get("pages/9?_fields=acf&acf_format=standard")
          .catch((err) => {
            console.log("Err: ", err);
          });

        const gameData = response?.data?.acf;
        dispatch(
          setRoundData({
            ...gameData,
            firstRound: gameData.data_first_round.map((item) => {
              Object.assign(item, { image: item.image_feeling?.url });
              return item;
            }),
            secondRound: gameData.data_second_round.map((item) => {
              Object.assign(item, { image: item.image_feeling?.url });
              return item;
            }),
          })
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGame1();
  }, []);

  function handleChangePage(number) {
    return setPage(number);
  }

  const onPlayNextRound = () => {
    handleChangePage(currentRound < 2 ? 4 : 3);

    if (currentRound < 2) {
      dispatch(setCurrentRound(currentRound + 1));
    } else {
      setActive(0);
      dispatch(setCurrentRound(1));
      dispatch(resetGamePlay());
    }
  };

  if (isMobile || (isLandscape && windowSizeHeight < 450 && windowSize < 900)) {
    return <Mobile />;
  }

  const checkHeader = (page, dataGame) => {
    if (page === (dataGame?.gameMode === GAME_MODE.SINGLE ? 4 : 5)) {
      return (
        <GetStart
          currentPage={page}
          handleSetPage={(number) => handleChangePage(number)}
          pageActive={dataGame?.gameMode === GAME_MODE.SINGLE ? 4 : 5}
        />
      );
    }
    return (
      <MasterLayout>
        <>
          {loading && (
            <div className="block-loading bg-feeling-primary">
              <span>Loading</span>
              <div className="progress">
                <div className="color"></div>
              </div>
            </div>
          )}
          {page === 0 && (
            <Landing
              description={dataGame?.description_landing_page}
              background={dataGame?.image_background_landing_page?.url}
              onNext={() => handleChangePage(1)}
              title={dataGame?.title_landing_page}
            />
          )}
          {/* Introduction */}
          {page === 1 && (
          <Introduction
            data={dataGame?.slider_instructions_game}
            currentPage={page}
            handleSetPage={(number) => handleChangePage(number)}
            pageActive={1}
            setActive={setActive}
            active={active}
            dataBg={[
              "/game-orbit/common/feeling-instruction-1.png",
              "/game-orbit/common/feeling-instruction-2.png",
              "/game-orbit/common/feeling-instruction-3.png",
            ]}
          />)}

          {/* Enter name */}
          {page === 2 && (
          <EnterName
            currentPage={page}
            handleSetPage={(number) => handleChangePage(number)}
            pageActive={2}
            dataBg="/game-orbit/common/feeling-bg-game.png"
          />)}

          {/* Game mode */}
          {page === 3 && (
          <div
            style={{
              backgroundImage: "url(/game-orbit/common/feeling-bg-game.png)",
            }}
            className={classNames(
              "game-container fullscreen bg-feeling-primary fullscreen-not-scroll hidden-layout",
              {
                "active-layout": page === 3,
              }
            )}
          >
            <div className="container">
              <IdentifyingFeelingGameModeContainer
                title={dataGame?.title_screen_gamemode}
                gameModeData={dataGame?.items_gamemode}
                goBack={() => {
                  handleChangePage(2);
                }}
                onNext={() => {
                  handleChangePage(4);
                }}
              />
            </div>
          </div>)}

          {dataGame.gameMode === GAME_MODE.MULTIPLE && (
            <div
              style={{
                backgroundImage: "url(/game-orbit/common/feeling-bg-game.png)",
              }}
              className={classNames(
                "game-container fullscreen bg-feeling-primary flex flex-col w-full hidden-layout justify-start pb-0",
                {
                  "active-layout": page === 4,
                }
              )}
            >
              {page === 4 && (
                <FeelingPhotoContainer
                  goBack={() => {
                    handleChangePage(3);
                  }}
                  onNext={() => {
                    handleChangePage(5);
                  }}
                />
              )}
            </div>
          )}

          {/* Play game */}
          {
            page === (dataGame.gameMode === GAME_MODE.SINGLE ? 5 : 6) && (
              <div
                style={{
                  backgroundImage:
                    "url(/game-orbit/common/feeling-bg-gameplay@2x.png)",
                }}
                className={classNames(
                  "game-container fullscreen bg-feeling-primary flex flex-col w-full hidden-layout justify-start pb-0",
                  {
                    "active-layout":
                      page === (dataGame.gameMode === GAME_MODE.SINGLE ? 5 : 6)
                  }
                )}
              >
                <IdentifyingFeelingGamePlayContainer
                  playNextRound={onPlayNextRound}
                />
              </div>
            )
          }

          {/* End Play game */}
        </>

        {isPortrait && (
          <div className="absolute inset-0">
            <CheckRotate />
          </div>
        )}
      </MasterLayout>
    )
  }

  return (
    checkHeader(page, dataGame)
  );
};

export default IdentifyingFeelings;
