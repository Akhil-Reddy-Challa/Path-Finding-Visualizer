import React, { Component } from "react";
import { createBoard } from "../algorithms/getDimensions.js";
import { Algorithms } from "../algorithms/traversalAlgorithms/algorithmCaller";
import { MazeGenerator } from "../algorithms/mazeGenerators/algorithmCaller";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      mouseButtonPressed: false,
    };
  }
  areEqual = (arr1, arr2) => {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  };
  clearTheBoard = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        this.removeWall([i, j]);
      }
    }
    //At some point removeWall will change the flags grid_value to 0, so change them accordingly
    grid_array[startFlag[0]][startFlag[1]] = 2;
    grid_array[finishFlag[0]][finishFlag[1]] = 3;
  };
  clearThePath = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        if (grid_array[i][j] !== 1)
          document.getElementById([i, j]).removeAttribute("class"); //Only removes the path covered by our traversal algorithms
      }
    }
  };
  createWall = (coordinates) => {
    let elementPosition = document.getElementById(coordinates);
    elementPosition.setAttribute("class", "wallBox");
    grid_array[coordinates[0]][coordinates[1]] = 1;
  };
  removeWall = (coordinates) => {
    /* This method will not disturb the flags because they have nested DIV classes
    Example: WALL = <td id="16,33" class="wallBox"></td>
    Flag = <td id="16,34"><div class="material-icons startFlag" draggable="true" id="startFlag">place</div></td>
    Below removeAttribute method only deletes the given element's class, not nested div's class
    */
    document.getElementById(coordinates).removeAttribute("class"); //Makes the node blank by deleting the class assigned
    //Above works for all i.e(Wall,path_travelled by algorithm,shortest_path by algos)

    grid_array[coordinates[0]][coordinates[1]] = 0; //Sets the value to default 0
    //Caveat : Above statement(grid_arr[i][j]=0) at some point makes our start_flag and end_flag zero's
    //Hence we handle this in clearTheBoard method ending
  };
  createFlag = (flagType) => {
    //flagType = Tells us the type of Flag to create
    //position = coordinates

    var div = document.createElement("div"); //Creates a new DIV html element
    div.className = "material-icons " + flagType;
    div.innerHTML = "place"; //This will give us location_marker Icon
    div.setAttribute("draggable", "true"); //This allows the Icon to be draggable
    div.id = flagType; //It will assist us during deletion of the Flag
    if (flagType === "startFlag") {
      document.getElementById(startFlag).appendChild(div);
      grid_array[startFlag[0]][startFlag[1]] = 2; //Useful to identify during traversal
    } else {
      document.getElementById(finishFlag).appendChild(div);
      grid_array[finishFlag[0]][finishFlag[1]] = 3; //Useful to identify during traversal
    }
  };
  deleteFlag = (typeOfFlag, new_position) => {
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
    //If our NEW dropping place is a WALL
    //In that case we need to destroy the Wall
    if (grid_array[new_position[0]][new_position[1]] === 1)
      this.removeWall(new_position);
  };
  drawMaze = (maze_type) => {
    //User selected a maze algorithm to draw
    //Before calling an algo, clear the board
    this.clearTheBoard();
    MazeGenerator(grid_array, startFlag, finishFlag, maze_type);
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
    if (user_selected_algorithm === -1) {
      var button = document.getElementById("visualizeButton");
      //Change the text on button
      button.textContent = "Pick an algorithm";
      //Add shake class to our button
      button.setAttribute("class", "btn visualizeButtonShake");
      //Now remove the class shake from the button
      setTimeout(() => {
        button.setAttribute("class", "btn");
      }, 500);
      return; //Stops this method
    }
    //Now we have to call our Algorithms
    //Before calling our algo clear the path travelled by any of our algorithm
    //Ex: If DFS was visualized first, and then BFS was clicked then the path would mess-up, hence clear the board
    this.clearThePath();
    let { path, shortest_path_to_Target } = Algorithms(
      grid_array,
      startFlag,
      finishFlag,
      user_selected_algorithm /*Responsible for calling the correct algorithm */
    );
    if (user_selected_algorithm !== 3)
      this.drawGraph(path, shortest_path_to_Target);
    //Astar algo takes care of drawing the board
  };
  drawGraph = (p, sp) => {
    // p == path
    // sp == shortest_path_to_target
    var timer = 1;
    //This will draw the path/depth covered by our Algo
    for (let cnt = 0; cnt < p.length; cnt++) {
      let node = p[cnt];
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
    for (let k = 0; k < sp.length; k++) {
      let node = sp[k];
      let i = Math.floor((node - 1) / columns_count);
      let j = node - (i * columns_count + 1);
      setTimeout(
        () =>
          document
            .getElementById([i, j])
            .setAttribute("class", "drawTheShortestPath"),
        timer++ * 15
      );
    }
  };
  onDragStart = (ev, element) => {
    console.log("drag Started for", element);
    if (!this.areEqual(element, startFlag)) startFlagDragged = false;
  };
  onDragOver = (ev) => {
    //console.log("dragging over");
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
      this.deleteFlag("startFlag", droppingPlace);
      startFlag = droppingPlace;
      this.createFlag("startFlag");
    } else {
      this.deleteFlag("finishFlag", droppingPlace);
      finishFlag = droppingPlace;
      this.createFlag("finishFlag");
    }
    //console.log("new_s,new_f", startFlag, finishFlag);
    startFlagDragged = true;
  };
  mouseButtonClicked = (node) => {
    if (this.areEqual(startFlag, node) || this.areEqual(finishFlag, node))
      return; //User should not deploy wall on the flags
    let p_x = node[0]; //position_x
    let p_y = node[1]; //position_y
    //console.log("im clicked", node);
    this.setState({ mouseButtonPressed: true });
    if (grid_array[p_x][p_y] === 1) {
      //Already Colored
      this.removeWall(node);
    } else this.createWall(node);
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
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="/#">
                  Mazes! <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/#" onClick={() => this.drawMaze(0)}>
                      Random Wall Maze
                    </a>
                  </li>
                  <li>
                    <a href="/#" onClick={() => this.drawMaze(1)}>
                      Recursive Division
                    </a>
                  </li>
                </ul>
              </li>
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
                      A-Star
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
  componentDidMount() {
    startFlag = [Math.floor(rows_count / 2), Math.floor(columns_count / 2)];
    finishFlag = [rows_count - 1, columns_count - 1];
    //Component mounted,deploying start & end Flags
    this.createFlag("startFlag");
    this.createFlag("finishFlag");
  }
}
export default Board;

const { grid_array, rows_count, columns_count } = createBoard();
let startFlag;
let finishFlag;
let startFlagDragged = true;
let user_selected_algorithm = -1;
