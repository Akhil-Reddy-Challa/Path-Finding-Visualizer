import React, { Component } from "react";
import "./cssFiles/css_for_board.css";
import { createBoard } from "../logicFiles/getDimensions.js";
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
        let table_data = document.getElementById([i, j]);
        table_data.setAttribute("class", "normalBox");
      }
    }
  };
  mouseButtonClicked = (node) => {
    this.setState({ mouseButtonPressed: true });
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      grid_array[node[0]][node[1]] = 0; //De-color it
      document.getElementById(node).setAttribute("class", "normalBox");
    } else {
      this.changeTheColorofNode(node);
    }
  };
  mouseBtnReleased = () => {
    this.setState({ mouseButtonPressed: false });
  };
  mouseHover = (node) => {
    if (this.state.mouseButtonPressed) {
      this.changeTheColorofNode(node);
    }
  };
  changeTheColorofNode = (coordinates) => {
    let elementPosition = document.getElementById(coordinates);
    elementPosition.setAttribute("class", "animateBox");
    grid_array[coordinates[0]][coordinates[1]] = 1;
  };
  traverseBoardFromLeftToRight = () => {
    //Clear Board once
    this.clearTheBoard();
    var timer = 1;
    for (let i = 0; i < rows_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < columns_count; j++) {
          setTimeout(() => this.changeTheColorofNode([i, j]), timer++ * 5);
        }
      } else {
        for (let j = columns_count - 1; j >= 0; j--) {
          setTimeout(() => this.changeTheColorofNode([i, j]), timer++ * 5);
        }
      }
    }
    //After the traversal, clear the board
    //As the above loops executes quickly, we should use settimeout for below statement
    setTimeout(() => this.clearTheBoard(), timer * 10);
  };
  traverseBoardFromTopToBottom = () => {
    //Clear Board once
    this.clearTheBoard();
    var timer = 1;
    for (let i = 0; i < columns_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < rows_count; j++) {
          console.log("j,i", [j, i]);
          setTimeout(() => this.changeTheColorofNode([j, i]), timer++ * 5);
        }
      } else {
        for (let j = rows_count - 1; j >= 0; j--) {
          console.log("- j,i", [j, i]);
          setTimeout(() => this.changeTheColorofNode([j, i]), timer++ * 5);
        }
      }
    }
    //After the traversal, clear the board
    //As the above loops executes quickly, we should use settimeout for below statement
    setTimeout(() => this.clearTheBoard(), timer * 10);
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
        </div>
        <div className="container">
          <table>
            <tbody>
              {grid_array.map((row, row_number) => (
                <tr id={row_number} key={row_number}>
                  {row.map((col, col_number) => (
                    <td
                      className="normalBox"
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
