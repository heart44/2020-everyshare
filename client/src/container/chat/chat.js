import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { database } from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "120px",
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      id: window.sessionStorage.getItem("id"),
      text: "",
      chatList: [],
      chatTextList: [],
    };
  }

  componentDidMount = async () => {
    var list = [];
    database
      .collection(this.state.id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          list.push(doc.id);
        });
      })
      .then(() => {
        this.setState({
          chatList: list,
        });
      })
      .then(() => {
        database
          .collection(this.state.id)
          .doc("aaa33") // 조회할 document 를 넣어준다.
          .get()
          .then((doc) => {
            const temp = doc.data();
            this.setState({
              chatTextList: temp[0],
            });
          });
      });
  };

  getChatList = async () => {
    console.log("1");
  };

  handleChange = (event, newValue) => {
    this.getChatList();
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;
    const container = {
      height: "100vh",
    };
    const vh = {
      width: "100%",
      overflowY: "scroll",
      position: "relative",
      paddingBottom: "65px",
    };

    const textSizeStyle = {
      width: "70%",
      padding: "10px",
    };

    const fix = {
      position: "absolute",
      top: 10,
      right: 40,
    };

    const list = this.state.chatList;

    return (
      <div className={classes.root} style={container}>
        <div className={classes.tabRoot}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {list.map((row, index) => (
              <Tab label={row} {...a11yProps(index)} />
            ))}
          </Tabs>
          <TabPanel style={vh}>
            <div className="imessages">
              {Array.isArray(this.state.chatTextList) ? this.state.chatTextList.map(function (item, index) {
                return (
                  <div class="from-me">
                    <p>{item.text}</p>
                  </div>
                );
              }):null}
            </div>
          </TabPanel>
          <div className="textSendBox">
            <TextField
              style={textSizeStyle}
              id="standard-multiline-flexible"
              multiline
              rowsMax={2}
              defaultValue={this.state.text}
              onChange={this.handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={fix}
              size="small"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              전송
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Chat);
