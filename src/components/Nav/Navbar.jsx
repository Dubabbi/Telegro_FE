import React, { useState } from 'react';
import * as N from './NavbarStyle';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Avvvatars from 'avvvatars-react';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 창 열림 여부 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 서브 메뉴 토글 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <N.NavWrapper>
      <N.NavContainer>
        <N.Logo href="/main">Telegro</N.Logo>

        {/* 햄버거 메뉴 버튼 (780px 이하에서만 보임) */}
        <N.HamburgerButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </N.HamburgerButton>

        {/* Main Navigation (항상 보임) */}
        <N.MainNav>
          <li><a href="/main">Home</a></li>
          <li><a href="/signup">회원가입</a></li>
          <li><a href="/cart">장바구니</a></li>
          <li><a href="/login">로그아웃</a></li>
          <li><a href="mailto:ykjroom@naver.com">Contact Us</a></li>
        </N.MainNav>

        {/* Avatar (마이페이지 아이콘) */}
        <Avvvatars value="user" size={40} style={{ marginLeft: '20px' }} />
      </N.NavContainer>

      {/* 검색창 (항상 보임) */}
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

      {/* 토글 메뉴가 열리면 나오는 부분 (780px 이하에서만 보임) */}
      {isMenuOpen && (
        <N.NavMenu>
          <N.SubMenu onClick={toggleSubMenu}>상품 보기</N.SubMenu>
          {isSubMenuOpen && (
            <N.SecondaryNav>
              <li><a href="/headset">헤드셋</a></li>
              <li><a href="/lineCord">라인코드</a></li>
              <li><a href="/recording">녹음기기</a></li>
              <li><a href="/accessory">악세서리</a></li>
              <li><a href="/notice">자료실</a></li>
            </N.SecondaryNav>
          )}
        </N.NavMenu>
      )}
    </N.NavWrapper>
  );
}
