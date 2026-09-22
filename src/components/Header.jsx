import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { GAMEPLAY } from "src/reducers/player.slice";
import game1 from 'src/common/apis/game1.js';

const Header = () => {
  const [dataGame, setDataGame] = useState([]);
  const currentGamePlay = useSelector(
    (state) => state.player.currentGamePlay,
    shallowEqual
  );

  const redirectUrl = (link) => {
    window.location = link;
  }

  useEffect(() => {
    const fetchGame1 = async () => {
      let currentGameId;

      switch (currentGamePlay) {
        case GAMEPLAY.IDENTITY_FEELING: {
          currentGameId = 9;
          break;
        }
        case GAMEPLAY.ORBIT: {
          currentGameId = 11;
          break;
        }
        case GAMEPLAY.PRIVATE_AND_PUBLIC: {
          currentGameId = 7;
          break;
        }
        default:
          break;
      }

      if (!currentGameId) return;

      const response = await game1
        .get(`pages/${currentGameId}?_fields=acf&acf_format=standard`)
        .catch((err) => {
          console.log("Err: ", err);
        });
      setDataGame(response?.data?.acf);
    };
    fetchGame1();
  }, [currentGamePlay]);
  return (
    <div className="nav-top game-container">
      <div className="left-header">
        <h1 onClick={() => {redirectUrl(dataGame?.url_link_logo)}} className="logo-header">
          <img src={dataGame?.logo_header} alt={dataGame?.custom_tag_title} />
        </h1>
        <div className="title-header">{dataGame?.custom_tag_title}</div>
      </div>
    </div>
  );
};

export default Header;
