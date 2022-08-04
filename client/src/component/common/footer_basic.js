import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo_Image from "../../lib/img/common/everyshareLogo.png";

class BasicFooter extends Component {
  
  render() {
    return (
      <div id="footer_wrap">
        <footer>
          <div id="footer_info_wrap">
            <div className="footer_logo_wrap">
              <img src={logo_Image} alt="에브리쉐어" />
            </div>
            <p>
              <b>에브리쉐어</b> | (39177) 경북 구미시 대학로 61
              <br />
              <br />
              <b>에브리쉐어는 통신판매중개자이며 통신판매의 당사자가 아닙니다. <br />
              따라서 에브리쉐어는 판매자가 등록한 상품, 거래정보 및 거래에
              대하여 책임을 지지 않습니다.</b>
              <br /><br />
              고객감동센터 : (054) 478-7114 FAX : (054) 478-7114 E-mail :
              help@everyshare.com
              <br />
              <br />
              <br />© everyshare Corp. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(BasicFooter);
