let number_of_rows = 0;
let number_of_columns = 0;
let grid;
let adjacency_List;
let path = []; //For storing the total distance covered
let shortest_path_to_Target = []; //For storing the shortest path
export function BFS(grid_arr, startNode, targetNode, alist) {
  grid = grid_arr;
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  adjacency_List = alist;
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  BFS_Traversal(startNode, targetNode);
  return { path, shortest_path_to_Target };
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
