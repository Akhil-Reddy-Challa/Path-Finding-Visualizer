import React, { Component } from "react";
import "./cssFiles/bootstrap.min.css";
import "./cssFiles/css_for_board.css";
import { createBoard } from "../algorithms/getDimensions.js";
import { Algorithms } from "../algorithms/traversalAlgorithms/algorithmCaller";

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
  clearThePath = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        if (grid_array[i][j] !== 1)
          document.getElementById([i, j]).removeAttribute("class"); //Only removes the path covered by our traversal algorithms
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
  startVisualization = () => {
    //Responsible for calling the algorithms
    /**
     *
     * -1 == None selected(Shakes the button)
     * 0 == DFS
     * 1 == BFS
     * 2 == Dijkstra's
     * 3 == A*
     */
    var button = document.getElementById("visualizeButton");
    if (user_selected_algorithm === -1) {
      //Change the text on button
      button.textContent = "Pick an algorithm";
      //Add shake class to our button
      button.setAttribute("class", "btn visualizeButtonShake");
      //Now remove the class shake from the button
      setTimeout(() => {
        button.setAttribute("class", "btn");
      }, 500);
    } else if (user_selected_algorithm === 0) {
      this.BFSTraversal();
    } else if (user_selected_algorithm === 1) {
      this.DFSTraversal();
    } else if (user_selected_algorithm === 2) {
      this.DijkstrasTraversal();
    } else {
      console.log("Under development");
    }
  };
  selectAlgorithm = (algorithm) => {
    //Now user selected an algorithm
    //1) Update the visualize button's text
    /**
     *
     * -1 == None selected(Shakes the button)
     * 0 == DFS
     * 1 == BFS
     * 2 == Dijkstra's
     * 3 == A*
     */
    //-1 is not possible because, only algos in drop-down can call this method
    user_selected_algorithm = algorithm;
    //Now update the text of the button
    let button = document.getElementById("visualizeButton");
    if (algorithm === 0) button.textContent = "Visualize(BFS)";
    else if (algorithm === 1) button.textContent = "Visualize(DFS)";
    else if (algorithm === 2) button.textContent = "Visualize(Dijkstra's)";
    else button.textContent = "Visualize(A*)";
  };
  DFSTraversal = () => {
    //Before Traversing, clear the path travelled by any of our algorithm
    //Ex: If BFS was visualized first, and then DFS was clicked then the path would mess-up, hence clear the board
    this.clearThePath();
    let { path, shortest_path_to_Target } = Algorithms(
      grid_array,
      startFlag,
      finishFlag,
      0
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
    //Before Traversing, clear the path travelled by any of our algorithm
    //Ex: If DFS was visualized first, and then BFS was clicked then the path would mess-up, hence clear the board
    this.clearThePath();
    let { path, shortest_path_to_Target } = Algorithms(
      grid_array,
      startFlag,
      finishFlag,
      1
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
  DijkstrasTraversal = () => {
    //Before Traversing, clear the path travelled by any of our algorithm
    //Ex: If BFS was visualized first, and then Dijkstra was clicked then the path would mess-up, hence clear the path_on the board
    this.clearThePath();
    let { path, shortest_path_to_Target } = Algorithms(
      grid_array,
      startFlag,
      finishFlag,
      2
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
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a
                className="navbar-brand"
                onClick={() => window.location.reload()}
              >
                Path Finding Visualizer
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active">
                <a onClick={() => this.clearTheBoard()}>Clear-Board!</a>
              </li>
              <li className="active">
                <a onClick={() => this.clearThePath()}>Clear-Path!</a>
              </li>
              {/* <li className="active">
                <a
                  href="/#"
                  onClick={() => this.traverseBoardFromLeftToRight()}
                  className="buttons"
                >
                  Traverse Board(L->R)!
                </a>
              </li> */}
              {/* <li className="active">
                <a
                  href="/#"
                  onClick={() => this.traverseBoardFromTopToBottom()}
                  className="buttons"
                >
                  Traverse Board(T->D)!
                </a>
              </li> */}
              <li>
                <button
                  id="visualizeButton"
                  type="button"
                  className="btn"
                  onClick={() => this.startVisualization()}
                  refs="button"
                >
                  Visualize
                </button>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="/#">
                  Algorithms! <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/#" onClick={() => this.selectAlgorithm(0)}>
                      BFS
                    </a>
                  </li>
                  <li>
                    <a href="/#" onClick={() => this.selectAlgorithm(1)}>
                      DFS
                    </a>
                  </li>
                  <li>
                    <a href="/#" onClick={() => this.selectAlgorithm(2)}>
                      Dijkstra's
                    </a>
                  </li>
                  <li>
                    <a href="/#" onClick={() => this.selectAlgorithm(3)}>
                      A*(Developing)
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="graphContainer">
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
let startFlag = [0, 0];
let finishFlag = [3, 3];
const { grid_array, rows_count, columns_count } = createBoard();
let startFlagDragged = true;
let user_selected_algorithm = -1;
