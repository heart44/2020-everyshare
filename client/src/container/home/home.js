import React, { Component } from "react";
import "../../lib/css/main.css";
import MainBanner from "./banner";
import CardItem from "./cardItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import {ip} from "../../store/ip"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
      imageList: [],
    };
  }


  componentDidMount() {
    this.getList();
  }

  getList = () => {
    axios
      .get(ip)
      .then((res) => {
        const boarList = res.data;
        return boarList;
      })
      .then((boarList) => {
        const board = boarList;

        axios
          .get(ip+"/main")
          .then((res) => {
            const imgData = res.data;

            board.forEach((boardItem) => {
              imgData.forEach((imgItem) => {
                if (imgItem.postNum === boardItem.postNum) {
                  var temp1 = Object.assign(imgItem, boardItem);
                  this.setState({
                    boardList: this.state.boardList.concat(temp1),
                  });
                }
              });
            });
            return board;
          })
          .then((board) => {
            //
            //console.log(this.state.boardList)
            const id = this.state.boardList.map((it) => it.postNum);

            var filteredArray = board.filter(function (itm) {
              return id.indexOf(itm.postNum) > -1;
            });

            filteredArray.forEach(item =>{
              item.fileURL = "https://firebasestorage.googleapis.com/v0/b/react-everyshare-app.appspot.com/o/view_no_image.png?alt=media&token=861fe0ad-c8a7-4144-a0fa-9d6be9257c7f"
            })
              
            this.setState({
              boardList: this.state.boardList.concat(filteredArray),
            });
          });
      });
  };

  render() {
    const style = {
      width: "80%",
      margin: "0 auto",
    };

    const sectionStyle = {
      width: "100%",
      padding: "30px",
    };

    const list = this.state.boardList;

    return (
      <div>
        <MainBanner />
        <section style={sectionStyle}>
          <div style={style}>
            <Carousel
              additionalTransfrom={0}
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1280,
                  },
                  items: 4,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1280,
                    min: 464,
                  },
                  items: 3,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {list.map((row, index) => (
                <CardItem row={row} key={index}></CardItem>
              ))}
            </Carousel>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
