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
          document.getElementById([i, j]).setAttribute("class", "normalBox");
          grid_array[i][j] = 0;
        }
      }
    }
  };
  mouseButtonClicked = (node) => {
    this.setState({ mouseButtonPressed: true });
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      grid_array[node[0]][node[1]] = 0; //De-color it
      document.getElementById(node).setAttribute("class", "normalBox");
    } else if (grid_array[node[0]][node[1]] === 0) {
      this.changeTheColorofNode(node);
    }
  };
  mouseBtnReleased = () => {
    this.setState({ mouseButtonPressed: false });
  };
  mouseHover = (node) => {
    if (this.state.mouseButtonPressed) {
      if (grid_array[node[0]][node[1]] === 1) {
        //Already Colored
        grid_array[node[0]][node[1]] = 0; //De-color it
        document.getElementById(node).setAttribute("class", "normalBox");
      } else if (grid_array[node[0]][node[1]] === 0) {
        this.changeTheColorofNode(node);
      }
    }
  };
  changeTheColorofNode = (coordinates) => {
    let elementPosition = document.getElementById(coordinates);
    elementPosition.setAttribute("class", "animateBox");
    grid_array[coordinates[0]][coordinates[1]] = 1;
  };
  traverseBoardFromLeftToRight = () => {
    //Clear Board once
    //this.clearTheBoard();
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
    //setTimeout(() => this.clearTheBoard(), timer * 10);
  };
  traverseBoardFromTopToBottom = () => {
    //Clear Board once
    //this.clearTheBoard();
    var timer = 1;
    for (let i = 0; i < columns_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < rows_count; j++) {
          setTimeout(() => this.changeTheColorofNode([j, i]), timer++ * 10);
        }
      } else {
        for (let j = rows_count - 1; j >= 0; j--) {
          setTimeout(() => this.changeTheColorofNode([j, i]), timer++ * 10);
        }
      }
    }
    //After the traversal, clear the board
    //As the above loops executes quickly, we should use settimeout for below statement
    //setTimeout(() => this.clearTheBoard(), timer * 15);
  };
  DFSTraversal = () => {
    var path = pathFinder(grid_array, startFlag, endFlag);
    //console.log(path);
    var timer = 1;
    for (let node of path) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      setTimeout(() => this.changeTheColorofNode([i, j]), timer++ * 35);
    }
  };
  componentDidMount() {
    //Create a startFlag(<i></i>)
    var startFlag = document.createElement("i");
    startFlag.innerHTML = "place";
    startFlag.setAttribute("draggable", "true");
    //Now add styles to make that as flag
    startFlag.setAttribute("class", "material-icons startFlag");
    document.getElementById([0, 0]).appendChild(startFlag);
    grid_array[0][0] = 2;
    //Now create end flag
    var endFlag = document.createElement("i");
    endFlag.innerHTML = "place";
    endFlag.setAttribute("draggable", "true");
    //Now add styles to make that as flag
    endFlag.setAttribute("class", "material-icons targetFlag");
    document.getElementById([4, 15]).appendChild(endFlag);
    grid_array[4][15] = 3;
  }
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
                      onDrop={() => this.drop}
                      onDragOver={() => this.allowDrop}
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
var startFlag = [0, 0];
var endFlag = [4, 15];

// https://www.w3schools.com/icons/icons_reference.asp
// https://www.w3schools.com/html/html5_draganddrop.asp
//https://medium.com/unlearninglabs/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a
