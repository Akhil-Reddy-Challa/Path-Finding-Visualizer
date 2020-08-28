import { randomWallMaze } from "./randomWallMaze";
import { RecursiveDivision } from "./RecursiveDivision";
export function MazeGenerator(grid_arr, startFlag, finishFlag, maze_to_build) {
  switch (maze_to_build) {
    case 0:
      return randomWallMaze(grid_arr, startFlag, finishFlag);
    case 1:
      return RecursiveDivision(grid_arr, startFlag, finishFlag);
    default:
      return;
  }
}
