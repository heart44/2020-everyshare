import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import {ip} from "../../store/ip";

class ModifyRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "lender", //물품등록유형선택
      postCategory: "",
      rentalType: "long",
      boardTitle: "",
      boardContents: "",
      minTerm: "",
      maxTerm: "",
      perPrice: "일(Days)",
      dayPerPrice: 0,
      weekPerPrice: 0,
      monthPerPrice: 0,
      guarantee: "",
      writer: window.sessionStorage.getItem("id"),
      writerNum: window.sessionStorage.getItem("userNum"),
      boardNum: "",
    };
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
    });

    axios
      .get("http://localhost:3001/modify", {
        params: {
          type: type,
          boardNum: boardNum,
        },
      })
      .then((data) => {
        const writeData = data.data[0];

        console.log(writeData)

        this.setState({
          rentalType: writeData.rentalPeriodType,
          postCategory: writeData.productCategory,
          boardTitle: writeData.postTitle,
          boardContents: writeData.postContents,
          minTerm: writeData.minPeriod,
          maxTerm: writeData.maxPeriod,
          dayPerPrice: writeData.pricePerDay,
          weekPerPrice: writeData.pricePerWeek,
          monthPerPrice: writeData.pricePerMonth,
          guarantee: writeData.guarantee,
          boardNum: writeData.postNum,
        });
      });
  };

  //state 셋팅
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      dayPerPrice: this.state.dayPerPrice,
      weekPerPrice: this.state.weekPerPrice,
      monthPerPrice: this.state.monthPerPrice,

      minTerm: this.state.minTerm,
      maxTerm: this.state.maxTerm,
      rentalPeriodType: this.state.rentalType,
      guarantee: this.state.guarantee,
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

    const rentalFee = {
      width: "150px",
      display: "inline-block",
      fontSize: "22px",
      fontWeight: 500,
      marginRight: "8px",
    };

    const style = {
      paddingTop: "60px",
      clear: "both",
      height: "100px",
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
                <label htmlFor="rent_type">
                  물건의 대여 유형을 <br />
                  선택 해 주세요 *
                </label>

                <div className="retal_term">
                  <input
                    type="radio"
                    name="rentalType"
                    id="rent_type_1"
                    value="long"
                    onChange={this.handleChange}
                    checked={this.state.rentalType === "long"}
                  />
                  <label htmlFor="rent_type_1">
                    <b>장기대여</b> <br />
                    <span>(최소 1달 이상)</span>
                  </label>
                  <input
                    type="radio"
                    name="rentalType"
                    id="rent_type_2"
                    value="short"
                    onChange={this.handleChange}
                    checked={this.state.rentalType === "short"}
                  />
                  <label htmlFor="rent_type_2">
                    <b>단기대여</b> <br />
                    <span>(최장 1달 이하)</span>
                  </label>
                  <input
                    type="radio"
                    name="rentalType"
                    id="rent_type_3"
                    value="none"
                    onChange={this.handleChange}
                    checked={this.state.rentalType === "none"}
                  />
                  <label htmlFor="rent_type_3">
                    {" "}
                    <b>구분없음</b> <br />
                    <span>(기간 구분 없음)</span>
                  </label>
                </div>
              </div>

              <div className="proudct_box">
                <label htmlFor="rent_contents">
                  물품 이미지와 <br /> 내용을 <br />
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

                <input
                  type="text"
                  name="minTerm"
                  id="minmax_term"
                  className="minMax_term_input"
                  placeholder="최소기간 입력(1일부터)"
                  value={this.state.minTerm}
                  onChange={this.handleChange}
                />
                <span>/</span>
                <input
                  type="text"
                  name="maxTerm"
                  id="minmax_term"
                  className="minMax_term_input"
                  placeholder="최대기간 입력(365일까지)"
                  value={this.state.maxTerm}
                  onChange={this.handleChange}
                />
              </div>

              <div className="proudct_box">
                <label htmlFor="retalfee_cal">
                  대여비의 계산 방법을 <br /> 입력 해 주세요 * <br /> <br />
                  <span className="title_span">
                    (반드시 1가지 방법 이상) <br />
                  </span>
                  <button className="btn_cacul"></button>
                </label>

                <div className="input_price">
                  <p style={rentalFee}>일(Days) 당, </p>

                  <input
                    type="text"
                    name="dayPerPrice"
                    id="retalfee_cal_txt"
                    value={this.state.dayPerPrice}
                    onChange={this.handleChange}
                  />
                  <p style={textStyle}>원</p>
                  <label htmlFor="retalfee_cal_txt"></label>
                </div>

                <div className="input_price">
                  <p style={rentalFee}>주(Weeks) 당, </p>

                  <input
                    type="text"
                    name="weekPerPrice"
                    id="retalfee_cal_txt"
                    value={this.state.weekPerPrice}
                    onChange={this.handleChange}
                  />
                  <p style={textStyle}>원</p>
                  <label htmlFor="retalfee_cal_txt"></label>
                </div>
                <div className="input_price">
                  <p style={rentalFee}>달(Months) 당, </p>

                  <input
                    type="text"
                    name="monthPerPrice"
                    id="retalfee_cal_txt"
                    value={this.state.monthPerPrice}
                    onChange={this.handleChange}
                    placeholder="0"
                  />
                  <p style={textStyle}>원</p>
                  <label htmlFor="retalfee_cal_txt"></label>
                </div>
              </div>

              <div className="proudct_box">
                <label htmlFor="deposit_cal">
                  보증금을입력 <br />해 주세요 *
                </label>

                <input
                  type="text"
                  style={{ width: "825px" }}
                  id="deposit_cal"
                  name="guarantee"
                  value={this.state.guarantee}
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

export default withRouter(ModifyRender);
