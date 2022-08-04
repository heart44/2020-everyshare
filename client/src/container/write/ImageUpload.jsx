import React, { Component } from "react";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgCnt: 0, //이미지 개수
      imgAry: [], //이미지들의 리스트
      imgBase64Ary: [], //미리보기를 위한 배열
      date: new Date(), //현재시간
      urlAry: [], //다운받은 url의 리스트 *사용안함 DB에 넣어야 함
    };
  }

  handleImageList = (e) => {

    const imageList = {
      imgAry: this.state.imgAry,
    };

    this.props.handleImageList(imageList);
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      
      //Ary 초기화
      this.setState({
        imgAry: [],
        imgBase64Ary: [],
      });

      let cnt = e.target.files.length;

      //setstate가 비동기 처리라서 부린 꼼수, 리액트 역겹다.
      var tmpList = [];
      for (let i = 0; i < cnt; i++) {
        tmpList = tmpList.concat(e.target.files[i]);
      }

      this.setState(
        {
          imgAry: tmpList, //파일 업데이트, imgAry는 실제 업로드를 위한 파일객체의 리스트임.
          imgCnt : tmpList.length,
        },
        () => console.log(this.state.imgAry,"카운트",this.state.imgCnt)
      );

      for (let i = 0; i < cnt; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); //파일 읽어 버퍼에 저장, 이 코드 실행시 onloadend 트리거 작동함.

        //미리보기를 위한 함수
        reader.onloadend = (e) => {
          let base64 = reader.result;
          if (base64) {
            this.setState({
              imgBase64Ary: this.state.imgBase64Ary.concat(base64.toString()),
            })

            this.handleImageList();
          }
        };
      }
    }
    
  };

  render() {

    const imageBoxStyle = {
      width: "151px",
      height: "151px",
      display: "inline-block",
      border: "1px solid #e4e4e4",
      overflow: "hidden",
    
    };

    const imageStyle = {
      resize: "both",
      float: "center",
      maxWidth: "151px",
      height: "auto",
      
    };

    const imageWrap = {
      width: "835px",
      height: "auto",
      marginTop: "30px",
      marginRight: "137px",
      float: "right",
    };

    return (
      <div>
        <div className="write_contents">
          <label htmlFor="add_file">사진등록</label>
          <input
            type="file"
            multiple="multiple"
            id="add_file"
            onChange={this.handleChange}
          />
        </div>

        <div className="imageUploadBox" style={imageWrap}>
          {this.state.imgBase64Ary.map((img, index) => (
            <div key={index} style={imageBoxStyle}>
              <img
                src={img}
                height="300"
                width="400"
                alt="미리보기"
                style={imageStyle}
              />
            </div>
          ))}

          {/* DB에서 URL들 꺼내 온 뒤 반복 */}
          {/* <img src={url|| 'http://via.placeholder.com/400x300'} height="300" width="400" alt="미리보기" /> */}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
