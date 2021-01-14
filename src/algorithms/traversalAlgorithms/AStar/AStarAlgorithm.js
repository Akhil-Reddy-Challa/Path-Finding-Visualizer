import { getPathandShortestPath } from "./AStar_Helper";
export function AStar(grid, startNode, targetNode) {
  let { path, shortest_path_to_Target } = getPathandShortestPath(
    grid,
    startNode,
    targetNode
  );
  //Astar return path,shortest_path with array values, BFS,DFS,DIjkstra return integers
  //Hence drawGraph(Board.jsx) cannot handle this
  drawGraph(path, shortest_path_to_Target);
  return { path, shortest_path_to_Target };
}
function drawGraph(path, shortestPath) {
  var timer = 1;
  if (path.length > 0) {
    for (let node of path) {
      setTimeout(
        () =>
          document
            .getElementById(node)
            .setAttribute("class", "drawDistanceTravelled"),
        timer++ * 10
      );
    }
  }
  if (shortestPath.length > 0) {
    for (let k = 0; k < shortestPath.length; k++) {
      let node = shortestPath[k];
      setTimeout(
        () =>
          document
            .getElementById(node)
            .setAttribute("class", "drawTheShortestPath"),
        timer++ * 15
      );
    }
  }
  //In the method(starVisz) we make the navbar unclickable, so change it back to auto
  setTimeout(() => {
    document.getElementById("navbar").style.pointerEvents = "auto";
  }, timer * 15);
}
