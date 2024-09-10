import React from "react";
import styled from 'styled-components';
import * as L from '../Landing/LandingStyle';
import Logo from '/src/assets/image/Landing/logo.svg';
import Mail from '/src/assets/image/Landing/mail.svg';


export default function Footer() {
    return (
        <L.FooterWrapper>
        <L.Footerline style={{width: '90%'}}>
          <L.FooterTitle>
            <img src={Logo} />
            <p>Telegro</p>
          </L.FooterTitle>
          <L.FooterBox>
          <L.FooterEnd>
            <img src={Mail} />
            <p>Telegro@telegro.com</p>
          </L.FooterEnd>
          <L.Contact>Contact Us</L.Contact>
          </L.FooterBox>
        </L.Footerline>
        <hr style={{margin: '2%', width: '90%', marginLeft: '5%', color: '#C1C7CD'}}/>
        <L.TextWrapper>
          <h1>회사명: 서연전자</h1>
          <p>주소: 서울특별시 광진구 광나루로56길 85 테크노마트 21 8층 A30, 31호</p>
          <p>고객센터: 070-4240-7422</p>
          <p>대표이사: 연경진</p>
          <p>사업자 등록번호: 215-18-12286</p>
        </L.TextWrapper>
        <hr style={{margin: '2%', width: '90%', marginLeft: '5%', color: '#C1C7CD'}}/>
        <L.Copyright>Telegro @ 2024. All rights reserved.</L.Copyright>
      </L.FooterWrapper>
    );
}
