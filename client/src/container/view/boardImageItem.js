import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import {ip} from "../../store/ip"

class ViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
    };
  }

  componentDidMount = () => {
    this.getImageList();
  };

  getImageList = () => {
    var temp = this.props.boardNumber;
    const boardNum = temp.split("/")[2];

    axios
      .get(ip+"/view/image", {
        params: {
          boardNum: boardNum,
        },
      })
      .then((data) => {
        const imgList = data.data;

        const ary = imgList.map((imgList, i) => ({
          original: imgList.fileURL,
          thumbnail: imgList.fileURL,
        }));

        var cnt = ary.length + 1;

        for (var i = cnt; i <= 5; i++) {
         var tempData = ({
            original:
              "https://firebasestorage.googleapis.com/v0/b/react-everyshare-app.appspot.com/o/view_no_image.png?alt=media&token=861fe0ad-c8a7-4144-a0fa-9d6be9257c7f",
            thumbnail:
              "https://firebasestorage.googleapis.com/v0/b/react-everyshare-app.appspot.com/o/view_no_image.png?alt=media&token=861fe0ad-c8a7-4144-a0fa-9d6be9257c7f",
          });
          ary.push(tempData);
        }

     
        console.log(ary)

        this.setState({
          imageList: ary,
        }, () => {
          console.log(this.state.imageList);
        });
      });
  };

  setImageList = () => {};

  render() {
    return (
      <div>
        <ImageGallery items={this.state.imageList} autoPlay={true} />
      </div>
    );
  }
}
export default ViewItem;
