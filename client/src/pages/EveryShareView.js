import React, { Component } from 'react';
import BoardView from "../container/view/boardView";
import "../lib/css/EveryShare_view.css";
import "../lib/css/EveryShare_comments.css";
import { withRouter } from "react-router-dom";

class EveryShareView extends Component {
  
  render() {
    return (   
      <section id="main_contents">
        <div id="contents_wrap">
          <BoardView></BoardView>
        </div>
      </section>
      
    );
  } 
}

export default withRouter(EveryShareView);
 