import React, { useState } from 'react';
import * as N from './NavbarStyle';
import { FaSearch } from 'react-icons/fa';
import Avvvatars from 'avvvatars-react';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 창 열림 여부 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
    // 검색 실행 로직 추가 가능
  };

  return (
    <>
      <N.NavWrapper>
        {/* Main Navigation */}
        <N.NavContainer>
          <N.Logo href="/main">Telegro</N.Logo>
          <N.MainNav>
            <li><a href="/main">Home</a></li>
            <li><a href="/signup">회원가입</a></li>
            <li><a href="/cart">장바구니</a></li>
            <li><a href="/inquiry">제안문의</a></li>
            <li><a href="/login">로그아웃</a></li>
            <li><a href="mailto:ykjroom@naver.com">Contact Us</a></li>
          </N.MainNav>
          {/* Avatar */}
          <Avvvatars value="user" size={40} style={{ marginLeft: '20px' }} />
        </N.NavContainer>

        {/* Secondary Navigation (Categories) */}
        <N.SecondaryNav>
          <li><a href="/headset">헤드셋</a></li>
          <li><a href="/lineCord">라인코드</a></li>
          <li><a href="/recording">녹음기기</a></li>
          <li><a href="/accessory">악세서리</a></li>
          <li><a href="/resources">자료실</a></li>
          
          {/* Search bar integrated within the category list */}
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
        </N.SecondaryNav>
      </N.NavWrapper>
    </>
  );
}
