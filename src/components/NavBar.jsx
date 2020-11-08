import React, { Component } from "react";
import "../cssFiles/bootstrap.min.css";
import "../cssFiles/css_for_board.css";
class NavBar extends Component {
  render() {
    const traversalAlgorithms = ["BFS", "DFS", "Dijkstra's", "A-Star"];
    const mazeAlgorithms = ["Random Wall Maze", "Recursive Division"];
    return (
      <nav className="navbar" id="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              href="/#"
              className="navbar-brand"
              onClick={() => window.location.reload()}
            >
              Path Finding Visualizer
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="/#" onClick={this.props.onClearBoard}>
                Clear-Board!
              </a>
            </li>
            <li className="active">
              <a href="/#" onClick={this.props.onClearPath}>
                Clear-Path!
              </a>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="/#">
                Mazes! <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                {mazeAlgorithms.map((algoName, index) => (
                  <li key={index}>
                    <a href="/#" onClick={() => this.props.onDrawMaze(index)}>
                      {algoName}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button
                id="visualizeButton"
                className="btn"
                onClick={this.props.onStartVisualize}
              >
                Visualize
              </button>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="/#">
                Algorithms! <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                {traversalAlgorithms.map((algoName, index) => (
                  <li key={index}>
                    <a href="/#" onClick={() => this.props.onSelectAlgo(index)}>
                      {algoName}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="iconsPreviewSection">
            <i className="displayIcon material-icons" style={{ color: "red" }}>
              place
            </i>
            <span>Start Flag</span>
            <i
              className="displayIcon material-icons"
              style={{ color: "green" }}
            >
              place
            </i>
            <span>Target Flag</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
