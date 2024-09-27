import React, { useState, useEffect } from 'react';
import * as N from './NavbarStyle';
import { FaSearch } from 'react-icons/fa';
import Avvvatars from 'avvvatars-react';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
    setIsLoggedIn(false); // 로그아웃 상태로 변경
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
  };

  return (
    <>
      <N.NavWrapper>
        {/* Main Navigation */}
        <N.NavContainer>
          <N.Logo href="/main">Telegro</N.Logo>
          <N.MainNav>
            <li><a href="/main">Home</a></li>
            {!isLoggedIn ? ( // 로그인되지 않은 경우
              <li><a href="/login">로그인</a></li>
            ) : (
              <li><a href="/login" onClick={handleLogout}>로그아웃</a></li> // 로그아웃 시 handleLogout 호출
            )}
            <li><a href="/cart">장바구니</a></li>
            <li><a href="mailto:Telegro@telegro.com">Contact Us</a></li>
          </N.MainNav>
          {/* Avatar */}
          {isLoggedIn && <Avvvatars value="user" size={40} style={{ marginLeft: '20px' }} />} {/* 로그인된 경우 아바타 표시 */}
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
    </>
  );
}
