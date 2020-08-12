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
    //console.log("here", document.getElementById("0"));
    for (let i = 0; i < rows_count; i++) {
      for (let j = 0; j < columns_count; j++) {
        let node = i.toString() + "," + j.toString();
        //console.log(node);
        let table_data = document.getElementById(node);
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
  render() {
    return (
      <div>
        <div className="header_box">
          <p>Path-Finding Visualizer</p>
          <button className="cta" onClick={() => this.clearAll()}>
            Clear-Board!
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
