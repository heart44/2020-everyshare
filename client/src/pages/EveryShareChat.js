import React, { Component } from "react";
import Chat from "../container/chat/chat";
import "../lib/css/Everyshare_chatting.css";
import { withRouter } from "react-router-dom";

class EveryShareChat extends Component {
  render() {
    return (
      <div>
        <Chat></Chat>
      </div>
    );
  }
}

export default withRouter(EveryShareChat);
