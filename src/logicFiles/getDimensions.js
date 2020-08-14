export function createBoard() {
  return calculateDimensionsForBoard();
}
function calculateDimensionsForBoard() {
  const screen_width = window.innerWidth;
  const screen_height = window.innerHeight;
  const new_s_w = screen_width - 20; //Subtract 2px from right & 2px from left
  const new_s_h = screen_height - 120; //Preserve 100px from top for Logo, 2px from bottom
  const divide_by = 26; //Box occupies 18px+1px(border)+1px(padding)+gap b/w rows,cols
  const rows_count = Math.floor(new_s_h / divide_by); //Number of rows
  const columns_count = Math.floor(new_s_w / divide_by); //Number of columns
  const grid_array = [];
  for (let i = 0; i < rows_count; i++)
    grid_array.push(new Array(columns_count).fill(0));
  return grid_array;
}
/*
This is used to calculate the board size, like number of rows and columns
*/
