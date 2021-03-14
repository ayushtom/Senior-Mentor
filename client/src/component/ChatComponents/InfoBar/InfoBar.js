import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ roomName }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img style = { {display:'inline-block'} } className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h2 style = { {display:'inline-block',  paddingBottom:'10%'} }>{roomName}</h2>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;