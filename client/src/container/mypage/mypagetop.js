import React, { Component } from 'react';
import '../../lib/css/Mypage_top.css';
import { NavLink } from 'react-router-dom';

import profileImage from "../../lib/img/EveryShare_boardlist/boardlist_profile.png";

class MypageTop extends Component {    
    
    render() {
        const activeStyle = {
            fontWeight: "bold"
        };
        const nickname = window.sessionStorage.getItem('nickName');
        console.log(window.sessionStorage.getItem('nickName'));
        return (
            <div id="mypage_top">
                <div className="top_contents_wrap">
                    <div className="top_contents">
                        <img src={profileImage} alt="" />
                        <div className="contents_list">
                            <div className="contents_user">
                                <div className="user_name"><h2>{nickname}</h2><p>님</p></div>
                                <ul>
                                    <li><NavLink className="a" to="/profile/write" activeStyle={activeStyle}>글</NavLink></li>
                                    <li><NavLink className="a" to="/profile/comment" activeStyle={activeStyle}>댓글</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MypageTop;