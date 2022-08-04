import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class BoardItem extends Component {

  selectType(postType) {
    if (postType === 1) {
      return "[대여]";
    } else {
      return "[요청]";
    }
  }

  TransactionStatus(state) {
    if (state === "2") {
      return <div style={{ color: "#1D1D1D" }}>거래완료</div>;
    } else if (state === "1") {
      return <div style={{ color: "#334663" }}>거래중</div>;
    } else {
      return <div style={{ color: "#C10000" }}>거래대기</div>;
    }
  }

  render() {
    let coustomStyle =
      this.props.row.state === "2"
        ? {
            color: "#9E9E9E",
            background: "#E4E4E4",
            textDecoration: "line-through",
          }
        : {};
    let coustomStyl2 =
      this.props.row.type === 1 ? { color: "#97616C" } : { color: "#334663" };

    const url = '/view/' + this.props.row.postNum + '?type=' + this.props.row.type;
    
    return (
      <div className="boardList_contents" style={coustomStyle}>
        <div className="board_type" style={coustomStyl2}>
          {this.selectType(this.props.row.type)}
        </div>
        <div className="user_info">
          <div className="profil_box"></div>
          <div className="user_info_text">
            {this.props.row.nickName} <br />
            <span>@{this.props.row.userID}</span>
          </div>
        </div>
        {window.sessionStorage.getItem("userNum") !== null ? (
          <div>
          <Link to={url}> {this.props.row.postTitle}</Link>
          </div>
        ) : (
          <div>
          <Link to='/login'> {this.props.row.postTitle}</Link>
          </div>
        )}
        <div>{moment(this.props.row.postDate).format("YYYY/MM/DD")}</div>
        {this.TransactionStatus(this.props.row.state)}
      </div>
    );
  }
}

export default BoardItem;
