import React, { Component } from "react";
import "./cssFiles/css_for_board.css";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      mouseButtonPressed: false,
    };
  }
  clearAll = () => {
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        let table_data = document.getElementById([i, j]);
        table_data.setAttribute("class", "box");
      }
    }
  };
  mouseButtonClicked = (node) => {
    this.setState({ mouseButtonPressed: true });
    let table_data = document.getElementById(node);
    if (grid_array[node[0]][node[1]] === 1) {
      //Already Colored
      grid_array[node[0]][node[1]] = 0; //De-color it
      table_data.setAttribute("class", "box");
    } else {
      table_data.setAttribute("class", "colorfulBox");
      grid_array[node[0]][node[1]] = 1;
    }
  };
  mouseBtnReleased = () => {
    this.setState({ mouseButtonPressed: false });
  };
  changeColorOfNode = (node) => {
    if (this.state.mouseButtonPressed) {
      let table_data = document.getElementById(node);
      table_data.setAttribute("class", "colorfulBox");
      grid_array[node[0]][node[1]] = 1;
    }
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  //Usage: await this.sleep(timeToPause);
  traverseBoardFromLeftToRight = async () => {
    //Clear Board once
    this.clearAll();
    var j = 0;
    for (var i = 0; i < rows_count; i++) {
      if (i % 2 === 0) {
        for (j = 0; j < columns_count; j++) {
          //console.log("color node(i,j)", i, j);
          let table_data = document.getElementById([i, j]);
          table_data.setAttribute("class", "colorfulBox");
          await this.sleep(5);
        }
      } else {
        for (j = columns_count - 1; j >= 0; j--) {
          //console.log("color node(i,j)", i, j);
          let table_data = document.getElementById([i, j]);
          table_data.setAttribute("class", "colorfulBox");
          await this.sleep(5);
        }
      }
    }
    //After Coloring, await for 2.5 seconds and clear the Board
    await this.sleep(2500);
    this.clearAll();
  };
  traverseBoardFromTopToBottom = async () => {
    //Clear Board once
    this.clearAll();
    var j = 0;
    for (var i = 0; i < columns_count; i++) {
      if (i % 2 === 0) {
        for (j = 0; j < rows_count; j++) {
          //console.log("color node(i,j)", i, j);
          let table_data = document.getElementById([j, i]);
          table_data.setAttribute("class", "colorfulBox");
          await this.sleep(1);
        }
      } else {
        for (j = rows_count - 1; j >= 0; j--) {
          //console.log("color node(i,j)", i, j);
          let table_data = document.getElementById([j, i]);
          table_data.setAttribute("class", "colorfulBox");
          await this.sleep(1);
        }
      }
    }
    //After Coloring, await for 2.5 seconds and clear the Board
    await this.sleep(2500);
    this.clearAll();
  };
  render() {
    return (
      <div>
        <div className="header_box">
          <p>Path-Finding Visualizer</p>
          <button onClick={() => this.clearAll()}>Clear-Board!</button>
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
                      className="box"
                      id={[row_number, col_number]}
                      key={col_number}
                      onMouseDown={() =>
                        this.mouseButtonClicked([row_number, col_number])
                      }
                      onMouseUp={() =>
                        this.mouseBtnReleased([row_number, col_number])
                      }
                      onMouseEnter={() =>
                        this.changeColorOfNode([row_number, col_number])
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
const screen_width = window.innerWidth;
const screen_height = window.innerHeight;
const new_s_w = screen_width - 20; //Subtract 2px from right & 2px from left
const new_s_h = screen_height - 120; //Preserve 100px from top for Logo, 2px from bottom
const grid_array = [];
const divide_by = 24; //Box occupies 18px+1px(border)+1px(padding)+gap b/w rows,cols
const rows_count = Math.floor(new_s_h / divide_by); //Number of rows
const columns_count = Math.floor(new_s_w / divide_by); //Number of columns
for (let i = 0; i < rows_count; i++)
  grid_array.push(new Array(columns_count).fill(0));
