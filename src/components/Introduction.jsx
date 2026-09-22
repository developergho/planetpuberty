import React, { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { GAMEPLAY } from "src/reducers/player.slice";

const Introduction = (props) => {
  const [data, setData] = useState([]);
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);

  useEffect(() => {
    setData(props?.data);
  }, [props]);

  const { handleSetPage, pageActive, currentPage, dataBg, active, setActive } = props;

  function sliderBack(number) {
    setActive(number - 1);
  }

  function sliderNext(number) {
    if (number !== data.length - 1) {
      return setActive(number + 1);
    }
    return handleSetPage(currentPage + 1);
  }

  const getGamePlayBackground = useMemo(() => {
    return currentGamePlay === GAMEPLAY.ORBIT
      ? "bg-orbit-primary-1"
      : currentGamePlay === GAMEPLAY.IDENTITY_FEELING
      ? "bg-feeling-primary"
      : "bg-game-three";
  }, [currentGamePlay]);

  return (
    <div
      className={classNames(
        `game-container fullscreen ${getGamePlayBackground} fullscreen-not-scroll hidden-layout flex-start`,
        {
          "active-layout": currentPage === pageActive,
        }
      )}
      style={{ backgroundImage: `url(${dataBg && dataBg[active]})` }}
    >
      {!isEmpty(data) && (
        <div className="container-slider">
          {data.map((item, index) => (
            <div
              key={index}
              className={classNames("item-intro-slider", {
                "active-slider": index === active,
              })}
            >
              <h3 className="title-block title-block__primary title-introduction">
                {item.title_instruction_game}
              </h3>
              <div className="item-intro-slider__dot">
                <img
                  className="image-introduction bg-white"
                  src={item.image_instruction_game.url}
                  alt=""
                />
                <div className="box-dot">
                  {data.map((itemDot, indexDot) => (
                    <span
                      className={classNames(`item-dot__${data.length}`, {
                        "active-dot": index === indexDot,
                      })}
                      key={indexDot}
                    ></span>
                  ))}
                </div>
              </div>
              <div
                className="content-introduction"
                dangerouslySetInnerHTML={{
                  __html: item.content_instruction_game,
                }}
              />
              <div className="block-action block-action_absolute">
                {index !== 0 && (
                  <button
                    onClick={() => sliderBack(index)}
                    className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => sliderNext(index)}
                  className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right"
                >
                  Next
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Introduction;
