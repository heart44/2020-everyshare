import React, { Component } from "react";
import "../lib/css/main.css";
import HOME from "../container/home/home";
import "react-multi-carousel/lib/styles.css";
import { withRouter } from "react-router-dom";
class EveryShareHome extends Component {

  render() {

    return (
      <div>
        <HOME></HOME>
      </div>
    );
  }
}

export default withRouter(EveryShareHome);
