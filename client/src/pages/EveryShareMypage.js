import React, { Component } from "react";
import "../lib/css/main.css";
import PROFILE from "../container/user/profile";
import { withRouter } from "react-router-dom";

class EveryShareMypage extends Component {

  render() {

    return (
      <div>
        <PROFILE></PROFILE>
      </div>
    );
  }
}

export default withRouter(EveryShareMypage);
