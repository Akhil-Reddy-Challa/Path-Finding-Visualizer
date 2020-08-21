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
        this.removeWall([i, j]);
      }
    }
  };
  mouseButtonClicked = (node) => {
    if (this.areEqual(startFlag, node)) return;
    else if (this.areEqual(finishFlag, node)) return;
    let p_x = node[0]; //position_x
    let p_y = node[1]; //position_y
    //console.log("im clicked", node);
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
    document.getElementById(coordinates).removeAttribute("class"); //Makes the node blank by deleting the class assigned
    //Above works for all i.e(Wall,path_travelled by algorithm,shortest_path by algos)

    //Caveat : Below statement(grid_arr[i][j]=0) makes our start_flag and end_flag zero's
    //Hence adding conditional statement
    if (
      !this.areEqual(startFlag, coordinates) &&
      !this.areEqual(finishFlag, coordinates)
    )
      grid_array[coordinates[0]][coordinates[1]] = 0; //Sets the value to default 0
  };
  traverseBoardFromLeftToRight = () => {
    var timer = 1;
    for (let i = 0; i < rows_count; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < columns_count; j++) {
          if (
            !this.areEqual(startFlag, [i, j]) &&
            !this.areEqual(finishFlag, [i, j])
          )
            setTimeout(() => this.createWall([i, j]), timer++ * 5);
        }
      } else {
        for (let j = columns_count - 1; j >= 0; j--) {
          if (
            !this.areEqual(startFlag, [i, j]) &&
            !this.areEqual(finishFlag, [i, j])
          )
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
          if (
            !this.areEqual(startFlag, [j, i]) &&
            !this.areEqual(finishFlag, [j, i])
          )
            setTimeout(() => this.createWall([j, i]), timer++ * 10);
        }
      } else {
        for (let j = rows_count - 1; j >= 0; j--) {
          if (
            !this.areEqual(startFlag, [j, i]) &&
            !this.areEqual(finishFlag, [j, i])
          )
            setTimeout(() => this.createWall([j, i]), timer++ * 10);
        }
      }
    }
  };
  DFSTraversal = () => {
    let { path, shortest_path_to_Target } = pathFinder(
      grid_array,
      startFlag,
      finishFlag,
      "dfs"
    );
    //console.log("DFS Returned path: ", path);
    var timer = 1;
    //This will draw the path/depth covered by our DFS
    for (let node of path) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      if (!this.areEqual(finishFlag, node))
        setTimeout(
          () =>
            document
              .getElementById([i, j])
              .setAttribute("class", "drawDistanceTravelled"),
          timer++ * 10
        );
    }
    //DFS does not gurantee/cannot_find a shortest_path
    //Hence the shortest path traversal would be the same
    for (let node of shortest_path_to_Target) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      if (!this.areEqual(finishFlag, node))
        setTimeout(
          () =>
            document
              .getElementById([i, j])
              .setAttribute("class", "drawTheShortestPath"),
          timer++ * 15
        );
    }
  };
  BFSTraversal = () => {
    let { path, shortest_path_to_Target } = pathFinder(
      grid_array,
      startFlag,
      finishFlag,
      "bfs"
    );
    var timer = 1;
    //This will draw the path/depth covered by our BFS
    for (let node of path) {
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      if (!this.areEqual(finishFlag, node))
        setTimeout(
          () =>
            document
              .getElementById([i, j])
              .setAttribute("class", "drawDistanceTravelled"),
          timer++ * 10
        );
    }
    //This will draw the shortest_path if it exists.
    for (let k = shortest_path_to_Target.length - 1; k > -1; k--) {
      let node = shortest_path_to_Target[k];
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      setTimeout(
        () =>
          document
            .getElementById([i, j])
            .setAttribute("class", "drawTheShortestPath"),
        timer++ * 13
      );
    }
  };
  areEqual = (arr1, arr2) => {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  };
  componentDidMount() {
    //console.log("Component mounted,deploying start & end Flags");
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
    //Check if the dropping place is start or finish node place
    //If yes, then do-nothing
    if (
      this.areEqual(droppingPlace, startFlag) ||
      this.areEqual(droppingPlace, finishFlag)
    )
      return;
    //Else, we got new co-ordinates for start or end flag
    //Firstly delete the old flag
    //Then create new Flag
    //console.log("dropping_place", droppingPlace);
    if (startFlagDragged) {
      this.deleteOldFlag("startFlag", droppingPlace);
      this.createNewStartFlag("startFlag", droppingPlace);
    } else {
      this.deleteOldFlag("finishFlag", droppingPlace);
      this.createNewFinishFlag("finishFlag", droppingPlace);
    }
    //console.log("new_s,new_f", startFlag, finishFlag);
    startFlagDragged = true;
  };
  deleteOldFlag = (typeOfFlag, new_position) => {
    document.getElementById(typeOfFlag).remove(); //Deletes the flag
    if (typeOfFlag === "startFlag") {
      //Firstly make the old start_flag's grid_value==0
      grid_array[startFlag[0]][startFlag[1]] = 0;
      //Now assign the new_position to startFlag
      startFlag = new_position;
    } else {
      grid_array[finishFlag[0]][finishFlag[1]] = 0;
      finishFlag = new_position;
    }
    /*All set till now, but their is a caveat: */
    //If our NEW dropping place is a Wall already
    //For this case we need to destry the Wall
    if (grid_array[new_position[0]][new_position[1]] === 1)
      this.removeWall(new_position);
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
          <button onClick={() => this.BFSTraversal()}>BFS</button>
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
let startFlag = [12, 12];
let finishFlag = [2, 24];
const { grid_array, rows_count, columns_count } = createBoard();
let startFlagDragged = true;
