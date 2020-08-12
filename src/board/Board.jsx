import React from "react";
import "./cssFiles/css_for_board.css";
function Board() {
  return (
    <div className="container">
      <table>
        <tbody>
          {array.map((row, row_number) => (
            <tr id={row_number}>
              {row.map((col, col_number) => (
                <td className="box" id={col_number}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
const screen_width = window.innerWidth;
const screen_height = window.innerHeight;
const new_s_w = screen_width - 4; //Subtract 2px from right & 2px from left
const new_s_h = screen_height - 102; //Preserve 100px from top for Logo, 2px from bottom
const array = [];
const divide_by = 24; //Box occupies 18px+1px(border)+1px(padding)+gap b/w rows,cols
const rows_count = Math.floor(new_s_h / divide_by); //Number of rows
const columns_count = Math.floor(new_s_w / divide_by); //Number of columns
console.log("r_c, c_c: " + rows_count + " " + columns_count);
for (let i = 0; i < rows_count; i++)
  array.push(new Array(columns_count).fill(0));
