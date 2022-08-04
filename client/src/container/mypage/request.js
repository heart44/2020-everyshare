import React, { Component } from 'react';
import userLend from "../../lib/img/EveryShare_mypage/mypage_lend.png";
import userBorrow from "../../lib/img/EveryShare_mypage/mypage_borrow.png";
import userChange from "../../lib/img/EveryShare_mypage/mypage_change.png";
import userDelete from "../../lib/img/EveryShare_mypage/mypage_delete.png";

import '../../lib/css/Mypage_borrow.css';
import { Link } from 'react-router-dom';

import Btable from "./Mypage_table";
import MypageTop from "./mypagetop";

class request extends Component {
    render() {
        return (
            <div id="wrap">
                {/* <Header /> */}
                <div id="mypage_contents">
                    <MypageTop />
                    <div id="wrap_contents">
                        <section id="submenu_contents">
                            <div className="submenu_top">
                                <h3><Link className="a" to="/profile">마이페이지</Link></h3>
                            </div>
                            <article className="submenu_list">
                                <div className="sub_list1">
                                    <h3><a href="#somthing">거래내역</a></h3>
                                    <ul>
                                    <li><img src={userBorrow} alt="" /><Link className="a" to="/profile/request?viewType=1" style={{ fontWeight: "bold" }}>빌린거</Link></li>
                                        <li><img src={userLend} alt="" /><Link className="a" to="/profile/lend?viewType=2">빌려준거</Link></li>
                                    </ul>
                                </div>
                                <div className="sub_list1">
                                    <h3><a href="#somthing">회원정보</a></h3>
                                    <ul>
                                        <li><img src={userChange} alt="" /><Link className="a" to="/profile/user_edit">회원정보 수정</Link></li>
                                        <li><img src={userDelete} alt="" /><Link className="a" to="/profile/user_delete">회원 탈퇴</Link></li>
                                    </ul>
                                </div>
                            </article>
                        </section>
                        <section id="contents_area">
                            <Btable/>
                        </section>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>

        )
    }
}

export default request;