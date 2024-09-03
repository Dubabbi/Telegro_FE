import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: #333;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-bottom: 100px;
  padding-top: 5px;
`;

const Logo = styled.a`
  width: 300px;
  height: 70px;
  line-height: 60px;
  font-size: 4.5rem;
  color: white;
  text-align: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

const MainNav = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  margin: 0;
  align-items: center;
  
  li {
    position: relative;
    padding: 0 25px;
    padding-top: 22px;
    height: 100%;
    align-items: center;
    transition: background 0.5s;
    &:hover {
      background-color: #6C6D6D;
      > ul {
        visibility: visible;       // 하위 ul을 보이게 함
        opacity: 1;                // 투명도를 1로 설정
        transform: translateY(0);  // 위로 슬라이드
      }
    }
  }

  a {
    font-size: 17px;
    color: white;
    align-items: center;
    text-decoration: none;
    display: block;
  }

  ul {
    position: absolute;
    left: 0;
    top: 100%;
    background: #ffffff;
    width: 250%;
    margin: 0;
    visibility: hidden;             // 기본적으로 숨김
    opacity: 0;                     // 투명도 0
    transform: translateY(20px);    // 초기 위치를 조금 아래로 설정
    transition: visibility 0s, opacity 0.3s ease, transform 0.3s ease;  // 부드러운 전환 효과

    li {
      display: block;
      width: 100%;
      margin: 2%;
      padding: 10px;
      &:hover {
        background-color: transparent;
        color: #ddd;
        align-items: center;
        margin-left: 3%;
      }
      a {
        display: block;
        color: inherit;
      }    
    }
  }
`;

export default function Navbar() {
  return (
    <NavWrapper>
      <Logo href="#">Telegro</Logo>
      <NavContainer>
        <MainNav>
        <li><a href="#"style={{fontWeight: 'bold'}}>Home</a></li>
          <li><a href="#">Company<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="album.html" target="_blank">Best</a></li>
              <li><a href="latest.html" target="_blank">Latest</a></li>
            </ul>
          </li>
          <li><a href="#">Products<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="https://www.imdb.com/title/tt26934645/?ref_=tt_mv_close" target="_blank">Movie</a></li>
              <li><a href="tour.html" target="_blank">Tour</a></li>
            </ul>
          </li>
          <li><a href="#">SOLUTION<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="history.html" target="_blank">History</a></li>
              <li><a href="member.html" target="_blank">Member</a></li>
            </ul>
          </li>
          <li><a href="follow.html">Host</a></li>
          <li><a href="contact.html" target="_blank">Contact Us</a></li>
        </MainNav>
      </NavContainer>
    </NavWrapper>
  );
}
