import React, { Component } from "react";
import {
  updatePssword,
  updatePhone,
  updateNick,
  isPassword,
  isId,
} from "./userModifyFunction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";

const ExpansionPanel = withStyles({
  root: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

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

const AlertMSG = withStyles((theme) => ({
  root: {
    width: "100%",
    flexWrap: "wrap",
    marginLeft: "8px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
}))(Alert);

class UserInfoEdit extends Component {
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
      expanded: "",
      panel: true,
    };
  }

  handleChange = (panel) => (event, newExpanded) => {
    this.setState({
      expanded: panel,
    });
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

  //비밀번호 변경
  onUpdatePwd = (e) => {
    e.preventDefault();

    const info = {
      info : this.state.password,
      id : window.sessionStorage.getItem('id')
    }

    updatePssword(info).then((res) => {});
  };

  //폰번호 변경
  onUpdatePhone = (e) => {
    e.preventDefault();
    const info = {
      info : this.state.phoneNum,
      id : window.sessionStorage.getItem('id')
    }

    updatePhone(info).then((res) => {});
  };

  //닉네임 변경
  onUpdateNick = (e) => {
    e.preventDefault();
    const info = {
      info : this.state.nickName,
      id : window.sessionStorage.getItem('id')
    }
    updateNick(info).then((res) => {});
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          square
          expanded={this.state.expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>비밀번호 변경하기</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block", margin: 8 }}>
            <TextField
              defaultValue={this.state.password}
              onChange={(e) => this.createPassword(e)}
              label="비밀번호"
              type="password"
              style={{ display: "block", margin: 8 }}
              placeholder="변경하실 비밀번호를 입력 해 주세요"
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
              placeholder="변경하실 비밀번호를 다시 한번 입력 해 주세요"
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
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={this.onUpdatePwd}>
              비밀번호 변경하기
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={this.state.expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>휴대전화 번호 변경하기</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={this.onUpdatePhone}>
              휴대전화 번호 변경하기
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={this.state.expanded === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <ExpansionPanelSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>닉네임 변경하기</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              defaultValue={this.state.nickName}
              onChange={(event) => {
                const { value } = event.target;
                this.setState({ nickName: value });
              }}
              label="닉네임"
              style={{ margin: 8 }}
              placeholder="변경하실 닉네임을 입력 해 주세요"
              helperText=""
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={this.onUpdateNick}>
              닉네임변경하기
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(UserInfoEdit));
