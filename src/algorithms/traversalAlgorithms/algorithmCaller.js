import { DFS } from "./DFSAlgorithm";
import { BFS } from "./BFSAlgorithm";
import { Dijkstra } from "./DijkstrasAlgorithm";
import { buildAdjacencyList } from "./buildAdjacencyList";
export function Algorithms(grid_arr, startNode, targetNode, algorithmNumber) {
  //Before we run our algorithm, we have to generate AdjacencyList
  let adjacency_List = buildAdjacencyList(grid_arr);
  switch (algorithmNumber) {
    case 0:
      return BFS(grid_arr, startNode, targetNode, adjacency_List);
    case 1:
      return DFS(grid_arr, startNode, targetNode, adjacency_List);
    case 2:
      return Dijkstra(grid_arr, startNode, targetNode, adjacency_List);
    default:
      return;
  }
}
