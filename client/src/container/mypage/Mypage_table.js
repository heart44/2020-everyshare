import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import Modal from "./modal";
import { withRouter } from "react-router-dom";
import axios from 'axios'
import {ip} from '../../store/ip'
import moment from "moment";
import { Link } from 'react-router-dom';

class MypageTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      open: false,
      lentAry: [],
      modalTradeNum: 0,
      viewType : 1,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount()  {
    let viewType = this.getQString();
    this.setState({viewType : viewType});
    if(viewType === "1") {this._getList("lend");} // 빌린 것
    if(viewType === "2") {this._getList("request");} // 빌려준 것
  }

  getQString() {
    let viewType = this.props.location.search.split('=')[1]; //파싱
    return viewType;
  }

  _getList(type) {

    axios
      .get(ip+"/contract/"+type, {
        params: {
          userNum:window.sessionStorage.getItem("userNum")
        },
      })
      .then((data) => {
        const tradeDatas = data.data[0];
        
        //state에 tradeDatas 담기
        
        for(let i=0; i<tradeDatas.length; i++)
        {
          const {lentAry} = this.state;  //비구조화 할당
          
          this.setState({
            lentAry : lentAry.concat
            ({
              tradeDate : tradeDatas[i].tradeDate,
              returnDate : tradeDatas[i].returnDate,
              tradeNum : tradeDatas[i].tradeNum,
              owner : tradeDatas[i].owner,
              borrower : tradeDatas[i].borrower,
              guarantee : tradeDatas[i].guarantee,
              totalPrice : tradeDatas[i].totalPrice,
              tradeState : tradeDatas[i].tradeState,
              postNum : tradeDatas[i].postNum,
          }),
        }); // end of setState
        } //end of for

        // console.log(this.state.lentAry)
      });
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

  handleClickOpen = (_tradeNum, event) => {
    // console.log(_tradeNum);
    this.setState({
      modalTradeNum : _tradeNum,
      open: true,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  

  render() {
    const customers = this.state.lentAry;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        customers.length - this.state.page * this.state.rowsPerPage
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
              <TableCell align="center">신청일자</TableCell>
              <TableCell align="center">제품 정보</TableCell>
              <TableCell align="center">가격(보증금)</TableCell>
              <TableCell align="center">반납일자</TableCell>
              <TableCell align="center">거래관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(
                this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
              )
              .map((c, index) => (
                <TableRow key={c.tradeDate}>
                  <TableCell component="th" scope="row" align="center">
                    {moment(c.tradeDate).format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={"/view/"+c.postNum+"?type="+this.state.viewType} style={linkStyle}>
                    원문 바로가기
                    </Link></TableCell>
                  <TableCell align="center">
                    {c.totalPrice}
                    <br />
                    {c.guarantee}
                  </TableCell>
                  <TableCell align="center">
                  {moment(c.returnDate).format("YYYY/MM/DD")}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={this.handleClickOpen.bind(this, c.tradeNum)}
                      size="samll"
                    >
                      바로가기
                    </Button>
                  </TableCell>
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
          count={customers.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Modal
          open={this.handleClickOpen}
          close={this.handleClose}
          modalTradeNum = {this.state.modalTradeNum}
          viewType={this.state.viewType}
          modal={this.state.open}        
        />
      </TableContainer>
    );
  }
}
// export default withRouter(withStyles(useStyles)(MypageTable));
export default withRouter(MypageTable);