import React, { useState, useEffect, useCallback } from 'react'
import {
  Introduction,
  EnterName,
  GetStart,
  PlayStyle,
  DragItem,
  CheckRotate,
  Mobile,
  MasterLayout,
  DragItemV2
} from './../components'
import classNames from 'classnames'
import game1 from 'src/common/apis/game1.js'
import { isEmpty } from 'lodash'
import instructions1 from '../assets/images/instructions-1.png'
import instructions2 from '../assets/images/instructions-2.png'
import instructions3 from '../assets/images/instructions-3.png'
import playerName from '../assets/images/player-name.png'
import playstyle from '../assets/images/playstyle.png'
import { useMediaQuery } from 'react-responsive'
import {GAMEPLAY, setPlayerData} from "src/reducers/player.slice";
import {useDispatch} from "react-redux";
import {Landing} from "src/components/Landing";

const PrivateAndPublic = () => {
  const [dataGame, setDataGame] = useState([]);
  const [page, setPage] = useState(0);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [windowSizeHeight, setWindowSizeHeight] = useState(window.innerHeight);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const [columns, setColumns] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 500 })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

  const handleWindowResize = useCallback(event => {
    setWindowSize(window.innerWidth);
    setWindowSizeHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    const fetchGame1 = async() => {
      dispatch(
          setPlayerData({
            currentGamePlay: GAMEPLAY.PRIVATE_AND_PUBLIC,
          })
      );
      const response = await game1
        .get('pages/7?_fields=acf&acf_format=standard')
        .catch((err) => {
          console.log("Err: ", err);
        });
        setDataGame(response?.data?.acf);
      setLoading(false);
    }
    if(isEmpty(dataGame)) {
      fetchGame1();
    }
  }, [dataGame])

  const convertData = (data) => {
    if(!isEmpty(data)) {
      return data.map((item, index) => {
        return {
          ...item,
          index: index,
          id: `img-${index}`
        }
      });
    }
    return [];
  }

  useEffect(() => {
    const columnsFromBackend = {
      list1: {
        name: "List img",
        items: convertData(dataGame?.data_first_round).reverse()
      },
      public: {
        type: true,
        name: "Public",
        items: []
      },
      private: {
        type: false,
        name: "Private",
        items: []
      }
    };
    setColumns(columnsFromBackend);
  }, [dataGame, page]);

  const handleChangePage = (number) => {
    return setPage(number);
  }

  const checkHeader = (page, loading) => {
    if (isMobile || (isLandscape && windowSizeHeight < 450 && windowSize < 900)) {
      return (
        <Mobile />
      )
    }

    if (isPortrait) {
      return (
        <MasterLayout>
          <CheckRotate />
        </MasterLayout>
      )
    }

    if(page === 4 || page === 6) {
      return (
        <GetStart
          currentPage={page}
          handleSetPage={(number) => handleChangePage(number)}
          pageActive={page}
        />
      )
    }
    return (
      <MasterLayout data={dataGame}>
        <>
          {loading && (
            <div className="block-loading" style={{background: "#032E26"}}>
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
            dataBg={[instructions1, instructions2, instructions3]}
          />)}

          {/* Enter name */}
          {page === 2 && (
            <EnterName
              currentPage={page}
              handleSetPage={(number) => handleChangePage(number)}
              pageActive={2}
              dataBg={playerName}
            />
          )}

          {/* Playstyle */}
          {page === 3 && (
            <PlayStyle
              data={dataGame?.items_playstyles}
              dataTitle={dataGame?.title_screen_playstyle}
              currentPage={page}
              handleSetPage={(number) => handleChangePage(number)}
              pageActive={3}
              dataBg={playstyle}
            />
          )}

          {/* Play game */}
          {page === 5 && (
            <div
              className={classNames(
                "game-container fullscreen bg-game-play fullscreen-not-scroll hidden-layout",
                {
                  "active-layout": page === 5,
                }
              )}
            >
              <h3 className="title-block title-block__default title-block__full">
                {dataGame?.title_question_game}
              </h3>
              <div className="content-game-play">
                <DragItem
                  currentPage={page}
                  data={dataGame?.data_first_round}
                  columns={columns}
                  setColumns={setColumns}
                  handleSetPage={(number) => handleChangePage(number)}
                />
              </div>
              <div className="block-action block-action_absolute">
                <span className="title-block title-block__primary title-block__swipe">
                  {dataGame?.title_bottom_yellow_game}
                </span>
              </div>
            </div>
          )}
          {/* End Play game */}

          {/* Play game round 2 */}
          {page === 7 && (
            <div
              className={classNames(
                "game-container fullscreen bg-game-play fullscreen-not-scroll hidden-layout",
                {
                  "active-layout": page === 7,
                }
              )}
            >
              <h3 className="title-block title-block__default title-block__full">
                {dataGame?.title_question_game_r2}
              </h3>
              <div className="content-game-play">
                <DragItemV2
                  currentPage={page}
                  data={dataGame?.data_second_round}
                  handleSetPage={(number) => handleChangePage(number)}
                  setActive={setActive}
                  dataGameOther={dataGame?.play_games_other}
                  desGameOver={dataGame?.description_game_over}
                />
              </div>
              <div className="block-action block-action_absolute">
                <span className="title-block title-block__primary title-block__swipe">
                  {dataGame?.title_bottom_yellow_game_r2}
                </span>
              </div>
            </div>
          )}
          {/* End Play game round 2 */}
        </>
      </MasterLayout>
    );
  }

  return (
    checkHeader(page, loading)
  );
};

export default PrivateAndPublic;
