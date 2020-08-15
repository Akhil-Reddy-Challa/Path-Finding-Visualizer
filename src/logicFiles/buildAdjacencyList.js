export function buildAdjacencyList(grid, r, c) {
  let adjacency_list = new Map();
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] === 0) {
        let number = convertIndexesToNumber(i, j, c);
        //console.log("number=", number);
        let neighbours = findNeighbours(i, j, r, c, grid);
        adjacency_list.set(number, neighbours);
        //console.log("neighbours:", neighbours);
      }
    }
  }
  //console.log("Adjacency_list_builded:");
  // for (let [key, value] of adjacency_list.entries()) {
  //   console.log(key + " = " + value);
  // }
  return adjacency_list;
}
function convertIndexesToNumber(index1, index2, column_length) {
  return column_length * index1 + (index2 + 1);
}
function findNeighbours(index1, index2, row_len, col_len, grid) {
  //console.log("searching for:", index1, index2);
  let numberOfIndex;
  //Check all the four directions(right,down,top,back) in the grid
  //------Begin-------
  let neighbours = [];
  //1) Check Righmost node
  let new_row_index = index1;
  let new_col_index = index2 + 1;
  if (new_col_index < col_len) {
    //Right element is available
    //Now check if it is 0  or 1
    if (grid[new_row_index][new_col_index] === 0) {
      //Add it to the neighbours array
      //Convert indexes to number
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      //console.log("1 Found at ", new_row_index, new_col_index);
      neighbours.push(numberOfIndex);
    }
  }
  //2) Check for Bottom node
  new_row_index = index1 + 1;
  new_col_index = index2;
  if (new_row_index < row_len) {
    if (grid[new_row_index][new_col_index] === 0) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      //console.log("2 Found at ", new_row_index, new_col_index);
      neighbours.push(numberOfIndex);
    }
  }
  //3) Check for Top node
  new_row_index = index1 - 1;
  new_col_index = index2;
  if (new_row_index >= 0) {
    if (grid[new_row_index][new_col_index] === 0) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      //console.log("3 Found at ", new_row_index, new_col_index);
      neighbours.push(numberOfIndex);
    }
  }
  //4) Check for Left node
  new_row_index = index1;
  new_col_index = index2 - 1;
  if (new_col_index >= 0) {
    if (grid[new_row_index][new_col_index] === 0) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      //console.log("4 Found at ", new_row_index, new_col_index);
      neighbours.push(numberOfIndex);
    }
  }
  return neighbours;
}
