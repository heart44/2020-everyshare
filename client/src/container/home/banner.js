import React, { Component } from "react";
import Carousel from "nuka-carousel";
import banner1 from "../../lib/img/common/main_banner1.jpg";
import banner2 from "../../lib/img/common/main_banner3.jpg";
import banner3 from "../../lib/img/common/main_banner2.jpg";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Banner extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      slideIndex: 0,
      autoplay: true,
      wrapAround: true,
    };

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick() {
    this.setState({ underlineHeader: !this.state.underlineHeader });
  }

  render() {
    const style = {
      width: "100%",
      height: "auto",
      borderBottom: "1px solid #CDC9C5",
    };

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={style}>
          <Carousel
            withoutControls={this.state.withoutControls}
            transitionMode={this.state.transitionMode}
            slideIndex={this.state.slideIndex}
            autoplay={this.state.autoplay}
            wrapAround={this.state.wrapAround}
            heightMode={this.state.heightMode}
            renderCenterLeftControls={({ previousSlide }) => (
              <IconButton aria-label="prev" onClick={previousSlide}>
                <ArrowBackIosIcon style={{ fontSize: 30 }} />
              </IconButton>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <IconButton aria-label="next" onClick={nextSlide}>
                <ArrowForwardIosIcon style={{ fontSize: 30 }} />
              </IconButton>
            )}
          >
            <img src={banner2} alt="판매자 사용 설명서" />
            <img src={banner3} alt="블록체인 사용 안전거래" />
            <img src={banner1} alt="사용방법 알아보기" />
          </Carousel>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Banner);
