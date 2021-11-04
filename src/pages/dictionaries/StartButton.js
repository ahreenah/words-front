import React from "react";
import Play from '../../assets/images/play.svg';

export const StartButton = ({ onClick }) => <div style={{ width: 20, marginLeft: 10, marginRight: 10 }}>
    <img src={Play} alt="Train now" onClick={onClick} />


</div>;
