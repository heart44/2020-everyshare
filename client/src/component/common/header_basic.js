import React, { Component } from "react";
import "../../lib/css/common.css";
import "../../lib/css/EveryShare_basicHeader.css";
import logo_Image from "../../lib/img/common/everyshareLogo.png";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(4),
    },
  },
});

class HeaderBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invisible: false,
      SearchClick: false,
      MenuClick: false,
    };
  }

  handleBadgeVisibility = () => {
    this.setState({
      invisible: false,
    });
  };

  handleModal = () => {
    window.open("/chat", "PopupWin", "width=500,height=600");
  }

  handleSearch() {
    this.setState({ SearchClick: !this.state.SearchClick });
  }
  handleMenu() {
    this.setState({ MenuClick: !this.state.MenuClick });
  }

  handleModal = () => {
    window.open("/chat", "PopupWin", "width=500,height=600");
  }

  render() {
    const { logged, onLogout } = this.props;

    return (
      <div className="header_wrap">
        <header>
          <div className="global_nav_wrap">
            <nav className="global_nav">
              {logged ? (
                <ul>
                  <li>
                  <Badge
                        color="secondary"
                        variant="dot"
                        invisible={this.state.invisible}
                      >
                        <MailIcon onClick={this.handleModal} />
                      </Badge>
                  </li>
                  <li>
                    <Link to={{ pathname: "/profile" }}>마이페이지</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "/" }} onClick={onLogout}>
                      로그아웃
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to={{ pathname: "/profile" }}>마이페이지</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "/login" }}>로그인</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "/register" }}>회원가입</Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>

          <div className="clear"></div>

          <div className="header_logo_wrap">
            <div className="logo_wrap">
            <div className="total_header_menu">
                <button className="header_button" type="button" onClick={() => this.handleSearch()}></button>
                {this.state.SearchClick ?
                  <div className="header_button_search"  >
                    <input type="text" placeholder="" />
                    <input type="submit" value="Search" />
                  </div> : null}
                <button className="header_menu" type="button" onClick={() => this.handleMenu()}></button>
                <div className={"res_main_nav_wrap " + (this.state.MenuClick ? "show" : " ")}>
                  <div className="nav_header">
                    <button className="close" type="button" onClick={() => this.handleMenu()}> x </button>
                    <div className="header_global_nav">
                      {logged ? (
                        <ul className="global">
                          <li>
                            <Link to={{ pathname: "/profile" }}
                              onClick={() => this.handleMenu()}>마이페이지</Link></li>
                          <li>
                            <Link to={{ pathname: "/" }} onClick={onLogout}>
                              로그아웃</Link></li>
                        </ul>
                      ) : (
                          <ul className="global">
                            <li>
                              <Link to={{ pathname: "/login" }}>로그인</Link></li>
                            <li>
                              <Link to={{ pathname: "/register" }}>회원가입</Link></li>
                          </ul>
                        )}

                    </div>
                  </div>
                  <div className="res_main_nav">
                    <ul className="main_nav">
                      <li>
                        <Link to={logged ? { pathname: "/write" } : { pathname: "/login" }}>
                          글쓰기</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/digital?category=1",
                            state: { category: "디지털/가전" },
                          }} onClick={() => this.handleMenu()}>디지털/가전</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/kids?category=2",
                            state: { category: "유아동" },
                          }} onClick={() => this.handleMenu()}>유아동</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/daily?category=3",
                            state: { category: "생활용품" },
                          }} onClick={() => this.handleMenu()}>생활용품</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/clothes?category=4",
                            state: { category: "의류/잡화" },
                          }} onClick={() => this.handleMenu()}>의류/잡화</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/sport?category=5",
                            state: { category: "스포츠/레저" },
                          }} onClick={() => this.handleMenu()}>스포츠/레저</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/book?category=6",
                            state: { category: "도서/취미" },
                          }} onClick={() => this.handleMenu()}>도서/취미</Link></li>
                      <li>
                        <Link
                          to={{
                            pathname: "/board/etc?category=7",
                            state: { category: "기타용품" },
                          }} onClick={() => this.handleMenu()}>기타용품</Link></li>
                    </ul>
                  </div>
                </div>
                <div className={"nav_overlay " + (this.state.MenuClick ? "show" : " ")}
                  onClick={() => this.handleMenu()}></div>
              </div>
              <h1>
                <Link to={{ pathname: "/" }}>
                  <img src={logo_Image} alt="에브리쉐어" />
                </Link>
              </h1>
              <form
                name="header_search_box"
                action="#"
                method="get"
                target="_blank"
              >
                <input type="search" />
              </form>
            </div>
          </div>

          <nav className="main_nav_wrap">
            <ul className="main_nav">
              <li>
                <Link
                  to={logged ? { pathname: "/write" } : { pathname: "/login" }}
                >
                  글쓰기
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/digital?category=1",
                    state: { category: "디지털/가전" },
                  }}
                >
                  디지털/가전
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/kids?category=2",
                    state: { category: "유아동" },
                  }}
                >
                  유아동
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/daily?category=3",
                    state: { category: "생활용품" },
                  }}
                >
                  생활용품
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/clothes?category=4",
                    state: { category: "의류/잡화" },
                  }}
                >
                  의류/잡화
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/sport?category=5",
                    state: { category: "스포츠/레저" },
                  }}
                >
                  스포츠/레저
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/book?category=6",
                    state: { category: "도서/취미" },
                  }}
                >
                  도서/취미
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/board/etc?category=7",
                    state: { category: "기타용품" },
                  }}
                >
                  기타용품
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default withStyles(useStyles)(HeaderBasic);
