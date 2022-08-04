import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';
import {ip} from "../../store/ip"

class listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      id: window.sessionStorage.getItem('userNum'),
      allBoardData: [],
      currentBoardData: [],
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 5),
      page: 0,
    });
  };

  _getList() {
    const id = window.sessionStorage.getItem('userNum');
    console.log(id);

    if (this.props.location.pathname.split("/")[2] === "write") {
      axios.get(ip + "/users/write", {
        params: {
          id: id,
        },
      })
        .then((data) => {
          const allWriteDatas = data.data;

          console.log(allWriteDatas);
          this.setState({
            allBoardData: allWriteDatas,

          });
        });
    } else if (this.props.location.pathname.split("/")[2] === "comment") {
      axios.get(ip+"/users/comment", {
        params: {
          id: id,
        },
      })
        .then((data) => {
          const allWriteDatas = data.data;

          console.log(allWriteDatas);
          this.setState({
            allBoardData: allWriteDatas,

          });
        });
    }
  }

  componentDidMount = () => {
    this._getList();
  };

  _setPost(postNum, postType) {
    const boardNum = postNum;
    const type = postType;
    if (this.props.location.pathname.split("/")[2] === "write") {
      axios.delete(ip+"/users/item", {
        params: {
          boardNum: boardNum,
          type: type,
        },
      });
      this._getList();
    }

    this._getList();
  };

  selectType(postType) {

    if (postType === 1) {
      return "[대여]";
    } else {
      return "[요청]";
    }
  }

  selectRowType(rowType) {
    if (rowType === "write") {
      return "제목";
    } else {
      return "내용(원문)";
    }
  }

  render() {
    let currentBoardList = this.state.allBoardData;
    let rowType = this.props.location.pathname.split("/")[2];

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        currentBoardList.length - this.state.page * this.state.rowsPerPage
      );

      const linkStyle = {
        color: '#000',
        fontWeight: 'bold',
    };

    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">거래유형</TableCell>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="center">글쓴이</TableCell>
              <TableCell align="center">{this.selectRowType(rowType)}</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBoardList
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((c, index) => (
                <TableRow row={c} key={index}>
                  <TableCell component="th" scope="row" align="center">
                    {this.selectType(c.type)}
                  </TableCell>
                  <TableCell align="center">{c.productCategory}</TableCell>
                  <TableCell align="center">{c.nickname}</TableCell>
                  {rowType === "write" ?  
                  <TableCell align="center">
                    <Link to={"/view/"+c.postNum+"?type="+c.type} style={linkStyle}>
                      {c.postTitle}
                    </Link></TableCell> :
                  <TableCell align="center">
                    <Link to={"/view/"+c.postNum+"?type="+c.type}style={linkStyle}>
                      {c.commentContents}<br />({c.postTitle})
                    </Link></TableCell>}
                  {rowType === "write" ?  
                  <TableCell align="center">
                    {moment(c.postDate).format("YYYY/MM/DD")}
                  </TableCell> : <TableCell align="center">
                    {moment(c.commentDate).format("YYYY/MM/DD")}
                  </TableCell>}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="default"
                      onClick={() => this._setPost(c.postNum, c.type)}>
                      <DeleteIcon />
                    </Button></TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={currentBoardList.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  }
}
export default withRouter(listItem);