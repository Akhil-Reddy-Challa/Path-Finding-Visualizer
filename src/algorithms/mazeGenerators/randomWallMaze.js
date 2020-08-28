export function randomWallMaze(grid_arr, startFlag, finishFlag) {
  let rows_count = grid_arr.length;
  let columns_count = grid_arr[0].length;
  let total = rows_count * columns_count; //total_nodes_on_board
  //Let's only select 1/3rd of the nodes
  let number_of_walls_to_draw = Math.floor(total / 3);
  for (let i = 0; i < number_of_walls_to_draw; i++) {
    //Below would generate a random in range(1,number_of_wall_to_draw)
    let node = Math.floor(Math.random() * total + 1);
    //extracts number to index_x
    let i = Math.floor((node - 1) / columns_count);
    //extracts number to index_y
    let j = node - (i * columns_count + 1);
    //Creates wall
    createWall(grid_arr, [i, j]);
  }
  //Since the above is completely random
  //There is a chance for start & end flags being marked as walls
  //So the below statements would remove wall if it was done
  document.getElementById(startFlag).removeAttribute("class");
  grid_arr[startFlag[0]][startFlag[1]] = 2;
  document.getElementById(finishFlag).removeAttribute("class");
  grid_arr[finishFlag[0]][finishFlag[1]] = 3;
  return;
}
//Below method is exact replica from Board.jsx file
function createWall(grid_arr, coordinates) {
  let elementPosition = document.getElementById(coordinates);
  elementPosition.setAttribute("class", "wallBoxNoAnimation");
  grid_arr[coordinates[0]][coordinates[1]] = 1;
}
