import React from "react";
import ReactDOM from "react-dom";
import "./cssFiles/bootstrap.min.css";
import "./cssFiles/css_for_board.css";
import Board from "./Board";

ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById("root")
);
