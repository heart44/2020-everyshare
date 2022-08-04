import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {ip} from "../../store/ip"

class ModifyRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "barrower", //물품등록유형선택
      boardTitle: "",
      boardNum: "",
      boardContents: "",
      suggestPrice: "",
      postCategory: "",
      writer: window.sessionStorage.getItem("id"),
      writerNum: window.sessionStorage.getItem("userNum"),
      startDate: new Date(),
      endDate: new Date(),
    };
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
  }

  componentDidMount() {
    this._getList();
  }

  _getList = (e) => {
    const query = queryString.parse(this.props.location.search);
    const boardNum = query.boardNum;
    const type = query.type;

    var boardType;

    if (type === "1") {
      boardType = "lender";
    } else {
      boardType = "barrower";
    }
    this.setState({
      userChecked: boardType,
      boardNum: boardNum,
    });

    axios
      .get(ip+"/modify", {
        params: {
          type: type,
          boardNum: boardNum,
        },
      })
      .then((data) => {
        const writeData = data.data[0];

        console.log(writeData)
        this.setState({
          boardTitle: writeData.postTitle,
          boardContents: writeData.postContents,
          suggestPrice: writeData.suggestPrice,
          postCategory: writeData.productCategory,
          startDate: new Date(writeData.rentalDate),
          endDate: new Date(writeData.returnDate),
        });
      });
  };

  //state 셋팅
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDateStartChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleDateEndChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  //데이터 저장
  handleSubmit = async (e) => {
    e.preventDefault();

    const modify = {
      boardNum: this.state.boardNum,
      userChecked: this.state.userChecked,
      writerNum: this.state.writerNum,
      boardTitle: this.state.boardTitle,

      writeCategory: this.state.postCategory,
      boardContents: this.state.boardContents,
      suggestPrice: this.state.suggestPrice,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      state: "0",
    };

    axios.put(ip+"/modify", { modify }).then((res) => {
      console.log(res);
    });

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
    };

    return (
      <section id="contents_wrap">
        <h2>
          <img src="# " alt="" /> 물품등록
        </h2>
        <form>
          <article className="product_enroll">
            <h3>1단계</h3>
            <div className="proudct_box">
              <label htmlFor="userChecked">
                물품등록 유형을
                <br />
                선택하세요 *
              </label>
              <div className="rent_add">
                <input
                  type="radio"
                  name="userChecked"
                  id="lend"
                  value="lender"
                  onChange={this.handleChange}
                  checked={this.state.userChecked === "lender"}
                />

                <label htmlFor="lend">
                  {" "}
                  <b>물건 빌려드려요</b> <br />
                  <span className="usergroup_txt">
                    {" "}
                    회원님의 집에 방치되어 있는 물건을 <br />
                    필요한 누군가에게 빌리는 유형입니다
                  </span>
                </label>

                <input
                  type="radio"
                  name="userChecked"
                  id="barrow"
                  value="barrower"
                  onChange={this.handleChange}
                  checked={this.state.userChecked === "barrower"}
                />

                <label htmlFor="barrow">
                  {" "}
                  <b>물건 빌려주세요</b> <br />
                  <span className="usergroup_txt">
                    {" "}
                    필요하지만 구매는 고민이 되는 물건을 <br />
                    누군가에게 빌리는 유형입니다
                  </span>
                </label>
              </div>
            </div>

            <div className="proudct_box">
              <label>
                카테고리를 <br />
                선택해주세요 *
              </label>
              <select
                id="select_category"
                name="writeCategory"
                value={this.state.writeCategory}
                onChange={this.handleChange}
              >
                <option>디지털/가전</option>
                <option>유아동</option>
                <option>생활용품</option>
                <option>의류/잡화</option>
                <option>스포츠/레저</option>
                <option>도서/취미</option>
                <option>기타용품</option>
              </select>
            </div>
          </article>

          <div className="clear"></div>
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
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                <p style={textStyle}>원</p>
              </div>
            </article>
            <button
              type="submit"
              name="btnWriteResult"
              id="btn_write_result"
              onClick={this.handleSubmit}
            >
              수정하기
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(ModifyRequest);
