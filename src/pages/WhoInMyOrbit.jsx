import React, { useCallback, useEffect, useMemo, useState } from "react";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import Introduction from "../components/Introduction.jsx";
import EnterName from "../components/EnterName.jsx";
import PlayStyle from "../components/PlayStyle.jsx";
import classNames from "classnames";
import game1, { getPersonalizeCategories } from "src/common/apis/game1.js";
import { ChooseAvatarContainer } from "src/features/whoInMyOrbit/containers/ChooseAvatar";
import { OrbitCategoryContainer } from "src/features/whoInMyOrbit/containers/OrbitCategory";
import { OrbitGamePlayContainer } from "src/features/whoInMyOrbit/containers/OrbitGamePlay";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GAMEPLAY, setPlayerData } from "src/reducers/player.slice";
import {
  ORBIT_GAME_MODE,
  setCurrentRound,
  setDefaultAvatar,
  setGamePlayInfo,
  updateGameData,
} from "src/reducers/orbitGamePlay.slice";
import GetStart from "src/components/GetStart";
import { cloneDeep } from "lodash/lang";
import { randomIntegerInRange } from "src/common/helpers";
import { IdentifyingFeelingGameModeContainer } from "src/features/identifyingFeelings/containers/GameMode";
import { setCategories } from "src/reducers/orbitPersonalizedCategories.slice";
import { useMediaQuery } from "react-responsive";
import { CheckRotate, Mobile } from "src/components";
import { Landing } from "src/components/Landing";

