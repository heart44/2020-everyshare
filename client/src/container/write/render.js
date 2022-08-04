import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { storage } from "../../firebase";
import axios from "axios";
import { ip } from "../../store/ip";

class render extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChecked: "lender", //물품등록유형선택
      rentalType: "long",
      boardTitle: "",
      boardContents: "",
      minTerm: "",
      maxTerm: "",
      tempPerPrice: "",
      perPrice: "일(Days)",
      dayPerPrice: 0,
      weekPerPrice: 0,
      monthPerPrice: 0,
      guarantee: "",
      writer: window.sessionStorage.getItem("id"),
      writerNum: window.sessionStorage.getItem("userNum"),
      imgAry: [],
      date: new Date(),
      postNum: "",
      isImg: false,
    };
  }

  //state 셋팅
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //이미지 리스트
  handleImageList = (imageList) => {
    this.setState({
      imgAry: imageList,
      isImg: true,
    });
  };

  //데이터 저장
  handleSubmit = async (e) => {
    e.preventDefault();

    let postNum;

    const write = {
      userChecked: this.state.userChecked,
      writerNum: this.state.writerNum,
      boardTitle: this.state.boardTitle,

      writeCategory: this.props.category,
      boardContents: this.state.boardContents,
      dayPerPrice: this.state.dayPerPrice,
      weekPerPrice: this.state.weekPerPrice,
      monthPerPrice: this.state.monthPerPrice,

      minTerm: this.state.minTerm,
      maxTerm: this.state.maxTerm,
      rentalPeriodType: this.state.rentalType,
      guarantee: this.state.guarantee,
      state: "0",
    };

    axios.post(ip + "/board/write", { write }).then((res) => {
      console.log(res);
      axios
        .get(ip + "/board/write", {
          params: {
            userChecked: this.state.userChecked,
            writerNum: this.state.writerNum,
            writeCategory: this.state.writeCategory,
          },
        })
        .then((res) => {
          postNum = res.data[0].postNum;
        })
        .then(() => {
          if(this.state.isImg === true) {
            this.handleUpload(postNum);
          }     
        });
    });

    this.props.history.push({
      pathname: "/",
    });
  };

  handleChangeVale = (e) => {
    this.setState(
      {
        tempPerPrice: e.target.value,
      },
      () => {
        if (this.state.perPrice === "달(Months)") {
          this.setState(
            {
              monthPerPrice: this.state.tempPerPrice,
            },
            () => {}
          );
        } else if (this.state.perPrice === "주(Weeks)") {
          this.setState(
            {
              weekPerPrice: this.state.tempPerPrice,
            },
            () => {}
          );
        } else {
          this.setState(
            {
              dayPerPrice: this.state.tempPerPrice,
            },
            () => {}
          );
        }
      }
    );
  };

  handleUpload = (postNum) => {
    //게시판 타입과 게시글 id 받아와야함 일단 하드코딩.
    let boardType = this.state.userChecked; // 게시판 타입 판매 게시판 or 구매게시판
    let boardNum = postNum; // 게시글 id
    let nowTime = this.state.date.toLocaleTimeString();

    const imgArray = this.state.imgAry.imgAry;

    imgArray.forEach((file) => {
      //저장되는 이미지의 경로는 images/게시판타입/게시글/파일명_현재시간
      //예를들어 images/lend/1/푸른하늘.JPG_오후 11:56:06
      let route =
        "images/" +
        boardType +
        "/" +
        boardNum +
        "/" +
        file.name +
        "_" +
        nowTime;

      const uploadTask = storage.ref(route).put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          // 이미지 url 다운로드
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              axios
                .post(ip + "/board/upload", {
                  downloadURL,
                  boardNum,
                })
                .then((res) => {
                  console.log(res);
                });
            })
            .then((res) => {
              console.log(res);
            });
        }
      );
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

    return (
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

            <ImageUpload handleImageList={this.handleImageList} />
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

            <div className="input_price ">
              <select
                id="retalfee_cal"
                name="perPrice"
                value={this.state.perPrice}
                onChange={this.handleChange}
              >
                <option>일(Days)</option>
                <option>주(Weeks)</option>
                <option>달(Months)</option>
              </select>

              <p style={textStyle}>당, </p>

              <input
                type="text"
                name="tempPerPrice"
                id="retalfee_cal_txt"
                value={this.state.tempPerPrice}
                onChange={this.handleChangeVale}
              />
              <p style={textStyle}>ETH</p>
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

            <p style={textStyle}>ETH</p>
          </div>
        </article>
        <button
          type="submit"
          name="btnWriteResult"
          id="btn_write_result"
          onClick={this.handleSubmit}
        >
          물품 등록하기
        </button>
      </div>
    );
  }
}

export default withRouter(render);
