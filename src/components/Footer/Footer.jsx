import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import * as L from '../Landing/LandingStyle';
import Logo from '/src/assets/image/Landing/logo.svg';
import Mail from '/src/assets/image/Landing/mail.svg';


export default function Footer() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 페이지 이동 함수
  const handleTabChange = (tabName) => {
      navigate(`/${tabName}`); // 경로 변경
  };
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
            <p>ykjroom@naver.com</p>
          </L.FooterEnd>
          <L.Contact><a href="mailto:ykjroom@naver.com">Contact Us</a></L.Contact>
          </L.FooterBox>
        </L.Footerline>
        <hr style={{margin: '2%', width: '90%', marginLeft: '5%', color: '#C1C7CD'}}/>
        <L.TextWrapper>
          <h1>텔레그로 (서연전자)</h1> 
          <p>주소: 서울특별시 광진구 광나루로56길 85 테크노마트 21 8층 A30, 31호</p>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '6.5%'}}>
          <p>고객센터: 070-4111-5733</p>
          <p>대표자명 : 연경진</p>
          </div>
          <p>A/S 물류배송지: 경기도 남양주시 오남읍 양지로281번길 101로젠택배 평내영업소(서연전자)</p>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '4%'}}>
            <p>사업자 등록번호: 215-18-12286</p>
            <p>통신판매업: 제 2024-서울광진-1511호</p>
            
          </div>
        </L.TextWrapper>
        <hr style={{margin: '2%', width: '90%', marginLeft: '5%', color: '#C1C7CD'}}/>
        <div style={{marginLeft: '5%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '85%'}}>
        <L.Copyright>Telegro @ 2024. All rights reserved.</L.Copyright>
        <L.Copyright><a href="#" onClick={() => handleTabChange('privacy')}>개인정보처리방침</a> | <a href="#" onClick={() => handleTabChange('terms')}>이용약관</a></L.Copyright>
        </div>

      </L.FooterWrapper>
    );
}
