import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Render from "./render";
import Request from "./request";

class WriteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "lender", //물품등록유형선택
      writeCategory: "디지털/가전", //카테고리 선택
    };
  }

  //state 셋팅
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {

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
          {this.state.userChecked === "lender" ? (
            <Render category={this.state.writeCategory}></Render>
          ) : (
            <Request category={this.state.writeCategory}></Request>
          )}
        </form>
      </section>
    );
  }
}

export default withRouter(WriteForm);
