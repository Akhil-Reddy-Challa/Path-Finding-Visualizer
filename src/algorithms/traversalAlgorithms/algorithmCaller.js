import { DFS } from "./DFS/DFS";
import { BFS } from "./BFS/BFS";
import { Dijkstra } from "./Dijkstras/Dijkstras";
import { AStar } from "./AStar/AStarAlgorithm";
import { buildAdjacencyList } from "./AdjacenyListBuilder/buildAdjacencyList";

export function Algorithms(grid_arr, startNode, targetNode, algorithmNumber) {
  const adjacency_List = buildAdjacencyList(grid_arr);

  switch (algorithmNumber) {
    case 0:
      return BFS(grid_arr, startNode, targetNode, adjacency_List);
    case 1:
      return DFS(grid_arr, startNode, targetNode, adjacency_List);
    case 2:
      return Dijkstra(grid_arr, startNode, targetNode, adjacency_List);
    case 3:
      //We dont need adjacenyList for Astart algo
      return AStar(grid_arr, startNode, targetNode);
    default:
      return;
  }
}
