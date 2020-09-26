let number_of_rows = 0;
let number_of_columns = 0;
let grid;
let adjacency_List;
let path = []; //For storing the total distance covered
let shortest_path_to_Target = []; //For storing the shortest path
export function Dijkstra(grid_arr, startNode, targetNode, alist) {
  grid = grid_arr;
  path = [];
  shortest_path_to_Target = [];
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  adjacency_List = alist;
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  dijkstraAlgorithm(startNode, targetNode);
  return { path, shortest_path_to_Target };
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

  visited = new Array(total).fill(false); //Mark all the nodes as unvisited
  predecessor_storage = new Array(total).fill(-1); //Make all the nodes as unreachable i.e -1
  BFS_Traversal(startNode, targetNode, visited, predecessor_storage);
  //We have obtained the distance travelled to reach TargetNode using BFS
  //----------------------------------------1st part ENDS ------------------------------------//

  //Now re-initialize the arrays(visited,pred_storage)
  visited = new Array(total + 1).fill(false); //total+1 because our start node == 1
  distance = new Array(total + 1).fill(Number.MAX_SAFE_INTEGER); //Dijkstra assumes the distance from start to ALL the nodes as INFIFNITE intitally
  predecessor_storage = new Array(total + 1).fill(-1);

  //----------------------------------------2nd Part Begins------------------------------------//
  findShortestPathDijkstra(startNode, distance, visited, predecessor_storage);
  //Now we have our distance and pred_storage filled
  //1) Check if we have a route to our target Node, i.e: If the targetNode is MAX_SAFE_INTEGER then there is no path from start to target
  if (distance[targetNode] !== Number.MAX_SAFE_INTEGER) {
    //Path exists
    //Now extract the shortest_Path
    let node = targetNode;
    let shortest_path = [];
    shortest_path.push(node);
    while (node !== startNode && predecessor_storage[node] !== -1) {
      //We should stop when we encounter our start Node, hence we include (node!==start) in the above if condition
      shortest_path.push(predecessor_storage[node]);
      node = predecessor_storage[node];
    }
    //Before setting the global shortest_path
    //Reverse the array values
    //Because we trace our path from target to start, the order would be backwards
    shortest_path_to_Target = shortest_path.reverse();
  }
  //----------------------------------------2nd Part ENDS------------------------------------//
}
function findShortestPathDijkstra(startNode, distance, visited, pred_array) {
  let numberOfNodes = number_of_columns * number_of_rows;
  let weight = 1; //Because we are dealing with un-weighted graph, so the default would be 1
  distance[startNode] = 0; // Make distance From startNode to startNode as Zero
  // Find shortest path from source to all the remaining vertices
  for (let i = 1; i < numberOfNodes; i++) {
    let current_node = getNextMinimumDistance(distance, visited, numberOfNodes); // Get's new Minimum Distance from distance_array
    visited[current_node] = true;
    //Now calculate distance from current_node to rest of the nodes
    if (adjacency_List.has(current_node)) {
      //This helps to stop execution, when a wall in our graph is encountered
      let neighbouring_nodes = adjacency_List.get(current_node); //Get the neighbours
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
  //Responsible for getting minimum value from the array
  let min = Number.MAX_SAFE_INTEGER;
  let min_index = -1;
  for (let v = 0; v < numberOfNodes; v++)
    if (!visited[v] && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  return min_index;
}
function BFS_Traversal(start, targetNode, visited, predecessor_storage) {
  let queue = [start];
  let nodes_travelled = [];
  while (queue.length !== 0) {
    let node = queue.shift();
    visited[node] = true;
    nodes_travelled.push(node);
    let neighbouring_nodes = adjacency_List.get(node);
    for (let i = 0; i < neighbouring_nodes.length; i++) {
      let neighbour = neighbouring_nodes[i];
      if (!visited[neighbour]) {
        queue.push(neighbour);
        predecessor_storage[neighbour] = node;
        visited[neighbour] = true;
        if (neighbour === targetNode) {
          nodes_travelled.push(targetNode);
          path = nodes_travelled;
          return true;
        }
      }
    }
  }
  path = nodes_travelled;
  return false;
}
