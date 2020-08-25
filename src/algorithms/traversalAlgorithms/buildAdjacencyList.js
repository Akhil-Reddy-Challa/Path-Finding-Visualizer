export function buildAdjacencyList(grid) {
  let r, c;
  r = grid.length; //Rows
  c = grid[0].length; //Columns
  let adjacency_list = new Map();
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] !== 1) {
        //We should build adj_list for all nodes except Wall(i.e grid[i][j]===1)
        let number = convertIndexesToNumber(i, j, c);
        let neighbours = findNeighbours(i, j, r, c, grid);
        adjacency_list.set(number, neighbours);
      }
    }
  }
  return adjacency_list;
}
function convertIndexesToNumber(index1, index2, column_length) {
  return column_length * index1 + (index2 + 1);
}
function findNeighbours(index1, index2, row_len, col_len, grid) {
  let numberOfIndex;
  //Check all the four directions(right,down,top,back) in the grid
  //------Begin-------
  let neighbours = [];
  //1) Check Righmost node
  let new_row_index = index1;
  let new_col_index = index2 + 1;
  if (new_col_index < col_len) {
    //Right element is available
    //Now check if it is 1(i.e wall === 1)
    if (grid[new_row_index][new_col_index] !== 1) {
      //If not 1 then it not a wall
      //Add it to the neighbours array
      //Before that Convert indexes to number,for simplicity
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      neighbours.push(numberOfIndex);
    }
  }
  //2) Check the Bottom node
  new_row_index = index1 + 1;
  new_col_index = index2;
  if (new_row_index < row_len) {
    if (grid[new_row_index][new_col_index] !== 1) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      neighbours.push(numberOfIndex);
    }
  }
  //3) Check the TopMost node
  new_row_index = index1 - 1;
  new_col_index = index2;
  if (new_row_index >= 0) {
    if (grid[new_row_index][new_col_index] !== 1) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      neighbours.push(numberOfIndex);
    }
  }
  //4) Check the Left node
  new_row_index = index1;
  new_col_index = index2 - 1;
  if (new_col_index >= 0) {
    if (grid[new_row_index][new_col_index] !== 1) {
      numberOfIndex = convertIndexesToNumber(
        new_row_index,
        new_col_index,
        col_len
      );
      neighbours.push(numberOfIndex);
    }
  }
  //Now send back all the neighbours collected
  return neighbours;
}
