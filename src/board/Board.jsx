import React, { Component } from "react";
import "./cssFiles/css_for_board.css";

class Board extends Component {
  buttonClick = () => {
    //console.log("here", document.getElementById("0"));
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < 1; j++) {
        console.log("i,j: ", i, j);
        console.log(document.getElementById(i, j));
      }
    }
  };
  render() {
    return (
      <div>
        <div className="header_box">
          <p>Path-Finding Visualizer</p>
          <button className="cta" onClick={() => this.buttonClick()}>
            Color-All!
          </button>
        </div>
        <div className="container">
          <table>
            <tbody>
              {array.map((row, row_number) => (
                <tr id={row_number} key={row_number}>
                  {row.map((col, col_number) => (
                    <td
                      className="box"
                      id={[row_number, col_number]}
                      key={col_number}
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
const array = [];
const divide_by = 24; //Box occupies 18px+1px(border)+1px(padding)+gap b/w rows,cols
const rows_count = Math.floor(new_s_h / divide_by); //Number of rows
const columns_count = Math.floor(new_s_w / divide_by); //Number of columns
console.log("r_c, c_c: " + rows_count + " " + columns_count);
for (let i = 0; i < rows_count; i++)
  array.push(new Array(columns_count).fill(0));
