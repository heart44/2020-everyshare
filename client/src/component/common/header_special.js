import React, { Component } from 'react';
import '../../lib/css/common.css'
import '../../lib/css/EveryShare_specialHeader.css'
import logo_Image from "../../lib/img/common/everyshareLogo.png";
import btnMenuImage from "../../lib/img/common/special_menu.png";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//회원가입, 마이페이지, 로그인, 글쓰기 등에 사용
class HeaderSpecial extends Component {
 
    render() {
        return(
              <div id="header_wrap">
                <header>
                    <h1><Link to={'/'}><img src={logo_Image} alt="에브리쉐어"></img></Link></h1>
                    <div className="btn_nav"><a href=" /"><img src={btnMenuImage} alt="홈으로,로그아웃,내정보보기 메뉴"></img></a></div>
                    <nav id="lnb">
                        <ul>
                            <li><a href=" /">홈으로</a></li>
                            <li><a href=" /">로그아웃</a></li>
                            <li><a href=" /">내정보보기</a></li>
                        </ul>
                    </nav>  
                </header>
              </div>
        );
    }
}

//이 구문이 있어야 외부에서 사용 가능하게 함
export default withRouter(HeaderSpecial);