import Heap from "./HeapProgram/Heap";
let number_of_rows = 0;
let number_of_columns = 0;
let path = []; //For storing the total distance covered
let shortest_path_to_Target = []; //For storing the shortest path
export function A_Star(grid, startNode, targetNode) {
  number_of_rows = grid.length;
  number_of_columns = grid[0].length;
  console.log(number_of_rows, number_of_columns);
  console.log("Grid is: ", grid);
  let shortest_path_to_Target = findPath(grid, startNode, targetNode);
  console.log("Path:", shortest_path_to_Target);
  var timer = 1;
  for (let k = shortest_path_to_Target.length - 1; k > -1; k--) {
    let node = shortest_path_to_Target[k];
    let i = node[0];
    let j = node[1];
    setTimeout(
      () =>
        document
          .getElementById(node)
          .setAttribute("class", "drawTheShortestPath"),
      timer++ * 13
    );
  }
  return [];
}

class Node {
  constructor(parentNode, position) {
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.parentNode = parentNode;
    this.position = position;
  }

  isEqual(target) {
    return (
      this.position[0] === target.position[0] &&
      this.position[1] === target.position[1]
    );
  }
}
function findPath(grid, startNode, targetNode) {
  let start_node = new Node(null, startNode);
  let end_node = new Node(null, targetNode);
  //console.log("s_n,e_n:", start_node, end_node);

  //Initialize both open and closed list
  let open_list = new Heap();
  console.log("open_list INIT:", open_list.print());
  let closed_list = [];

  //Heapify the open_list and Add the start node
  open_list.insert(start_node);
  console.log("First insert: ", open_list.length, open_list.print());

  // Adding a stop condition
  let outer_iterations = 0;
  let max_iterations = Math.floor((grid[0].length * grid.length) / 2);

  // what squares do we search
  let adjacent_squares = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  //console.log("leng of heap:", open_list.length);
  while (open_list.length > 0) {
    outer_iterations++;

    if (outer_iterations > max_iterations) {
      //if we hit this point return the path such as it is
      // it will not contain the destination
      console.log("giving up on pathfinding too many iterations");
      return;
    }

    // Get the current node
    let current_node = open_list.remove();
    console.log("Current node is:", current_node.position, current_node);
    console.log("open_list is:", open_list.print());
    closed_list.push(current_node);

    // Found the goal
    if (current_node.isEqual(end_node)) {
      console.log("Found Path");
      return return_path(current_node);
    }

    //else
    // Generate children
    let children = [];

    for (let new_position of adjacent_squares) {
      // Get node position
      let node_position = [
        current_node.position[0] + new_position[0],
        current_node.position[1] + new_position[1],
      ];

      // Make sure within range &
      // Make sure walkable terrain
      if (inBounds(node_position) && !isWall(grid, node_position)) {
        console.log("new_pos & new_node is:", new_position, node_position);
        // Create new node
        let new_node = new Node(current_node, node_position);
        // Append
        children.push(new_node);
      }
    }
    console.log("Final childrens are:", customPrint(children));

    // Loop through children
    for (let child of children) {
      console.log("Checking child: ", child.position, child);
      // Child is on the closed list
      if (!isPresentInsideClosedList(child, closed_list)) {
        // Create the f, g, and h values
        child.g = current_node.g + 1;
        child.h =
          Math.pow(child.position[0] - end_node.position[0], 2) +
          Math.pow(child.position[1] - end_node.position[1], 2);
        child.f = child.g + child.h;

        // Child is already in the open list
        if (!isPresentInsideOpenList(child, open_list)) {
          console.log("child ", child.position, "passed all the tests", child);
          // Add the child to the open list
          open_list.insert(child);
          console.log("child pushed", child.position);
          console.log("after pushing a child open_list = ", open_list.print());
        }
      }
    }
    console.log(
      "After pushing all the childrens, open_list is:",
      open_list.print()
    );
  }
  console.log("Could not get a path to destination");
  return;
}
function return_path(current_node) {
  var path_storage = [];
  var current = current_node;
  while (current != null) {
    path_storage.push(current.position);
    current = current.parentNode;
  }

  return path_storage;
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
function customPrint(nodes) {
  //console.log("Inside customPrint: nodes are", nodes);
  if (nodes.length === 0) return "[]";
  console.log("Original list: ", nodes);
  var elements = "[";
  for (let i = 0; i < nodes.length; i++) {
    var temp = nodes[i].position.slice();
    temp = "(" + temp.toString() + ")";
    elements += temp;
    elements += ",";
  }
  elements += "]";
  return elements;
}
function isPresentInsideClosedList(child, closed_list) {
  for (let node of closed_list) {
    if (child.isEqual(node)) {
      console.log("child present in closed_list, so skipping");
      console.log(
        "by the way closed_list is:",
        closed_list.length,
        customPrint(closed_list)
      );
      return true;
    }
  }
  return false;
}
function isPresentInsideOpenList(child, open_list) {
  let open_list_elements = open_list.allTheElements();
  console.log("open_list_elements are:", customPrint(open_list_elements));
  for (let open_node of open_list_elements) {
    if (child.isEqual(open_node) && child.g > open_node.g) {
      console.log("child present in open_list, so skipping");
      console.log(
        "by the way open_list is:",
        open_list.length,
        customPrint(open_list_elements)
      );
      return true;
    }
  }
  return false;
}
/*
References:
http://csis.pace.edu/~benjamin/teaching/cs627/webfiles/Astar.pdf
*/
