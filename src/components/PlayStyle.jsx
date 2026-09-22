import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { GAMEPLAY } from "src/reducers/player.slice";

const EnterName = (props) => {
  const { dataTitle, onSelectPlayStyle } = props;
  const [dataPlayStyles, setData] = useState([]);
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);

  useEffect(() => {
    setData(props?.data);
  }, [props]);

  const { handleSetPage, pageActive, currentPage, dataBg } = props;

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
        `game-container fullscreen ${getGamePlayBackground} fullscreen-not-scroll hidden-layout`,
        {
          "active-layout": currentPage === pageActive,
        }
      )}
      style={{ backgroundImage: `url(${dataBg})` }}
    >
      <h3 className="title-block title-block__primary">{dataTitle}</h3>
      <div className="choose-game">
        {!isEmpty(dataPlayStyles) &&
          dataPlayStyles.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                !!onSelectPlayStyle
                  ? onSelectPlayStyle()
                  : handleSetPage(currentPage + 1 + index)
              }
              className="choose-game__item"
            >
              <div
                className="choose-game__item--image"
                style={{ backgroundImage: `url(${item?.icon_playstyle?.url})` }}
              >
                <img
                  src={item?.icon_playstyle?.url}
                  alt={item?.icon_playstyle?.alt}
                />
              </div>
              <div className="choose-game__item--content">
                <h4 className="title-item-choose">{item?.heading_playstyle}</h4>
                <div
                  className="content-item-choose"
                  dangerouslySetInnerHTML={{
                    __html: item.description_playstyle,
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>

      <div className="block-action block-action_absolute">
        <button
          onClick={() => handleSetPage(currentPage - 1)}
          className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
        >
          Back
        </button>
        <button
          onClick={() =>
            !!onSelectPlayStyle
              ? onSelectPlayStyle()
              : handleSetPage(currentPage + 1)
          }
          className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right"
        >
          Play game
        </button>
      </div>
    </div>
  );
};

export default EnterName;
