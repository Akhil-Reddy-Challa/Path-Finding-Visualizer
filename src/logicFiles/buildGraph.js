import { buildAdjacencyList } from "./buildAdjacencyList.js";
export function pathFinder(grid_arr, startNode, targetNode, algorithm) {
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
  if (algorithm === "dfs") DFS_Traversal(startNode, targetNode);
  else BFS_Traversal(startNode, targetNode);

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
function DFS_Traversal(start, end) {
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
function BFS_Traversal(start, end) {
  var queue = [start];
  let visited = new Array(number_of_columns * number_of_rows).fill(false);
  var path_storage = [];
  let peek = 0;
  while (queue.length !== 0) {
    //console.log("s,e", queue[0], end, queue);
    visited[queue[0]] = true;
    path_storage.push(queue[0]);
    if (queue[0] === end) {
      console.log("path:", path_storage);
      path = path_storage;
      break;
    } else {
      if (adjacency_List.has(queue[0])) {
        let neighbours = adjacency_List.get(queue[0]);
        for (let neighbour of neighbours) {
          if (!visited[neighbour]) queue.push(neighbour);
          visited[neighbour] = true;
        }
      }
    }
    queue.shift();
  }
  //path = path_storage;
}
