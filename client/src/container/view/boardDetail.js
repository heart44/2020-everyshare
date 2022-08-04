import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CommentItem from "./commentItem";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import queryString from "query-string";
import {ip} from "../../store/ip"


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  comment: {
    width:"90%",
    fontSize:"18px",
    padding:"10px",
    boxSizing:"border-box",
    marginBottom:"15px",
  },
  button: {
    width: "9%",
    height:"87px",
    float:"right",
  },
});

class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      comment: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const boardNum = this.props.data.postNum;
    const query = queryString.parse(this.props.location.search);
    const userNum = window.sessionStorage.getItem("userNum");
    
    const comment = {
      boardNum: boardNum,
      postType: query.type,
      userNum: userNum,
      commentContents: this.state.comment,
      state: 0,
    };

    console.log(comment)

    axios.post(ip+"/view/comment", { comment }).then((res) => {
      console.log(res);
      this.props.stateRefresh();
    })
    
  };
  
  handleChange = (e, newValue) => {
    e.preventDefault();
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;

    const boxStyle = {
      width: "100%",
      background: "#e0e0e0",
      padding: "20px",
      boxSizing: "border-box",
    };

    const marginStyle = {
      marginBottom: "5px",
      boxSizing: "border-box",
    };

    const postStyle = {
      marginTop : "20px",
      marginLeft : "20px",
      fontSize : "20px",
    }

    let commentData = this.props.commentData;
    const postNum = this.state.boardNum;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            variant="fullWidth"
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="nav tabs example"
          >
            <LinkTab label="상세보기" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="댓글보기" href="/trash" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>

          <div style={boxStyle}>
            <h3>기본 거래 정보</h3>
            <Divider style={marginStyle} />
            <b>게시물 등록일 :</b>{" "}
            {moment(this.props.data.postDate).format("YYYY. MM. DD")}
            <Divider style={marginStyle} />
            <b>최소 대여 날짜 :</b> {this.props.data.minPeriod} 일
            <Divider style={marginStyle} />
            <b>최대 대여 날짜 :</b> {this.props.data.maxPeriod} 일
          </div>

          <div style={postStyle}>
            {this.props.data.postContents}
          </div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        <TextareaAutosize className={classes.comment} aria-label="minimum height" 
        rowsMin={3} placeholder="댓글을 입력하세요" onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ comment: value });}} /
                  >
        <Button className={classes.button} variant="outlined" onClick={(e) => this.onSubmit(e)}>
          댓글등록
        </Button>
        
        {commentData.map((row, index) => (
            <CommentItem row={row} key={index} boardNumber={postNum}></CommentItem>
          ))}
        </TabPanel>
      </div>
    );
  }
}
export default withRouter(withStyles(useStyles)(BoardDetail));
