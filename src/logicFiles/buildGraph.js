import { buildAdjacencyList } from "./buildAdjacencyList.js";
export function pathFinder(grid_arr, startNode, targetNode) {
  grid = grid_arr;
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  //console.log(grid);
  //console.log("s,t", startNode, targetNode);
  //console.log("rows,cols:", number_of_rows, number_of_columns);
  main(); //Computes adjacencyList
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  //console.log("Number equivalent:", startNode, targetNode);
  traversal(startNode, targetNode);

  return path;
}
let number_of_rows = 0;
let number_of_columns = 0;
let grid = [];
let adjacency_List = new Map();
function main() {
  //console.log("r,c:", number_of_rows, number_of_columns);
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

  findPathUsingDFS(start, end, [start], visited);
  //console.log("Path:", path);
}
function findPathUsingDFS(start, destination, path_storage, visited) {
  //console.log("s,e", start, destination);
  if (start === destination) {
    //If Yes, mark destination as true
    //In the below code(for-statement), we use visited[destination]{This will stop our method from recursing even after the path is found}
    visited[destination] = true;
    path = path_storage;
    return;
  }
  visited[start] = true;
  let neighbour_nodes = [];
  if (adjacency_List.has(start)) neighbour_nodes = adjacency_List.get(start);
  for (let connection of neighbour_nodes) {
    //console.log("connection:", connection);
    if (!visited[connection] && !visited[destination]) {
      path_storage.push(connection);
      findPathUsingDFS(connection, destination, path_storage, visited);
    }
  }
}
