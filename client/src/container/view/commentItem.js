import React, { Component } from "react";
import moment from "moment";
import CloseIcon from '@material-ui/icons/Close';

class commentItem extends Component {
  

  render() {
    const rel = {position:"relative",}
    const style = {position: "absolute", right:0, top:25,}
    return (
      <div className="commentsBox">
        <div className="commentProfileBox">
          <div className="commentProfileImg"></div>
          <p>{this.props.row.nickName}</p>
          <p>({this.props.row.userID})</p>
        </div>

        <div className="commentsContents" style={rel}>
          <p>{moment(this.props.row.commentDate).format("YYYY.MM.DD")}</p>
          <p>
          {this.props.row.commentContents}
          </p>
          {console.log(window.sessionStorage.getItem("id"))}
          {window.sessionStorage.getItem("id") ===
           this.props.row.userID ? (
            <CloseIcon style={style} onclicK/>
           ) : null}
        </div>
      </div>
    );
  }
}

export default commentItem;
