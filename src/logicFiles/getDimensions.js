export function createBoard() {
  return calculateDimensionsForBoard();
}
function calculateDimensionsForBoard() {
  const screen_width = window.innerWidth;
  const screen_height = window.innerHeight;
  const new_s_w = screen_width - 4; //Subtract 2px from left and right 2px for container
  const new_s_h = screen_height - 102; //Preserve 100px from top for Logo, 2px from bottom
  const divide_by = 30; //Box occupies 26px+4px(All-borders)
  const rows_count = Math.floor(new_s_h / divide_by); //Number of rows
  const columns_count = Math.floor(new_s_w / divide_by); //Number of columns
  const grid_array = [];
  for (let i = 0; i < rows_count; i++)
    grid_array.push(new Array(columns_count).fill(0));
  return { grid_array, rows_count, columns_count };
}
/*
This is used to calculate the board size, like number of rows and columns
*/
