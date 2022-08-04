import React, { Component } from "react";
import "../../lib/css/footer.css";

import { withRouter } from "react-router-dom";
import BasicFooter from "./footer_basic";

class Footer extends Component {
  
  FooterType() {
    if ("/chat" === this.props.location.pathname) {
      return <div></div>;
    } else {
      return <BasicFooter />
    }
  }

  render() {
    return (
      <div>
        {this.FooterType()}
      </div>
    );
  }
}

export default withRouter(Footer);
