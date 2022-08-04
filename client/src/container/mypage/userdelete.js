import React, { Component } from 'react';
import userLend from "../../lib/img/EveryShare_mypage/mypage_lend.png";
import userBorrow from "../../lib/img/EveryShare_mypage/mypage_borrow.png";
import userChange from "../../lib/img/EveryShare_mypage/mypage_change.png";
import userDelete from "../../lib/img/EveryShare_mypage/mypage_delete.png";

import '../../lib/css/Mypage_borrow.css';
import { Link } from 'react-router-dom';

import MypageTop from "../mypage/mypagetop";

class MypageDelete extends Component {
    render() {
        return (
            <div id="wrap">
                <div id="mypage_contents">
                    <MypageTop />
                    <div id="wrap_contents">
                        <section id="submenu_contents">
                            <div className="submenu_top">
                                <h3><Link className="a" to="/profile">마이페이지</Link></h3>
                            </div>
                            <article className="submenu_list">
                                <div className="sub_list1">
                                    <h3><a href="#something">거래내역</a></h3>
                                    <ul>
                                    <li><img src={userBorrow} alt="" /><Link className="a" to="/profile/request?viewType=1">빌린거</Link></li>
                                        <li><img src={userLend} alt="" /><Link className="a" to="/profile/lend?viewType=2">빌려준거</Link></li>
                                    </ul>
                                </div>
                                <div className="sub_list1">
                                    <h3><a href="#something">회원정보</a></h3>
                                    <ul>
                                        <li><img src={userChange} alt="#" /><Link className="a" to="/profile/user_edit">회원정보 수정</Link></li>
                                        <li><img src={userDelete} alt="#" /><Link className="a" to="/profile/user_delete" style={{ fontWeight: "bold" }}>회원 탈퇴</Link></li>
                                    </ul>
                                </div>
                            </article>
                        </section>
                        <section id="contents_area">
                            
                        </section>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>

        )
    }
}

export default MypageDelete;