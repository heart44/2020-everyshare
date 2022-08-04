import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {ip} from "../../store/ip"

class request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "request", //물품등록유형선택
      boardTitle: "",
      boardContents: "",
      suggestPrice: "",
      writer: window.sessionStorage.getItem("id"),
      writerNum: window.sessionStorage.getItem("userNum"),
      startDate: new Date(),
      endDate: new Date(),
    };
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
  }

  //state 셋팅
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDateStartChange = (date) => {
    this.setState({
        startDate: date
    });
  };
  
  handleDateEndChange = (date) => {
    this.setState({
        endDate: date
    });
  };

  //데이터 저장
  handleSubmit = async (e) => {
    e.preventDefault();

    const write = {
      userChecked: this.state.userChecked,
      writerNum: this.state.writerNum,
      boardTitle: this.state.boardTitle,

      writeCategory: this.props.category,
      boardContents: this.state.boardContents,
      suggestPrice: this.state.suggestPrice,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      state: "0",
    };

    axios.post(ip+"/board/write", { write }).then((res) => {
      console.log(res);
    });

    // 상태 초기화
    this.setState = {
      userChecked: "lender", //물품등록유형선택
      writeCategory: "디지털/가전", //카테고리 선택
      rentalType: "long",
      boardTitle: "",
      boardContents: "",
      minTerm: "",
      maxTerm: "",
      perPrice: "일(Days)",
      tempPerPrice: "",
      dayPerPrice: "",
      weekPerPrice: "",
      monthPerPrice: "",
      guarantee: "",
    };

    this.props.history.push({
      pathname: "/",
    });
  };

  render() {
    const textStyle = {
      display: "inline-block",
      fontSize: "22px",
      fontWeight: 100,
      marginRight: "8px",
    };

    const style = {
      paddingTop: "60px",
      clear: "both",
      height: "100px",
    };

    const dateStyle = {
        width: "800px",
        float: "left",
        height: "50px",
    }

    return (
      <div>
        <article className="product_enroll">
          <h3>2단계</h3>
          <div className="proudct_box">
            <label htmlFor="rent_contents">
              제목과
              <br /> 내용을 <br />
              등록 해 주세요 *
            </label>
            <input
              type="text"
              id="board_title"
              name="boardTitle"
              value={this.state.boardTitle}
              onChange={this.handleChange}
            />

            <textarea
              name="boardContents"
              id="rent_contents"
              value={this.state.boardContents}
              onChange={this.handleChange.bind(this)}
              cols="116"
              rows="3"
            />
          </div>

          <div className="proudct_box" style={style}>
            <label htmlFor="minmax_term">
              최소/최대 대여 기간을 <br /> 입력 해 주세요 * <br /> <br />
              <span className="title_span">
                (최소 대여기간 1일, <br /> 최대 대여기간 365일)
              </span>
            </label>

            <div style={dateStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="대여를 시작하는 날짜"
                  value={this.state.startDate}
                  onChange={this.handleDateStartChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                 <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="대여를 끝내는 날짜"
                  value={this.state.endDate}
                  onChange={this.handleDateEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="proudct_box">
            <label htmlFor="deposit_cal">
              제안 할 금액을 <br />
              입력 해 주세요 *
            </label>

            <input
              type="text"
              style={{ width: "825px" }}
              id="deposit_cal"
              name="suggestPrice"
              value={this.state.suggestPrice}
              onChange={this.handleChange}
              placeholder="0"
            />

            <p style={textStyle}>ETH</p>
          </div>
        </article>
        <button
          type="submit"
          name="btnWriteResult"
          id="btn_write_result"
          onClick={this.handleSubmit}
        >
          대여 요청하기
        </button>
      </div>
    );
  }
}

export default withRouter(request);
