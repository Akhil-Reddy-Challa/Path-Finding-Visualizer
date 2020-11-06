import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
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
                <li>
                  <a href="/#" onClick={() => this.props.onDrawMaze(0)}>
                    Random Wall Maze
                  </a>
                </li>
                <li>
                  <a href="/#" onClick={() => this.props.onDrawMaze(1)}>
                    Recursive Division
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                id="visualizeButton"
                type="button"
                className="btn"
                onClick={this.props.onStartVisualize}
                refs="button"
              >
                Visualize
              </button>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="/#">
                Algorithms! <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/#" onClick={() => this.props.onSelectAlgo(0)}>
                    BFS
                  </a>
                </li>
                <li>
                  <a href="/#" onClick={() => this.props.onSelectAlgo(1)}>
                    DFS
                  </a>
                </li>
                <li>
                  <a href="/#" onClick={() => this.props.onSelectAlgo(2)}>
                    Dijkstra's
                  </a>
                </li>
                <li>
                  <a href="/#" onClick={() => this.props.onSelectAlgo(3)}>
                    A-Star
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
