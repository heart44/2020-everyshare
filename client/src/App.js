import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./component/common/header";
import Home from "./pages/EveryShareHome";
import Footer from "./component/common/footer";
import Board from "./pages/EveryShareList";
import View from "./pages/EveryShareView";
import Write from "./pages/EveryShareWrite";
import Register from "./pages/EveryShareRegister";
import Login from "./pages/EveryShareLogin";
import Modify from "./pages/EveryShareModify";
import Chat from "./pages/EveryShareChat";
import Profile from "./pages/EveryShareMypage";
import MypageRequest from './container/mypage/request';
import MypageLend from './container/mypage/lend';
import MypageWrite from './container/mypage/mypagewirte';
import MypageComment from './container/mypage/mypagecomment';
import MypageEdit from './container/mypage/useredit';
import MypageDelete from './container/mypage/userdelete';
import NotFound from "./NotFound";

import Store from "./store/store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
    };
  }

  onLogin = () => {
    this.setState({
      logged: true,
    });
  };

  onLogout = () => {
    this.setState({
      logged: false,
    });

    window.sessionStorage.clear();
  };

  componentDidMount() {
    const id = window.sessionStorage.getItem("id");
    if (id) {
      this.onLogin();
    } else {
      this.onLogout();
    }
  }

  render() {
    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <Router>
          <div id="wrap">
            <Header logged={logged} onLogout={onLogout} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/board/:category" component={Board} />
              <Route path="/view/:postNum" component={View} />
              <Route path="/write" component={Write} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/modify" component={Modify} />
              <Route path="/chat" component={Chat} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/profile/request" component={MypageRequest} />
              <Route path="/profile/lend" component={MypageLend} />
              <Route path="/profile/write" component={MypageWrite} />
              <Route path="/profile/comment" component={MypageComment} />
              <Route path="/profile/user_edit" component={MypageEdit} />
              <Route path="/profile/user_delete" component={MypageDelete} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Store.Provider>
    );
  }
}

export default App;
