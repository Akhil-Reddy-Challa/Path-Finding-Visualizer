export function RecursiveDivision(grid_arr, startFlag, finishFlag) {
  let width = grid_arr[0].length;
  let height = grid_arr.length;
  let new_grid = main(width, height);
  drawTheNewMaze(new_grid, grid_arr, width, height, startFlag, finishFlag);

  return;
}
let all_directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function main(width, height) {
  width = Math.floor(width / 2) * 2 + 1;
  height = Math.floor(height / 2) * 2 + 1;
  let cells = [];
  for (let i = 0; i < height; i++) cells.push(new Array(width).fill(1));
  create_maze(0, 0, cells, width, height);
  return cells;
}
function create_maze(start_x, start_y, cells, w, h) {
  // console.log("\nstart is:"+ start_x+ start_y)
  // set the current cell to a path, so that we don't return here later
  set_path(start_x, start_y, cells);
  // console.log("We have marked the above", x, y, "as path")
  // Shuffle the array all_directions and get a random direction
  shuffle(all_directions);
  // console.log("directions shuffled");
  // we keep trying the next direction in the list, until we have no directions left
  for (var new_direction of all_directions) {
    // get the new_coordinates
    // console.log("Picked direction:", new_direction)

    // calculate the new node's coordinates using our random direction.
    // we *2 as we are moving two cells in each direction to the next node
    var node_x = start_x + new_direction[0] * 2;
    var node_y = start_y + new_direction[1] * 2;

    // Check if the test node is a wall (eg it hasn't been visited)
    if (is_wall(node_x, node_y, w, h, cells) === 1) {
      // Success code: we have found a path
      // Set our linking cell (between the two nodes we're moving from/to) to a path
      var link_cell_x = start_x + new_direction[0];
      var link_cell_y = start_y + new_direction[1];
      set_path(link_cell_x, link_cell_y, cells);
      // console.log("set the path of new_x,new_y", link_cell_x, link_cell_y)
      // "move" to our new node. remember we are calling the function every
      // time we move, so we call it again but with the updated x and y coordinates
      // console.log("calling create_maze(", node_x, node_y, ")")
      create_maze(node_x, node_y, cells, w, h);
    }
  }
  return;
}
function is_wall(x, y, width, height, cells) {
  // Checks if the coordinates are within the maze grid
  if (x >= 0 && x < width && y >= 0 && y < height)
    // If they are, then we can check if the cell is a wall
    return cells[y][x];
  // If the coordinates are not within the maze bounds, we don't want to go there
  else return 0;
}
function set_path(start_x, start_y, cells) {
  cells[start_y][start_x] = 0;
}
function shuffle(array) {
  //Javascript has no in-built shuffle algorithm
  //Hence
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
function drawTheNewMaze(new_grid, grid_arr, w, h, sf, ff) {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (new_grid[i][j] === 1) {
        //Then it is a wall
        //So deploy a wall
        document
          .getElementById([i, j])
          .setAttribute("class", "wallBoxNoAnimation");
        //Now change our original grid_arr value, so that our algorithms can pick up the changes
        grid_arr[i][j] = 1;
      }
    }
  }
  //Now all the walls are set
  //But our startFlag, end Flags might be marked as walls, so undo that
  document.getElementById(sf).removeAttribute("class");
  grid_arr[sf[0]][sf[1]] = 2;
  document.getElementById(ff).removeAttribute("class");
  grid_arr[ff[0]][ff[1]] = 3;
}
