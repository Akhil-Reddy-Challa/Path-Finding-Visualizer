import { buildAdjacencyList } from "./buildAdjacencyList.js";
export function helper(grid_arr) {
  grid = grid_arr;
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  main(); //Computes adjacencyList
  traversal(1, 200);
  return path;
}
let number_of_rows = 0;
let number_of_columns = 0;
let grid = [];
let adjacency_List = new Map();
function main() {
  console.log("r,c:", number_of_rows, number_of_columns);
  //Build Adjacency_List for our Graph
  adjacency_List = buildAdjacencyList(grid, number_of_rows, number_of_columns);
  //Builded -------------Adjacency List-----------
}
let path = [];
function traversal(start, end) {
  //1) DFS
  let visited = new Array(number_of_columns * number_of_rows).fill(false);
  // for (let [key, value] of adjacency_List.entries()) {
  //   console.log(key + " = " + value);
  // }

  findPathUsingDFS(start, end, [], visited);
  //console.log("Path:", path);
}
function findPathUsingDFS(start, destination, path_storage, visited) {
  //console.log("s,e", start, destination);
  if (visited[destination]) {
    //console.log("Found path", path_storage);
    path = path_storage;
    return;
  }
  visited[start] = true;
  let neighbour_nodes = [];
  if (adjacency_List.has(start)) neighbour_nodes = adjacency_List.get(start);
  for (let connection of neighbour_nodes) {
    //console.log("connection:", connection);
    if (!visited[connection]) {
      path_storage.push(connection);
      return findPathUsingDFS(connection, destination, path_storage, visited);
    }
  }
}
