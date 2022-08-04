import React, { Component } from "react";
import "../lib/css/EveryShare_write.css";
import ModifyRender from "../container/write/ModifyRender";
import ModifyRequest from "../container/write/ModifyRequest";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';

class EveryShareModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "lender", //물품등록유형선택
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const type = query.type;

    var boardType;

    if (type === "1") {
      boardType = "lender";
    } else {
      boardType = "barrower";
    }
    
    this.setState({
      userChecked: boardType,
    });
  }

  render() {
    return (
      <div>
        {this.state.userChecked === "lender" ? (
            <ModifyRender category={this.state.writeCategory} data={this.state.data}></ModifyRender>
          ) : (
            <ModifyRequest category={this.state.writeCategory} data={this.state.data}></ModifyRequest>
          )}
      </div>
    );
  }
}

export default withRouter(EveryShareModify);
