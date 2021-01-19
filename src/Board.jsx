import React, { Component } from "react";
import { createBoard } from "./algorithms/getDimensions.js";
import { Algorithms } from "./algorithms/traversalAlgorithms/algorithmCaller";
import { MazeGenerator } from "./algorithms/mazeGenerators/algorithmCaller";
import NavBar from "./components/NavBar";

class Board extends Component {
  areEqual = (arr1, arr2) => {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  };
  clearTheBoard = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        this.removeWall([i, j]);
      }
    }
    //At some point method(removeWall) will modify the start and end flags grid_value to 0, so set them back to normal
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
  };
  createFlag = (flagType) => {
    //flagType = Tells us the type of Flag to create

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
  deleteFlag = (flagType, new_position) => {
    document.getElementById(flagType).remove(); //Deletes the flag
    if (flagType === "startFlag") {
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
     * -1 == None selected(Shakes the button when user clicks the visualize btn)
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
    //At this point user selected an algo
    //1) Make the navbar un-clickable
    document.getElementById("navbar").style.pointerEvents = "none";

    //2) Before calling our algo clear the path travelled by any of our algorithm
    //Ex: If DFS was visualized first, and then BFS was clicked then the path would mess-up, hence clear the board
    this.clearThePath();
    let { path, shortest_path_to_Target } = Algorithms(
      grid_array,
      startFlag,
      finishFlag,
      user_selected_algorithm /*Responsible for calling the correct algorithm */
    );
    if (user_selected_algorithm !== 3)
      //Astar algo takes care of drawing the board
      this.paintTheBoard(path, shortest_path_to_Target);
  };
  paintTheBoard = (path, shortestPath) => {
    var timer = 1;
    //This will draw the path/depth covered by our Algo
    for (let cnt = 0; cnt < path.length; cnt++) {
      let node = path[cnt];
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
    for (let k = 0; k < shortestPath.length; k++) {
      let node = shortestPath[k];
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
    //ENDS
    //In the method(starVisz) we make the navbar unclickable, so change it back to auto
    setTimeout(() => {
      document.getElementById("navbar").style.pointerEvents = "auto";
    }, timer * 15);
  };
  onDragStart = (ev, element) => {
    //console.log("drag Started for", element);
    if (!this.areEqual(element, startFlag)) startFlagDragged = false;
  };
  onDragOver = (ev) => {
    //console.log("dragging over");
    ev.preventDefault(); //If not prevented, it will mess the flag creation process
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
  mouseButtonClicked = (coordinates) => {
    if (
      this.areEqual(startFlag, coordinates) ||
      this.areEqual(finishFlag, coordinates)
    )
      return; //User should not deploy wall on the flags

    mouseButtonPressed = true;
    if (grid_array[coordinates[0]][coordinates[1]] === 1) {
      //Already Colored
      this.removeWall(coordinates);
    } else this.createWall(coordinates);
  };
  mouseBtnReleased = () => {
    mouseButtonPressed = false;
  };
  mouseHover = (node) => {
    //console.log("hoveringgg");
    if (!mouseButtonPressed) return;
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      this.removeWall(node);
    } else if (grid_array[node[0]][node[1]] === 0) {
      this.createWall(node);
    } //We intentionally perform operations if grid_arr== 0 or 1 , because grid_arr = 2,3 are start,end flags, we dont want wall on them
  };
  render() {
    return (
      <div>
        <NavBar
          onClearBoard={this.clearTheBoard}
          onClearPath={this.clearThePath}
          onDrawMaze={this.drawMaze}
          onStartVisualize={this.startVisualization}
          onSelectAlgo={this.selectAlgorithm}
        />
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
    //Component mounted,deploy start & end Flags
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
let mouseButtonPressed = false;
