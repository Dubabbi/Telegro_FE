import React, { useState } from 'react';
import * as L from './LandingStyle';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Img from '/src/assets/image/Landing/headset.svg';
import Next from '/src/assets/image/Landing/next.svg';
import NextBlue from '/src/assets/image/Landing/nextBlue.svg';
import Logo from '/src/assets/image/Landing/logo.svg';
import Mail from '/src/assets/image/Landing/mail.svg';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
    <L.LandingWrapper>
    <L.NavWrapper>
      <L.Logo href="">Telegro</L.Logo>
    </L.NavWrapper>
    <L.Inline>
    <L.Content>
      <h1>프리미엄 헤드셋과<br />
      공급 장비 브랜드</h1>
      <p>기술과 품질로 고객 여러분의 만족을 최우선 합니다.</p>
      <L.ButtonWrapper>
      <L.FirstButton onClick={() => navigate('/GeneralLogin')}><p>구매고객 </p><img src={Next} /></L.FirstButton>
      <L.SecondButton onClick={() => navigate('/login')}><p>공급업체 </p><img src={NextBlue} /></L.SecondButton>
      </L.ButtonWrapper>
      </L.Content>
      <L.Img src={Img} />
      </L.Inline>
      <L.Intro>
        <L.InlineIntro>
          <L.Title>Telegro</L.Title>
          <L.About>
            <p>기술개발 전문제조 공급 유통</p>
            <h1>헤드셋 녹취 장비 전문</h1>
          </L.About>
        </L.InlineIntro>
      </L.Intro>
      <L.List>
        <p>헤드셋</p><p>전화/증폭기</p><p>라인코드</p><p>녹음기기</p><p>악세서리</p>
      </L.List>
      <L.FooterWrapper>
        <L.FooterInline>
          <L.FooterTitle>
            <img src={Logo} />
            <p>Telegro</p>
          </L.FooterTitle>
          <L.FooterBox>
          <L.FooterEnd>
            <img src={Mail} />
            <p>Telegro@telegro.com</p>
          </L.FooterEnd>
          <L.Contact><a href="mailto:ykjroom@naver.com">Contact Us</a></L.Contact>
          </L.FooterBox>
        </L.FooterInline>
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
    </L.LandingWrapper>

    </>
  );
}
