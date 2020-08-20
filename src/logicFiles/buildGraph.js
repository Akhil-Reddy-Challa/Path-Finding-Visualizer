import { buildAdjacencyList } from "./buildAdjacencyList.js";
let number_of_rows = 0;
let number_of_columns = 0;
let grid = [];
let adjacency_List = new Map();
let path = [];
let shortest_path_to_Target = [];
export function pathFinder(grid_arr, startNode, targetNode, algorithm) {
  grid = grid_arr;
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  main(); //Computes adjacencyList
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  if (algorithm === "dfs") DFS_Traversal(startNode, targetNode);
  else BFS_Traversal(startNode, targetNode);

  return { path, shortest_path_to_Target };
}
function main() {
  //Build Adjacency_List for our Graph
  adjacency_List = buildAdjacencyList(grid, number_of_rows, number_of_columns);
  //-------------Adjacency List Builded-----------
}
function DFS_Traversal(start, targetNode) {
  let visited = new Array(number_of_columns * number_of_rows).fill(false);

  findPathUsingDFS(start, targetNode, [start], visited);

  shortest_path_to_Target = path;
}
function findPathUsingDFS(start, destination, path_storage, visited) {
  //console.log("s,e", start, destination);
  if (start === destination) {
    //If Yes, mark destination as true
    //In the below code(for-statement), we use visited[destination]{This will stop our method from recursing after the path is found}
    visited[destination] = true;
    path = path_storage;
    return;
  }
  visited[start] = true;
  let neighbour_nodes = [];
  neighbour_nodes = adjacency_List.get(start);
  for (let connection of neighbour_nodes) {
    //console.log("connection:", connection);
    if (!visited[connection] && !visited[destination]) {
      path_storage.push(connection);
      findPathUsingDFS(connection, destination, path_storage, visited);
    }
  }
}
function BFS_Traversal(start, targetNode) {
  let visited = [];
  let shortest_path = [];
  let predecessor_array = [];
  /*
  predecessor_array stores all the previous nodes of current node
  example: 0-1-3
  For the above graph
  pred_array = [-1,0,1]
  It stores the node from which it can be reached
  */
  for (let i = 0; i < number_of_columns * number_of_rows; i++) {
    visited.push(false);
    predecessor_array.push(-1);
  }
  //------Below code can be divided into 2 Components--------
  //1) findPathUsingBFS => implements BFS to find if there is a path from start to end
  //2) if the above return true, then we find the shortest path
  if (findPathUsingBFS(start, targetNode, visited, predecessor_array)) {
    //We have found a path using BFS
    //Now we have to find the shortest Path using predecessor_array
    let node = targetNode;
    shortest_path.push(node);
    while (node !== start && predecessor_array[node] !== -1) {
      //We should stop when we encounter our start Node, hence (node!==start)
      shortest_path.push(predecessor_array[node]);
      node = predecessor_array[node];
    }
  }
  //Now assign the shortest_path, if it was calculated
  shortest_path_to_Target = shortest_path;
}
function findPathUsingBFS(start, targetNode, visited, predecessor_storage) {
  let queue = [start];
  let nodes_travelled = []; //list_of_all_the_nodes_travelled
  while (queue.length !== 0) {
    let node = queue.shift();
    //console.log("s,e", node, targetNode, queue);
    visited[node] = true; //Mark as visited
    nodes_travelled.push(node);
    let neighbouring_nodes = adjacency_List.get(node);
    //console.log("neighbours are:", neighbouring_nodes);
    for (let i = 0; i < neighbouring_nodes.length; i++) {
      let neighbour = neighbouring_nodes[i];
      if (!visited[neighbour]) {
        queue.push(neighbour);
        predecessor_storage[neighbour] = node; //This will store the previous node of the neighbour
        visited[neighbour] = true;
        if (neighbour === targetNode) {
          nodes_travelled.push(targetNode);
          path = nodes_travelled;
          //Destination Reached
          return true;
        }
      }
    }
  }
  //At this point we are unable to reach destination Node
  path = nodes_travelled;
  return false;
}
