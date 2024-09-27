import React, { useState, useEffect } from 'react';
import * as N from './NavbarStyle';
import { FaSearch } from 'react-icons/fa';
import Avvvatars from 'avvvatars-react';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
  };

  return (
    <N.NavWrapper>
      <N.NavContainer>
        <N.Logo href="/main">Telegro</N.Logo>
        <N.MainNav>
          <li><a href="/main">Home</a></li>
          {!isLoggedIn ? (
            <li><a href="/login">로그인</a></li>
          ) : (
            <li><a href="/login" onClick={handleLogout}>로그아웃</a></li>
          )}
          <li><a href="/cart">장바구니</a></li>
          <li><a href="mailto:Telegro@telegro.com">Contact Us</a></li>
        </N.MainNav>
        {isLoggedIn && <Avvvatars value="user" size={40} />}
      </N.NavContainer>

      <N.SecondaryNavContainer>
        <N.SecondaryNav>
          <li><a href="/headset">헤드셋</a></li>
          <li><a href="/lineCord">라인코드</a></li>
          <li><a href="/recording">녹음기기</a></li>
          <li><a href="/accessory">악세서리</a></li>
          <li><a href="/notice">자료실</a></li>
        </N.SecondaryNav>
        <N.SearchWrapper>
          <N.StyledForm onSubmit={handleSubmit}>
            <N.SearchInput
              type="text"
              placeholder="검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <N.StyledButton type="submit"><FaSearch size={15} /></N.StyledButton>
          </N.StyledForm>
        </N.SearchWrapper>
      </N.SecondaryNavContainer>
    </N.NavWrapper>
  );
}