const WhoInMyOrbit = () => {
  const [dataGame, setDataGame] = useState([]);
  const gameMode = useSelector(
    (state) => state.orbitGamePlay.gameMode,
    shallowEqual
  );
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.personalized.categories);
  const currentRound = useSelector((state) => state.orbitGamePlay.currentRound);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [windowSizeHeight, setWindowSizeHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(true);

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
      try {
        dispatch(
          setPlayerData({
            currentGamePlay: GAMEPLAY.ORBIT,
          })
        );
        const response = await game1.get(
          "pages/11?_fields=acf&acf_format=standard"
        );
        const gameData = response?.data?.acf;

        const { data: categoryData } = await getPersonalizeCategories();
        dispatch(setCategories(categoryData));

        setDataGame(gameData);

        dispatch(setDefaultAvatar(gameData.avatars_default));
        dispatch(setGamePlayInfo(gameData));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGame1();
  }, []);

  const isCustomPersonalize = useMemo(() => {
    return gameMode === ORBIT_GAME_MODE.CUSTOM_PERSONALIZE;
  }, [gameMode]);

  function handleChangePage(number) {
    return setPage(number);
  }

  const onStartGamePlay = () => {
    const MAX_MEMBER = 2;
    const generateRoundData = () =>
      categories.reduce((acc, category) => {
        const result = [];
        const members = cloneDeep(category.members);
        const customMembers = members.filter((item) => item.isAddNew);
        const defaultMembers = members.filter((item) => !item.isAddNew);

        if (customMembers.length && customMembers.length < 2) {
          const member = cloneDeep(customMembers[0]);
          if (member) {
            result.push(member);
            customMembers.splice(0, 1);
          }
        } else {
          for (let index = 0; index < MAX_MEMBER; index++) {
            const randomIndex = randomIntegerInRange(
              0,
              customMembers.length - 1
            );
            const member = cloneDeep(customMembers[randomIndex]);
            if (member) {
              result.push(member);
              customMembers.splice(randomIndex, 1);
            }
          }
        }

        while (result.length < 2) {
          const randomIndex = randomIntegerInRange(
            0,
            defaultMembers.length - 1
          );
          const member = cloneDeep(defaultMembers[randomIndex]);

          if (member) {
            result.push(member);
            defaultMembers.splice(randomIndex, 1);
          }
        }

        acc = acc.concat(result);
        return acc;
      }, []);

    const firstRound = generateRoundData();
    const secondRound = generateRoundData();

    dispatch(
      updateGameData({
        firstRound,
        secondRound,
      })
    );

    handleChangePage(isCustomPersonalize ? 6 : 5);
  };

  const playNextRound = () => {
    handleChangePage(currentRound < 2 ? 5 : 2);

    if (currentRound < 2) {
      dispatch(setCurrentRound(currentRound + 1));
    } else {
      setActive(0);
      dispatch(setCurrentRound(1));
    }
  };

  const chooseAvatar = () => {
    handleChangePage(5);
  };

  const onSelectPlayStyle = (number) => {
    onStartGamePlay();
  };

  if (isMobile || (isLandscape && windowSizeHeight < 450 && windowSize < 900)) {
    return <Mobile />;
  }

  const checkHeader = (page, isCustomPersonalize) => {
    if (page === (isCustomPersonalize ? 7 : 6)) {
      return (
        <GetStart
          currentPage={page}
          handleSetPage={(number) => handleChangePage(number)}
          pageActive={isCustomPersonalize ? 7 : 6}
        />
      )
    }
    return (
      <MasterLayout>
        <>
          {loading && (
            <div className="block-loading bg-orbit-primary-1">
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
              "/game-orbit/common/orbit-instruction-1.png",
              "/game-orbit/common/orbit-instruction-2.png",
              "/game-orbit/common/orbit-instruction-3.png",
            ]}
          />)}

          {/* Game mode */}
          <div
            style={{
              backgroundImage: "url(/game-orbit/common/orbit-instruction-4.png)",
            }}
            className={classNames(
              "game-container fullscreen bg-orbit-primary-1 fullscreen-not-scroll hidden-layout",
              {
                "active-layout": page === 2,
              }
            )}
          >
            {page === 2 && (
              <div className="container">
                <IdentifyingFeelingGameModeContainer
                  title={dataGame?.title_screen_gamemode}
                  gameModeData={dataGame?.items_gamemode}
                  goBack={() => handleChangePage(1)}
                  onClickMode={(mode) => {
                    let gameMode;

                    if (mode.heading_gamemode.toLowerCase().includes("quick")) {
                      gameMode = ORBIT_GAME_MODE.QUICK_GAME;
                    } else {
                      gameMode = ORBIT_GAME_MODE.CUSTOM_PERSONALIZE;
                    }

                    dispatch(
                      updateGameData({
                        gameMode,
                      })
                    );

                    handleChangePage(3);
                  }}
                  onNext={() => {
                    handleChangePage(3);
                  }}
                />
              </div>
            )}
          </div>

          {/* Enter name */}
          {page === 3 && (
          <EnterName
            currentPage={page}
            handleSetPage={(number) => handleChangePage(number)}
            pageActive={3}
            dataBg="/game-orbit/common/orbit-main-bg.png"
          />)}

          <div
            style={{
              backgroundImage: "url(/game-orbit/common/orbit-main-bg.png)",
            }}
            className={classNames(
              "game-container fullscreen bg-orbit-primary-1 fullscreen-not-scroll hidden-layout",
              {
                "active-layout": page === 4,
              }
            )}
          >
            {page === 4 && (
              <ChooseAvatarContainer
                goBack={() => handleChangePage(3)}
                onNext={chooseAvatar}
              />
            )}
          </div>

          <div
            style={{
              backgroundImage: "url(/game-orbit/common/orbit-main-bg.png)",
            }}
            className={classNames(
              "game-container fullscreen bg-orbit-primary-1 fullscreen-not-scroll hidden-layout pb-0",
              {
                "active-layout": page === (isCustomPersonalize ? 5 : null),
              }
            )}
          >
            <OrbitCategoryContainer
              goBack={() => handleChangePage(page - 1)}
              onNext={() => onStartGamePlay()}
            />
          </div>

          {/* Playstyle */}
          {page === (isCustomPersonalize ? 6 : 5) && (
          <PlayStyle
            data={dataGame?.items_playstyles}
            currentPage={page}
            dataTitle={dataGame?.title_screen_playstyle}
            handleSetPage={handleChangePage}
            onSelectPlayStyle={() => {
              onSelectPlayStyle();
              handleChangePage(isCustomPersonalize ? 7 : 6);
            }}
            pageActive={isCustomPersonalize ? 6 : 5}
            dataBg="/game-orbit/common/orbit-main-bg.png"
          />)}

          {/* Play game */}
          <div
            className={classNames(
              "game-container fullscreen fullscreen-not-scroll hidden-layout pb-0 select-none",
              {
                "active-layout": page === (isCustomPersonalize ? 8 : 7),
              }
            )}
          >
            {page === (isCustomPersonalize ? 8 : 7) && (
              <>
                <div className="absolute pointer-events-non inset-0">
                  <img
                    src="/game-orbit/common/orbit-gameplay-bg.png"
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 p-4">
                  <OrbitGamePlayContainer playNextRound={playNextRound} />
                </div>
              </>
            )}
          </div>

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
    checkHeader(page, isCustomPersonalize)
  );
};

export default WhoInMyOrbit;
