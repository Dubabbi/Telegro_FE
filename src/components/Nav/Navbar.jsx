import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(20, 20, 20, 0.9);
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
        visibility: visible;       
        opacity: 1;                
        transform: translateY(0);  
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
    visibility: hidden;            
    opacity: 0;                    
    transform: translateY(20px);   
    transition: visibility 0s, opacity 0.5s ease, transform 0.5s ease; 

    li {
      display: block;
      width: 100%;
      margin: 2%;
      padding: 10px;
      font-size: 1rem;
      &:hover {
        background-color: transparent;
        transition: color 0.5s, margin-left 0.5s;
        color: #aaa;
        align-items: center;
        margin-left: 4%;
      }
      a {
      font-size: 1.3rem;
        display: block;
        color: inherit;
      }    
    }
  }
`;

export default function Navbar() {
  return (
    <NavWrapper>
      <Logo href="/">Telegro</Logo>
      <NavContainer>
        <MainNav>
        <li><a href="/"style={{fontWeight: 'bold'}}>Home</a></li>
          <li><a href="">주문관리<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="">헤드셋</a></li>
              <li><a href="">전화/증폭기</a></li>
              <li><a href="">라인코드</a></li>
              <li><a href="">녹음기기</a></li>
              <li><a href="">헤드셋</a></li>
              <li><a href="">악세사리</a></li>
            </ul>
          </li>
          <li><a href="/Notice">공지사항<i className='fa fa-angle-down'></i></a>
          </li>
          <li><a href="#">제안문의<i className='fa fa-angle-down'></i></a>
            <ul>
              <li><a href="">History</a></li>
              <li><a href="">Member</a></li>
            </ul>
          </li>
          <li><a href="">주문확인</a></li>
          <li><a href="">Contact Us</a></li>
        </MainNav>
      </NavContainer>
    </NavWrapper>
  );
}
