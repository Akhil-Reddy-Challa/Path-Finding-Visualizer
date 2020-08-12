import React, { Component } from "react";
import "./cssFiles/css_for_board.css";
function Board() {
  //My screen
  //Width= 1920 px
  //height = 979 px
  //alert("width, height: " + window.innerWidth + " " + window.innerHeight);

  const array = new Array(3034).fill(0);
  return (
    <div className="main-container">
      <div className="container">
        {array.map((num) => (
          <div className="item">{num}</div>
        ))}
      </div>
    </div>
  );
}

export default Board;
