import React, { Component } from "react";
import "../lib/css/EveryShare_boardlist.css";
import BoardList from "../container/list/boardList";
import { withRouter } from "react-router-dom";

class EveryShareList extends Component {
  render() {
    return (
      
      <section id="main_contents">
        <div id="contents_wrap">
          <BoardList></BoardList>
        </div>
      </section>
    );
  }
}

export default withRouter(EveryShareList);
