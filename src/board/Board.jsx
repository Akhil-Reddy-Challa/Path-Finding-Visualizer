import React, { Component } from "react";
import "./cssFiles/css_for_board.css";
import { createBoard } from "../logicFiles/getDimensions.js";
import { pathFinder } from "../logicFiles/buildGraph";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      mouseButtonPressed: false,
    };
  }
  clearTheBoard = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        if (grid_array[i][j] === 1) {
          this.removeWall([i, j]);
        }
      }
    }
  };
  mouseButtonClicked = (node) => {
    this.setState({ mouseButtonPressed: true });
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      this.removeWall(node);
    } else if (grid_array[node[0]][node[1]] === 0) {
      this.createWall(node);
    }
  };
  mouseBtnReleased = () => {
    this.setState({ mouseButtonPressed: false });
  };
  mouseHover = (node) => {
    if (this.state.mouseButtonPressed) {
      if (grid_array[node[0]][node[1]] === 1) {
        //Already Colored
        this.removeWall(node);
      } else if (grid_array[node[0]][node[1]] === 0) {
        this.createWall(node);
      }
    }
  };
  createWall = (coordinates) => {
    let elementPosition = document.getElementById(coordinates);
    elementPosition.setAttribute("class", "wallBox");
    grid_array[coordinates[0]][coordinates[1]] = 1;
  };
  removeWall = (coordinates) => {
    document.getElementById(coordinates).removeAttribute("class");
    grid_array[coordinates[0]][coordinates[1]] = 0;
  };
  traverseBoardFromLeftToRight = () => {
    var timer = 1;
    for (let i = 0; i < rows_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < columns_count; j++) {
          setTimeout(() => this.createWall([i, j]), timer++ * 5);
        }
      } else {
        for (let j = columns_count - 1; j >= 0; j--) {
          setTimeout(() => this.createWall([i, j]), timer++ * 5);
        }
      }
    }
  };
  traverseBoardFromTopToBottom = () => {
    var timer = 1;
    for (let i = 0; i < columns_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < rows_count; j++) {
          setTimeout(() => this.createWall([j, i]), timer++ * 10);
        }
      } else {
        for (let j = rows_count - 1; j >= 0; j--) {
          setTimeout(() => this.createWall([j, i]), timer++ * 10);
        }
      }
    }
  };
  DFSTraversal = () => {
    var path = pathFinder(grid_array, startFlag, endFlag);
    //console.log(path);
    var timer = 1;
    for (let node of path) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      setTimeout(() => this.createWall([i, j]), timer++ * 35);
    }
  };
  render() {
    return (
      <div>
        <div className="header_box">
          <p>Path-Finding Visualizer</p>
          <button onClick={() => this.clearTheBoard()}>Clear-Board!</button>
          <button onClick={() => this.traverseBoardFromLeftToRight()}>
            Traverse Board(L->R)!
          </button>
          <button onClick={() => this.traverseBoardFromTopToBottom()}>
            Traverse Board(T->D)!
          </button>
          <button onClick={() => this.DFSTraversal()}>DFS</button>
        </div>
        <div className="container">
          <table>
            <tbody>
              {grid_array.map((row, row_number) => (
                <tr id={row_number} key={row_number}>
                  {row.map((col, col_number) => (
                    <td
                      id={[row_number, col_number]}
                      key={col_number}
                      onMouseDown={() =>
                        this.mouseButtonClicked([row_number, col_number])
                      }
                      onMouseUp={() =>
                        this.mouseBtnReleased([row_number, col_number])
                      }
                      onMouseEnter={() =>
                        this.mouseHover([row_number, col_number])
                      }
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Board;
const grid_array = createBoard();
const rows_count = grid_array.length; //Number of rows
const columns_count = grid_array[0].length; //Number of columns
let startFlag = [0, 0];
let endFlag = [4, 15];
let startFlaggedDragged = true;

// https://www.w3schools.com/icons/icons_reference.asp
// https://www.w3schools.com/html/html5_draganddrop.asp
//https://medium.com/unlearninglabs/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a
