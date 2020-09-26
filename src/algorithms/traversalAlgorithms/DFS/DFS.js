let number_of_rows = 0;
let number_of_columns = 0;
let grid;
let adjacency_List;
let path = []; //For storing the total distance covered
let shortest_path_to_Target = []; //For storing the shortest path
export function DFS(grid_arr, startNode, targetNode, alist) {
  grid = grid_arr;
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  adjacency_List = alist;
  //startNode & endNode are arrays, so convert them to number using Formula(column_length * index1 + (index2 + 1))
  startNode = number_of_columns * startNode[0] + (startNode[1] + 1);
  targetNode = number_of_columns * targetNode[0] + (targetNode[1] + 1);
  DFS_Traversal(startNode, targetNode);
  return { path, shortest_path_to_Target };
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
    shortest_path_to_Target = path; //We use this because, we dont want our program to draw shortest path if the targetNode is not reachable
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
