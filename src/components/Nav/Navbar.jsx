import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.80);
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
  justify-content: center;
`;

const MainNav = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  li {
    position: relative;
    padding: 0 25px;
    transition: background 0.3s;
    &:hover {
      background-color: #126d9b;
    }
  }
  a {
    font-size: 17px;
    color: white;
    text-decoration: none;
    display: block;
  }

  ul {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    background: #ffffff;
    width: 100%;
    margin: 0%;

    li {
      display: block;
      width: 100%;
      margin: 2%;
      &:hover {
        background: #218ec5;
        width: 100%;
      }
      a {
        display: block;
        color: #000;
      }
    }
  }
  li:hover > ul {
    display: block;
  }
`;

export default function Navbar() {
  return (
    <NavWrapper>
      <Logo href="#">Telegro</Logo>
      <NavContainer>
        <MainNav>
        <li><a href="#">Home</a></li>
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
              <li><a href="genre.html" target="_blank"></a></li>
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
