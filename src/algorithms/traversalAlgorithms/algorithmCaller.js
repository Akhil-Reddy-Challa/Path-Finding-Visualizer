import { DFS } from "./DFS/DFS";
import { BFS } from "./BFS/BFS";
import { Dijkstra } from "./Dijkstras/Dijkstras";
import { Astar } from "./AStar/A_StarAlgorithm";
import { buildAdjacencyList } from "./AdjacenyListBuilder/buildAdjacencyList";
export function Algorithms(grid_arr, startNode, targetNode, algorithmNumber) {
  //Before calling our algorithms, generate a AdjacencyList & pass it as a parameter
  let adjacency_List = buildAdjacencyList(grid_arr);
  switch (algorithmNumber) {
    case 0:
      return BFS(grid_arr, startNode, targetNode, adjacency_List);
    case 1:
      return DFS(grid_arr, startNode, targetNode, adjacency_List);
    case 2:
      return Dijkstra(grid_arr, startNode, targetNode, adjacency_List);
    case 3:
      return Astar(grid_arr, startNode, targetNode, adjacency_List);
    default:
      return;
  }
}
