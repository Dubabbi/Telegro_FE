import React from 'react';
import * as N from './NavbarStyle';

export default function Navbar() {
  return (
    <N.NavWrapper>
      <N.Logo href="/main">Telegro</N.Logo>
      <N.NavContainer>
        <N.MainNav>
        <li><a href="/main"style={{fontWeight: 'bold'}}>Home</a></li>
          <li><a href="">주문관리<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="/headset">헤드셋</a></li>
              <li><a href="/phoneAmplifier">전화/증폭기</a></li>
              <li><a href="/lineCord">라인코드</a></li>
              <li><a href="/recording">녹음기기</a></li>
              <li><a href="/accessory">악세사리</a></li>
            </ul>
          </li>
          <li><a href="/Notice">공지사항<i className='fa fa-angle-down'></i></a>
          </li>
          <li><a href="/inquiryform">제안문의<i className='fa fa-angle-down'></i></a>
          </li>
          <li><a href="">주문확인</a></li>
          <li><a href="mailto:ykjroom@naver.com">Contact Us</a></li>
        </N.MainNav>
      </N.NavContainer>
    </N.NavWrapper>
  );
}
