import { shareWidthandHeight } from "./getDimensions.js";
export function helper() {
  main();
}
var adjacency_list = new Map();
function main() {
  let grid = shareWidthandHeight();
  let row = grid.length; //Number of rows
  let column = grid[0].length; //Number of columns
  generateAdjacencyList(grid, row, column);
  console.log(adjacency_list);
}
const directions = [
  [0, 1], //left
  [1, 0], //down
  [0, -1], //left
  [-1, 0], //Top
];
function generateAdjacencyList(grid, r, c) {
  console.log("Initial grid", grid);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] === 1)
        //Check all four sides for a path
        getNeighbours(grid, i, j, r, c);
    }
  }
  //console.log("a_list: ");
}
function getNeighbours(grid, i, j, r, c) {
  //console.log("Node: (i,j)", i, j);
  var neighbouring_nodes = [];
  //adjacency_list.set([i, j], [i + direction[0], j + direction[1]]);
  for (let k = 0; k < 4; k++) {
    let direction = directions[k];
    if (inBounds(i, j, direction, r, c)) {
      neighbouring_nodes.push([i + direction[0], j + direction[1]]);
      //   console.log(
      //     "Adding node(i,j) to list",
      //     i + direction[0],
      //     j + direction[1]
      //   );
    }
  }
  if (neighbouring_nodes.length !== 0) {
    //console.log("n_nodes: ", neighbouring_nodes);
    adjacency_list.set([i, j], neighbouring_nodes);
  }
}
function inBounds(i, j, direction, r, c) {
  let new_i = i + direction[0];
  let new_j = j + direction[1];
  //console.log("n_i,n_j", new_i, new_j);
  if (new_i >= 0 && new_i < c && new_j >= 0 && new_j < r) return true;
  return false;
}
