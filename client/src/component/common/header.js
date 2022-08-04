import React, { Component } from "react";
import HeaderB from "./header_basic";
import HeaderS from "./header_special";
import { withRouter } from "react-router-dom";


class AuthHeader extends Component {
 
    HeaderType(logged, onLogout) {
    const exclusionArray = ["/write", "/modify"];

    for (let i = 0; i < exclusionArray.length; ++i) {
      if (exclusionArray[i] === this.props.location.pathname) {
        return <HeaderS logged={logged} onLogout={onLogout}/>;
      }
    }

    if (
      "/register" === this.props.location.pathname ||
      "/login" === this.props.location.pathname ||
      "/chat" === this.props.location.pathname
    ) {
      return <div></div>;
    } else {
      return <HeaderB logged={logged} onLogout={onLogout} />;
    }
  }

  render() {
    const { logged, onLogout } = this.props;
    return (
            <div>
                {this.HeaderType(logged, onLogout)}
            </div>
         
    );
  }
}

export default withRouter(AuthHeader);
