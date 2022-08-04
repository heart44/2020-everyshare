import React from "react";
import Store from "../store/store"
import Login from "../container/user/login";
import { withRouter } from "react-router-dom";

class EveryShareLogin extends React.Component {

  render() {
    return (
      <section id="main_contents">
        <div id="contents_wrap">
          <Store.Consumer>
            {store => (
              <Login onLogin={store.onLogin}/>
            )}           
          </Store.Consumer>
        </div>
      </section>
    );
  }
}

export default withRouter(EveryShareLogin);