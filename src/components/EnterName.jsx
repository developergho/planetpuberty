import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { GAMEPLAY, setPlayerData } from "src/reducers/player.slice";

const EnterName = (props) => {
  const { handleSetPage, pageActive, currentPage, dataBg } = props;
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const currentGamePlay = useSelector((state) => state.player.currentGamePlay);

  function handleChangeName(e) {
    const rx_live = /^[A-Za-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚƯỨỰỪỮĂĐĨŨƠàáâãèéêìíòóôõùúưứữừựăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    if (e.target.value === "" || rx_live.test(e.target.value)) {
      setName(e.target.value);
    }
  }

  function handleSaveName(e, currentPage) {
    e.preventDefault();
    if(name && name.trim() !== '') {
      localStorage.setItem("playerName", name.trim());
      dispatch(setPlayerData({ name: name.trim() }));
      handleSetPage(currentPage);
    }
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
        `game-container fullscreen ${getGamePlayBackground} fullscreen-not-scroll hidden-layout`,
        {
          "active-layout": currentPage === pageActive,
        }
      )}
      style={{ backgroundImage: `url(${dataBg})` }}
    >
      <form onSubmit={(e) => handleSaveName(e, currentPage + 1)}>
        <div className="box-name">
          <h3 className="title-block title-block__primary">What is your name?</h3>
          <div className="box-input-name">
            <input
              type="text"
              value={name}
              onChange={(e) => handleChangeName(e)}
              maxLength="18"
            />
          </div>
        </div>
        <div className="block-action block-action_absolute">
          <button
            type="button"
            onClick={() => handleSetPage(currentPage - 1)}
            className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
          >
            Back
          </button>
          {name.trim() !== "" && (
            <button
              type="submit"
              className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnterName;
