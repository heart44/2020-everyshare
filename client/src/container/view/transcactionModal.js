import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import {ip} from "../../store/ip"

const action = (
  <Button color="secondary" size="small">
    닫기
  </Button>
);

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
  button: {
    margin: theme.spacing(1),
  },
});

class TranscactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snack: false,
      tradeDate: new Date(),
      returnDate: new Date(),
      duration: 0,
      data: [],
      pricePerDay: 0,
      totalPrice: 0,
      borrower: window.sessionStorage.getItem("userNum"),
      owner: "",
      borrowerNick: window.sessionStorage.getItem("nickName"),
      dataOpen: false,
    };
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  setClose = () => {
    this.setState({
      snack: false,
    });
  };

  handleDateStartChange = (date) => {
    this.setState({
      tradeDate: date,
    });
  };

  handleDateEndChange = (date) => {
    var days = moment(date).diff(this.state.tradeDate, "days");

    console.log(this.props.data);
    if (days === 0) {
      this.setState({
        snack: true,
      });
    } else {
      this.setState({
        pricePerDay: this.props.data.pricePerDay,
        returnDate: date,
        duration: days,
        totalPrice: this.props.data.pricePerDay * days,
        owner: this.props.data.postWriterNum,
        data: this.props.data,
        dataOpen: true,
      });
    }
  };

  handleSubmit = () => {
    const newContract = {
      postNum: this.state.data.postNum,
      borrower: this.state.borrower,
      owner: this.state.owner,
      tradeDate: this.state.tradeDate,
      duration: this.state.duration,
      returnDate: this.state.returnDate,
      totalPrice: this.state.totalPrice,
      guarantee: this.state.data.guarantee,
      tradeState: 0,
    };
    
    const info = {
      postNum :this.state.data.postNum,
      state : 1,
    };

    axios
      .post(ip+"/contract", { newContract })
      .then((res) => {
        console.log(res);
        axios
          .put(ip+"/contract", { info })
          .then((res) => {
            console.log(res);
            this.props.history.goBack();
          });
      });
  };

  render() {
    const { classes } = this.props;
    const arrowStyle = {
      boxSizing: "border-box",
      paddingTop: "9px",
    };
    const padding = {
      padding: "20px",
    };

    const padding1 = {
      padding: "10px",
    };

    const fontColor1 = {
      color: "#F67280",
    };
    const fontColor2 = {
      color: "#45ADA8",
    };

    return (
      <div className="buttonWrap">
        <button type="button" onClick={this.handleOpen} className="tranButton">
          대여신청
          <ArrowForwardIosIcon fontSize="small" style={arrowStyle} />
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <Grid
                container
                direction="row-reverse"
                justify="center"
                alignItems="center"
              >
                <h4 style={padding}>대여 신청 정보 확인</h4>
              </Grid>
              <Divider />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="대여를 시작하는 날짜"
                    value={this.state.tradeDate}
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
                    value={this.state.returnDate}
                    onChange={this.handleDateEndChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              {this.state.snack ? (
                <SnackbarContent
                  message="총 대여일 수를 다시 확인 해 주세요"
                  action={action}
                  onClick={this.setClose}
                />
              ) : null}

              {this.state.dataOpen ? (
                <div>
                  <Grid
                    container
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                  >
                    <h6 style={padding1}>
                      해당 물건을{" "}
                      <span style={fontColor1}>{this.state.duration}</span>일
                      동안{" "}
                      <span style={fontColor2}>{this.state.totalPrice}</span>ETH
                      지출하여 대여를 신청합니다.
                    </h6>
                  </Grid>
                  <Divider />

                  <Grid
                    container
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                    style={padding1}
                  >
                    계약자 : {this.state.data.nickName} / 본인 :{" "}
                    {this.state.borrowerNick}
                  </Grid>
                  <Divider />
                  <Grid
                    container
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      size="large"
                      onClick={this.handleSubmit}
                    >
                      대여신청하기
                    </Button>
                  </Grid>
                </div>
              ) : null}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
export default withRouter(withStyles(useStyles)(TranscactionModal));
