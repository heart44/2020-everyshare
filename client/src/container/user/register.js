import React, { Component } from "react";
import { register, isPassword, isId } from "./userFunction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo_Image from "../../lib/img/common/everyshareLogo.png";
import { Link, withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& label.Mui-focused": {
      color: "#334663",
    },
    "& input:valid:focus + fieldset": {
      borderColor: "#334663",
      borderWidth: 2,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  margin: {
    margin: theme.spacing(1),
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#334663",
    "&:hover": {
      backgroundColor: "#97616C",
      boxShadow: "none",
    },
    width: "100%",
    height: "90px",
    fontSize: "33px",
    borderRadius: "0px",
    boxShadow: "none",
  },
}))(Button);

const AlertMSG = withStyles((theme) => ({
  root: {
    width: "94%",
    flexWrap: "wrap",
    marginLeft: "8px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
}))(Alert);

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      password: "",
      repassword: "",
      phoneNum: "",
      nickName: "",
      isValidId: "",
      isValidPassword: "",
      isMatchPassword: "",
      isDuplicate: "",
      isValidPhoneNum: "",
    };
  }

  //포커스 아웃 이벤트에 의한 이벤트 처리
  onCheckDuplicateID = (e) => {
    e.preventDefault();
    this.isDuplicateID();
  };

  //중복 확인에 따른 Validation 표시
  _idValidationID() {
    if (this.state.isValidId === true && this.state.isDuplicate === false) {
      return (
        <AlertMSG variant="filled" severity="success">
          사용하실 수 있는 아이디 입니다.
        </AlertMSG>
      );
    } else if (
      this.state.isValidId === true &&
      this.state.isDuplicate === true
    ) {
      return (
        <AlertMSG variant="filled" severity="error">
          이미 사용 중인 아이디 입니다.
        </AlertMSG>
      );
    } else if (
      this.state.isValidId === false ||
      this.state.isDuplicate === false
    ) {
      return (
        <AlertMSG variant="filled" severity="error">
          잘못된 아이디 형식 입니다.
        </AlertMSG>
      );
    }
  }
  
  //아이디 중복확인
  isDuplicateID() {
    axios
      .get("http://localhost:3001/users/register", {
        params: {
          id: this.state.userID,
        },
      })
      .then((data) => {
        const STATE = data.data[0].STATE;

        if (STATE === 1) {
          this.setState({ isDuplicate: true });
        } else {
          this.setState({ isDuplicate: false });
        }
        console.log(STATE);
      });
  }

  //아이디 저장 함수
  createId = (e) => {
    const _id = e.target.value;
    this.setState({ userID: _id });
    this.checkValidID(); //함수 실행
    console.log("흠");
  };

  //패스워드 저장 함수
  createPassword = (e) => {
    const _password = e.target.value;
    this.setState({ password: _password });
    this.checkValidPassword(); //함수 실행
  };

  //패스워드 매칭 함수
  repeatPassword = (e) => {
    const _repassword = e.target.value;
    this.setState({ repassword: _repassword });
    this.checkMatchPassword(); //함수 실행
  };

  //전화번호 저장 함수
  createPhoneNumber = (e) => {
    const _phoneNum = e.target.value;
    this.setState({ phoneNum: _phoneNum });
  };

  //아이디 정규식 확인
  checkValidID = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isId(this.state.userID)) {
        this.setState({ isValidId: false });
      } else {
        this.setState({ isValidId: true });
      }
    }, 1000);
  };

  //패스워드 정규식 확인
  checkValidPassword = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isPassword(this.state.password)) {
        this.setState({ isValidPassword: false });
      } else {
        this.setState({ isValidPassword: true });
      }
    }, 500);
  };

  //패스워드 재확인
  checkMatchPassword = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (this.state.password === this.state.repassword) {
        this.setState({ isMatchPassword: true });
      } else {
        this.setState({ isMatchPassword: false });
      }
    }, 500);
  };


  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      userID: this.state.userID,
      password: this.state.password,
      repassword: this.state.repassword,
      phoneNum: this.state.phoneNum,
      nickName: this.state.nickName,
    };

    register(newUser).then((res) => {
      console.log(res);
    });

    this.props.history.push('/');

  };

  render() {
    const { classes } = this.props;

    const coustomStyle = {
      width: "350px",
      paddingLeft: "85px",
    };

    return (
      <div className={classes.root} onSubmit={this.onSubmit}>
        <Container maxWidth="sm">
          <Grid container>
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              p={1}
              alignItems="center"
            >
              <Link to={"/"}>
                <img src={logo_Image} alt="에브리쉐어" style={coustomStyle} />
              </Link>
            </Box>
            <Grid>
              <TextField
                defaultValue={this.state.userID}
                onChange={(e) => this.createId(e)}
                onBlur={(e) => this.onCheckDuplicateID(e)}
                label="아이디"
                style={{ margin: 8 }}
                placeholder="사용하실 아이디를 입력 해 주세요"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <div>{this._idValidationID()}</div>

              <TextField
                defaultValue={this.state.password}
                onChange={(e) => this.createPassword(e)}
                label="비밀번호"
                type="password"
                style={{ margin: 8 }}
                placeholder="사용하실 비밀번호를 입력 해 주세요"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              {this.state.password ? (
                this.state.isValidPassword ? (
                  <AlertMSG variant="filled" severity="success">
                    사용하실 수 있는 비밀번호 입니다.
                  </AlertMSG>
                ) : (
                  <AlertMSG variant="filled" severity="error">
                    사용하실 수 없는 비밀번호 입니다.
                  </AlertMSG>
                )
              ) : null}

              <TextField
                defaultValue={this.state.repassword}
                onChange={(e) => this.repeatPassword(e)}
                label="비밀번호 재확인"
                type="password"
                style={{ margin: 8 }}
                placeholder="사용하실 비밀번호를 다시 한번 입력 해 주세요"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              {this.state.repassword ? (
                this.state.isMatchPassword ? (
                  <AlertMSG variant="filled" severity="success">
                    비밀번호 확인 되었습니다.
                  </AlertMSG>
                ) : (
                  <AlertMSG variant="filled" severity="error">
                    비밀번호가 일치하지 않습니다.
                  </AlertMSG>
                )
              ) : null}

              <TextField
                defaultValue={this.state.phoneNum}
                onChange={(e) => this.createPhoneNumber(e)}
                type="number"
                label="휴대전화 번호"
                style={{ margin: 8 }}
                placeholder="사용하시는 휴대전화 번호를 입력 해 주세요"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <TextField
                defaultValue={this.state.nickName}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ nickName: value });
                }}
                label="닉네임"
                style={{ margin: 8 }}
                placeholder="사용하실 닉네임을 입력 해 주세요"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <ColorButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => this.onSubmit(e)}
                className={classes.margin}
              >
                가입하기
              </ColorButton>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(Register));
