import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import BoardTab from "./boardDetail";
import ViewItem from "./boardImageItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CreateIcon from "@material-ui/icons/Create";
import Modal from "./transcactionModal"
import {ip} from "../../store/ip"


const useStyles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
});



class BoardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      postComment: [],
      postWriterNum: "",
      postWriterNickName: "",
      postTitle: "",
      postDate: "",
      productCategory: "",
      postContents: "",
      pricePerDay: "",
      pricePerWeek: "",
      pricePerMonth: "",
      minPeriod: "",
      maxPeriod: "",
      rentalPeriodType: "",
      guarantee: "",
      isShow: false,
    };
  }

  componentDidMount = () => {
    this._getList();
    this._getComment();
  };

  _getList() {
    const boardNum = this.props.location.pathname;
    const query = queryString.parse(this.props.location.search);

    axios
      .get(ip+"/view", {
        params: {
          boardNum: boardNum.split("/")[2],
          type: query.type,
        },
      })
      .then((data) => {
        const postData = data.data;
        this.setState({
          postData: postData[0],
          postWriterNum: postData[0].postWriterNum,
          postWriterNickName: postData[0].nickName,
          postTitle: postData[0].postTitle,
          postDate: postData[0].postDate,
          productCategory: postData[0].productCategory,
          postContents: postData[0].postContents,
          pricePerDay: postData[0].pricePerDay,
          pricePerWeek: postData[0].pricePerWeek,
          pricePerMonth: postData[0].pricePerMonth,
          minPeriod: postData[0].minPeriod,
          maxPeriod: postData[0].maxPeriod,
          rentalPeriodType: postData[0].rentalPeriodType,
          guarantee: postData[0].guarantee,
        });
      });
  }

  stateRefresh = () => {
    this._getComment();
  };

  _getComment() {
    const boardNum = this.props.location.pathname;
    const query = queryString.parse(this.props.location.search);

    axios
      .get(ip+"/view/comment", {
        params: {
          boardNum: boardNum.split("/")[2],
          type: query.type,
        },
      })
      .then((data) => {
        const postData = data.data;

        this.setState({
          postComment: postData,
        });
      });
  }

  _setPost = () => {
    const boardNum = this.props.location.pathname;
    const query = queryString.parse(this.props.location.search);

    axios.delete(ip+"/view", {
      params: {
        boardNum: boardNum.split("/")[2],
        type: query.type,
      },
    });
  };

  navigateBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;
    const iconStyle = {
      marginBottom: "20px",
    };
    const data = this.state.postData;
    const commentData = this.state.postComment;

    const boardNum = this.props.location.pathname;
    const query = queryString.parse(this.props.location.search);
  
    const url = '/modify?boardNum=' + boardNum.split("/")[2] + '&type=' + query.type;

    return (
      <section id="main_contents">
        {window.sessionStorage.getItem("userNum").toString() ===
        this.state.postWriterNum.toString() ? (
          <div style={iconStyle}>
            <Link to="/">
              <Button
                variant="outlined"
                color="default"
                className={classes.button}
                startIcon={<FormatListBulletedIcon />}
                onClick={this.navigateBack}
              >
                목록으로
              </Button>
            </Link>
            <Link to={url}>
            <Button
              variant="outlined"
              color="default"
              className={classes.button}
              startIcon={<CreateIcon />}
            >
              글 수정
            </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outlined"
                color="default"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={this._setPost}
              >
                글 삭제
              </Button>
            </Link>
          </div>
        ) : (
          <div style={iconStyle}>

            <Button
              variant="outlined"
              color="default"
              className={classes.button}
              startIcon={<FormatListBulletedIcon />}
              onClick={this.navigateBack}
            >
              목록으로
            </Button>
          </div>
        )}

        <div id="contents_wrap">
          <div className="top_contents">
            <div className="image_box_wrap">
              <ViewItem boardNumber={boardNum}/>
            </div>
            <div className="contents_box">
              <p className="categoryTitle">{this.state.productCategory}</p>
              <h5>{this.state.postTitle}</h5>
              <div className="profile">
                <div className="profileImg"></div>
                <div className="profileInfo">
                  <p>{this.state.postWriterNickName}</p>
                  <Modal data={data}></Modal>
                </div>
              </div>
              <div className="termPrice">
                <p>기간 별 비용</p>
                <div className="termPriceBox">
                  <p>
                    1일 당<span>{this.state.pricePerDay} ETH</span>
                  </p>
                  <p>
                    1주 당<span>{this.state.pricePerWeek} ETH</span>
                  </p>
                  <p>
                    1달 당<span>{this.state.pricePerMonth} ETH</span>
                  </p>
                </div>
              </div>
              <div className="termPrice">
                <p>보증금</p>
                <div className="termPriceBox">
                  <p>{this.state.guarantee} ETH</p>
                </div>
              </div>
              <div className="resultPrice">
                <p>총 대여기준 (보증금 포함)</p>
                <p>
                  {parseFloat(this.state.pricePerDay) +
                    parseFloat(this.state.guarantee)}
                  <span>ETH</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bottom_contents">
            <BoardTab
              data={data}
              commentData={commentData}
              stateRefresh={this.stateRefresh}
            ></BoardTab>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(withStyles(useStyles)(BoardView));
