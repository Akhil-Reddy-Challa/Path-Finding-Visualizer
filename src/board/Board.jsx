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
    if (this.areEqual(startFlag, node)) return;
    else if (this.areEqual(finishFlag, node)) return;
    let p_x = node[0]; //position_x
    let p_y = node[1]; //position_y
    console.log("im clicked", node);
    this.setState({ mouseButtonPressed: true });
    if (grid_array[p_x][p_y] === 1) {
      //Already Colored
      this.removeWall(node);
    } else if (grid_array[p_x][p_y] === 0) {
      this.createWall(node);
    }
  };
  mouseBtnReleased = () => {
    this.setState({ mouseButtonPressed: false });
  };
  mouseHover = (node) => {
    //console.log("hoveringgg");
    if (!this.state.mouseButtonPressed) return;
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      this.removeWall(node);
    } else if (grid_array[node[0]][node[1]] === 0) {
      this.createWall(node);
    }
  };
  createWall = (coordinates) => {
    let elementPosition = document.getElementById(coordinates);
    elementPosition.setAttribute("class", "wallBox");
    grid_array[coordinates[0]][coordinates[1]] = 1;
  };
  removeWall = (coordinates) => {
    document.getElementById(coordinates).removeAttribute("class"); //Makes Blockback to normal
    grid_array[coordinates[0]][coordinates[1]] = 0; //Sets the value to default 0
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
    var path = pathFinder(grid_array, startFlag, finishFlag);
    //console.log(path);
    var timer = 1;
    for (let node of path) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      setTimeout(() => this.createWall([i, j]), timer++ * 5);
    }
  };
  areEqual = (arr1, arr2) => {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  };
  componentDidMount() {
    console.log("Component mounted,deploying start & end Flags");
    this.createNewStartFlag("startFlag", startFlag);
    this.createNewFinishFlag("finishFlag", finishFlag);
  }
  createNewStartFlag = (className, position) => {
    const div = document.createElement("div");
    div.className = "material-icons " + className;
    div.innerHTML = "place"; //This will give us location_marker Icon
    div.setAttribute("draggable", "true"); //So it can be dragged along
    div.id = className; //This should be done, it will assist us during deleting Flag
    document.getElementById(position).appendChild(div);
    grid_array[startFlag[0]][startFlag[1]] = 2; //Useful to identify during traversal
  };
  createNewFinishFlag = (className, position) => {
    const div = document.createElement("div");
    div.className = "material-icons " + className;
    div.innerHTML = "place"; //This will give us location_marker Icon
    div.id = className;
    div.setAttribute("draggable", "true"); //So it can be dragged along
    document.getElementById(position).appendChild(div);
    grid_array[finishFlag[0]][finishFlag[1]] = 3; //Useful to identify during traversal
  };
  onDragStart = (ev, element) => {
    //console.log("drag Started for", element);
    if (!this.areEqual(element, startFlag)) startFlagDragged = false;
  };
  onDragOver = (ev, m) => {
    ev.preventDefault();
  };
  onDrop = (ev, droppingPlace) => {
    //console.log("dropping Place", droppingPlace);
    //Check if the dropping place is start or finish node place
    //If yes, then do-nothing
    if (
      this.areEqual(droppingPlace, startFlag) ||
      this.areEqual(droppingPlace, finishFlag)
    )
      return;
    //Now we got new co-ordinates for start or end flag
    //Firstly delete the old flag
    if (startFlagDragged) {
      this.deleteOldFlag("startFlag", droppingPlace);
      this.createNewStartFlag("startFlag", droppingPlace);
    } else {
      this.deleteOldFlag("finishFlag", droppingPlace);
      this.createNewFinishFlag("finishFlag", droppingPlace);
    }
    console.log("new_s,new_f", startFlag, finishFlag);
    startFlagDragged = true;
  };
  deleteOldFlag = (typeOfFlag, new_position) => {
    document.getElementById(typeOfFlag).remove(); //Deletes the flag
    if (typeOfFlag === "startFlag") {
      //Firstly make the old start_flag's grid_value==0
      grid_array[startFlag[0]][startFlag[1]] = 0;
      //Make the draggable attribute to false
      //Now assign the new_position to startFlag
      startFlag = new_position;
    } else {
      grid_array[finishFlag[0]][finishFlag[1]] = 0;
      finishFlag = new_position;
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
                      onDragStart={(e) =>
                        this.onDragStart(e, [row_number, col_number])
                      }
                      onDragOver={(e) => this.onDragOver(e)}
                      onDrop={(e) => {
                        this.onDrop(e, [row_number, col_number]);
                      }}
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
let startFlag = [2, 5];
let finishFlag = [1, 20];
const grid_array = createBoard();
const rows_count = grid_array.length; //Number of rows
const columns_count = grid_array[0].length; //Number of columns
let startFlagDragged = true;
