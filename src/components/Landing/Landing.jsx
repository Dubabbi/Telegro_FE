import React, { useState } from 'react';
import * as L from './LandingStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Img from '/src/assets/image/Landing/headset.svg';
import Next from '/src/assets/image/Landing/next.svg';
import NextBlue from '/src/assets/image/Landing/nextBlue.svg';

export default function Landing() {
  return (
    <L.LandingWrapper>
    <L.NavWrapper>
      <L.Logo href="/main">Telegro</L.Logo>
    </L.NavWrapper>
    <L.Inline>
    <L.Content>
      <h1>프리미엄 헤드셋과<br />
      공급 장비 브랜드</h1>
      <p>기술과 품질로 고객 여러분의 만족을 최우선 합니다.</p>
      <L.ButtonWrapper>
        <L.FirstButton><p>구매고객 </p><img src={Next} /></L.FirstButton>
        <L.SecondButton><p>공급업체 </p><img src={NextBlue} /></L.SecondButton>
      </L.ButtonWrapper>
      </L.Content>
      <L.Img src={Img} />
      </L.Inline>
    </L.LandingWrapper>
  );
}
