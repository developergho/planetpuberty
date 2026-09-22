import React from 'react';
import classNames from 'classnames';
import warning from '../assets/images/warning.png'

const Mobile = (props) => {
  const { pageActive, currentPage } = props;

  return (
    <div className={
      classNames("game-container fullscreen bg-game-mobile fullscreen-not-scroll pb-0 hidden-layout", {
        'active-layout': currentPage === pageActive,
    })}>
      <div className="block-mobile">
        <img src={warning} alt="icon warning" />
        <span className="title-block title-warning">Hello there!</span>
        <p className="content-warning">Play our interactive games on a tablet device or on a desktop computer. See you soon!</p>
      </div>
    </div>
  );
};

export default Mobile;