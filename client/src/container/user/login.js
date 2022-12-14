import React, { Component } from "react";
import { login } from "./userFunction";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import logo_Image from "../../lib/img/common/everyshareLogo.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "100px",
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      password: "",
      nickName: "",
      userNum: "",
      open: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      userID: this.state.userID,
      password: this.state.password,
    };

    login(user).then((res) => {
      if (res.length === 0) {
        console.log("??????");
        this.setState({
          open: true,
        });

      } else {
        this.setState({
          userNum: res[0].userNum,
          nickName: res[0].nickName
        })

        console.log( res[0])
        const { userID, nickName, userNum} = this.state
        
        window.sessionStorage.setItem('id',userID)
        window.sessionStorage.setItem('nickName', nickName)
        window.sessionStorage.setItem('userNum', userNum)

        this.props.onLogin();
        this.props.history.push({
          pathname: '/',
          state: { id: res[0].userID }
        })
      }
    });
  };

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

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
                <img src={logo_Image} alt="???????????????" style={coustomStyle} />
              </Link>
            </Box>
            <Grid>
              <TextField
                defaultValue={this.state.userID}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ userID: value });
                }}
                label="?????????"
                style={{ margin: 8 }}
                placeholder="???????????? ?????? ??? ?????????"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <TextField
                defaultValue={this.state.password}
                onChange={(event) => {
                  const { value } = event.target;
                  this.setState({ password: value });
                }}
                label="????????????"
                type="password"
                style={{ margin: 8 }}
                placeholder="??????????????? ?????? ??? ?????????"
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
                ?????????
              </ColorButton>

              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"????????? ??????"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ???????????? ?????? ??????????????????, ????????? ?????????????????????.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    ??????
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(Login));
