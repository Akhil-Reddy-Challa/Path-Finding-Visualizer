import Heap from "./Heap"; //For Minheap
let number_of_rows;
let number_of_columns;
let path = []; // Stores path
let shortest_path_to_Target = []; //Use for storing shortest_path_to_target
export function getPathandShortestPath(grid, startNode, targetNode) {
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  path = []; //JS has a wierd behaviour, it is not allocating new memory position for this variable everytime this algo is called
  //Hence assign it to an empty array
  shortest_path_to_Target = [];
  findPath(grid, startNode, targetNode);
  return { path, shortest_path_to_Target };
}

class Node {
  //Every node in grid is treated as Node, because for every node we want to store g,f,h
  constructor(parentNode, position) {
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.parentNode = parentNode; //Holds the parent node, for start & target parent = null (useful has stop condition during the trackback of short path)
    this.position = position;
  }

  isEqual(target) {
    //Method says if two nodes are pointing to same position
    return (
      this.position[0] === target.position[0] &&
      this.position[1] === target.position[1]
    );
  }
}
function findPath(grid, startNode, targetNode) {
  /*
  -----1st Part Starts-----
  */
  //Convert start,target arrays to Node object
  let start_node = new Node(null, startNode);
  let end_node = new Node(null, targetNode);

  //Initialize both open and closed list
  //Instantiate open_list has heap class
  //This will helps us in giving the min value always
  let open_list = new Heap();
  let closed_list = [];

  open_list.insert(start_node); //Push start_node to heap
  //console.log("First insert: ", open_list.length, open_list.print());

  // Adding a stop condition
  // IMPORTANT: We dont want our program to be stuck in Infinte Loop if no_path to target exists
  let outer_iterations = 0;
  let max_iterations = Math.floor((grid[0].length * grid.length) / 2);
  /*
  -----1st Part Ends-----
  */

  // For calculating the adjacent values
  let adjacent_squares = [
    [0, -1] /* Left */,
    [0, 1] /* Right */,
    [-1, 0] /* Top */,
    [1, 0] /* Down */,
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

  /*
  -----2nd Part Starts-----
  */
  while (open_list.length > 0) {
    outer_iterations++;

    // Get the current node
    let current_node = open_list.remove();
    // console.log("Current node is:", current_node.position, current_node);
    // console.log("open_list is:", open_list.print());
    closed_list.push(current_node);

    //If no path to target, we might hit the below if
    if (outer_iterations > max_iterations) {
      //console.log("Reached max");
      //No path found
      //if we hit this point return empty array for shortest_path_to_Target
      return;
    }

    // If we find the TARGET
    if (current_node.isEqual(end_node)) {
      //Found Path
      trace_path(current_node);
      return;
    }

    //else
    // Navigate the childrens
    let children = [];

    for (let new_position of adjacent_squares /*Declared above */) {
      // Get node position
      let node_position = [
        current_node.position[0] + new_position[0],
        current_node.position[1] + new_position[1],
      ]; //node_position will have the coordinates one of the 4 childrens, we have perform few test to see if it is valid

      /*
      1st Test
      Make sure if coordinates are in range
      Method inBounds ==> Checks if row,col are in bounds
      */
      /*
      2nd Test
      Check if the new coordinate is a wall (i,e grid[x][y] === 1)
      Method isWall ==> Checks if the position is a wall or not
      */
      if (inBounds(node_position) && !isWall(grid, node_position)) {
        //console.log("new_pos & new_node is:", new_position, node_position);
        // Create new node
        let new_node = new Node(current_node, node_position);
        // Append
        children.push(new_node);
      }
    }
    //console.log("Final childrens are:", customPrint(children));

    // Loop through children
    for (let child of children) {
      //console.log("Checking child: ", child.position, child);
      // Child is on the closed list
      //Child should not be inside the closed_list
      if (!isPresentInsideClosedList(child, closed_list)) {
        /* Method name is self-explanatory */

        // Compute the f, g, and h values
        child.g = current_node.g + 1;
        child.h =
          Math.pow(child.position[0] - end_node.position[0], 2) +
          Math.pow(child.position[1] - end_node.position[1], 2); //heuristic
        child.f = child.g + child.h;

        //Child should not be inside the open_list
        if (!isPresentInsideOpenList(child, open_list)) {
          //console.log("child ", child.position, "passed all the tests", child);
          // Add the child to the open list
          open_list.insert(child);
          path.push(child.position);
          // console.log("child pushed", child.position);
          // console.log("after pushing a child open_list = ", open_list.print());
        }
      }
    }
  }
  //At this point we have not found any path to target
  //console.log("Could not get a path to destination");
  return;
}
function trace_path(current_node) {
  //Responsible for tracking the shortest path
  var path_storage = [];
  var current = current_node;
  while (current != null) {
    path_storage.push(current.position);
    current = current.parentNode;
  }
  //Set the Global shortest path
  //Before returning, reverse the array values
  //Because we trace our path from target to start, the order would be backwards
  shortest_path_to_Target = path_storage.reverse();
}
function inBounds(node) {
  return (
    node[0] >= 0 &&
    node[0] < number_of_rows &&
    node[1] >= 0 &&
    node[1] < number_of_columns
  );
}
function isWall(grid, node) {
  return grid[node[0]][node[1]] === 1;
}
// function customPrint(nodes) {
//   //console.log("Inside customPrint: nodes are", nodes);
//   if (nodes.length === 0) return "[]";
//   console.log("Original list: ", nodes);
//   var elements = "[";
//   for (let i = 0; i < nodes.length; i++) {
//     var temp = nodes[i].position.slice();
//     temp = "(" + temp.toString() + ")";
//     elements += temp;
//     elements += ",";
//   }
//   elements += "]";
//   return elements;
// }
function isPresentInsideClosedList(child, closed_list) {
  for (let node of closed_list) {
    if (child.isEqual(node)) {
      // console.log("child present in closed_list, so skipping");
      // console.log(
      //   "by the way closed_list is:",
      //   closed_list.length,
      //   customPrint(closed_list)
      // );
      return true;
    }
  }
  return false;
}
function isPresentInsideOpenList(child, open_list) {
  let open_list_elements = open_list.allTheElements();
  //console.log("open_list_elements are:", customPrint(open_list_elements));
  for (let open_node of open_list_elements) {
    if (child.isEqual(open_node) && child.g > open_node.g) {
      // console.log("child present in open_list, so skipping");
      // console.log(
      //   "by the way open_list is:",
      //   open_list.length,
      //   customPrint(open_list_elements)
      // );
      return true;
    }
  }
  return false;
}
/*
References:
http://csis.pace.edu/~benjamin/teaching/cs627/webfiles/Astar.pdf
*/
