import { buildAdjacencyList } from "./buildAdjacencyList.js";
let number_of_rows = 0;
let number_of_columns = 0;
let grid = [];
let adjacency_List = new Map();
let path = [];
let shortest_path_to_Target = [];
export function pathFinder(grid_arr, startNode, targetNode, algorithm) {
  grid = grid_arr;
  path = [];
  shortest_path_to_Target = [];
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  main(); //Computes adjacencyList
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  if (algorithm === "dfs") DFS_Traversal(startNode, targetNode);
  else if (algorithm === "bfs") BFS_Traversal(startNode, targetNode);
  else dijkstraAlgorithm(startNode, targetNode);
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
}
function findPathUsingDFS(start, destination, path_storage, visited) {
  //console.log("s,e", start, destination);
  if (start === destination) {
    //If Yes, mark destination as true
    //In the below code(for-statement), we use visited[destination]{This will stop our method from recursing after the path is found}
    visited[destination] = true;
    path = path_storage;
    shortest_path_to_Target = path; //We use this because, we dont want our program to draw shortest_path_if the targetNode is not reachable
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
  path = path_storage;
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
  let nodes_travelled = []; //Stores the list_of_all_the_nodes_travelled
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
  path = nodes_travelled; //So store the path to represent the distance travelled by BFS
  return false;
}
function dijkstraAlgorithm(startNode, targetNode) {
  /*
   *Dijkstra only lets us find the shortest path between two nodes
   *To find the path traversed we should use BFS
   So this function is split into 2 parts
   */
  //----------------------------------------1st part Begins------------------------------------//
  let distance = []; // For storing shortest distance to reach all nodes from source
  let visited = [];
  let predecessor_storage = []; //Useful for computing shortest_path
  let total = number_of_columns * number_of_rows;

  visited = new Array(total).fill(false);
  predecessor_storage = new Array(total).fill(-1);
  findPathUsingBFS(startNode, targetNode, visited, predecessor_storage);
  //We have obtained the distance travelled to reach TargetNode using BFS
  //----------------------------------------1st part ENDS ------------------------------------//
  //Now re-initialize the arrays(visited,pred_array)
  visited = new Array(total + 1).fill(false); //total+1 because our start node == 1
  distance = new Array(total + 1).fill(Number.MAX_SAFE_INTEGER);
  predecessor_storage = new Array(total + 1).fill(-1);
  //----------------------------------------2nd Part Begins------------------------------------//
  findShortestPathDijkstra(startNode, distance, visited, predecessor_storage);
  //Now we have our distance and pred_array filled
  //1) Check if we have a route to our target Node, i.e: If the targetNode is MAX_INT then there is no path from start to target
  if (distance[targetNode] !== Number.MAX_SAFE_INTEGER) {
    //Path exists
    //Now extract the shortest_Path
    let node = targetNode;
    let shortest_path = [];
    shortest_path.push(node);
    while (node !== startNode && predecessor_storage[node] !== -1) {
      //We should stop when we encounter our start Node, hence (node!==start)
      shortest_path.push(predecessor_storage[node]);
      node = predecessor_storage[node];
    }
    shortest_path_to_Target = shortest_path; //Set the global shortest_path
  }
  //----------------------------------------2nd Part ENDS------------------------------------//
}
function findShortestPathDijkstra(startNode, distance, visited, pred_array) {
  let numberOfNodes = number_of_columns * number_of_rows;
  let weight = 1; //Because we are dealing  with un-weighted graph, so the default would be 1
  distance[startNode] = 0; // Make distance From startNode to startNode as Zero
  // Find shortest path from source to all the remaining vertices
  for (let i = 1; i < numberOfNodes; i++) {
    let current_node = getNextMinimumDistance(distance, visited, numberOfNodes); // Get's new Minimum Distance from distance_array
    visited[current_node] = true;
    //Now calculate distance from current_node to rest of the nodes
    if (adjacency_List.has(current_node)) {
      //This helps to stop execution, when a wall is being iterated
      let neighbouring_nodes = adjacency_List.get(current_node);
      for (let neighbour of neighbouring_nodes) {
        if (
          !visited[neighbour] &&
          distance[current_node] !== Number.MAX_SAFE_INTEGER &&
          distance[current_node] + weight < distance[neighbour]
        ) {
          distance[neighbour] = distance[current_node] + 1;
          pred_array[neighbour] = current_node;
        }
      }
    }
  }
}
function getNextMinimumDistance(dist, visited, numberOfNodes) {
  let min = Number.MAX_SAFE_INTEGER,
    min_index = -1;
  for (let v = 0; v < numberOfNodes; v++)
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  return min_index;
}
