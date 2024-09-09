import React, { useState } from 'react';
import * as N from './NavbarStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 창 열림 여부 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
    // 검색 실행 로직 추가 가능
  };

  const toggleSearch = () => {
    setIsSearchOpen(true); // 검색창을 열기만 하고 닫기 기능은 없음
  };

  return (
    <>
      <N.NavWrapper>
        <N.Logo href="/main">Telegro</N.Logo>
        <N.NavContainer>
          <N.MainNav>
            <li><a href="/main" style={{ fontWeight: 'bold' }}>Home</a></li>
            <li>
              <a href="#">주문관리<i className='fa fa-angle-down'></i></a>
              <ul>
                <li><a href="/headset">헤드셋</a></li>
                <li><a href="/phoneAmplifier">전화/증폭기</a></li>
                <li><a href="/lineCord">라인코드</a></li>
                <li><a href="/recording">녹음기기</a></li>
                <li><a href="/accessory">악세사리</a></li>
              </ul>
            </li>
            <li><a href="/Notice">공지사항<i className='fa fa-angle-down'></i></a></li>
            <li><a href="/inquiryform">제안문의<i className='fa fa-angle-down'></i></a></li>
            <li><a href="/order">주문확인</a></li>
            <li><a href="mailto:ykjroom@naver.com">Contact Us</a></li>
          </N.MainNav>
        </N.NavContainer>

        {/* 검색 버튼이 검색창을 열도록 설정 */}
        {!isSearchOpen && (
          <N.StyledButton onClick={toggleSearch}><FaSearch /></N.StyledButton>
        )}

        {/* 검색창이 열리면 검색 기능을 제공 */}
        {isSearchOpen && (
          <N.SearchWindow style={{
            visibility: isSearchOpen ? 'visible' : 'hidden',
            opacity: isSearchOpen ? 1 : 0,
            transform: isSearchOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'visibility 0s linear 0.5s, opacity 0.5s ease, transform 0.5s ease'
          }}>
            <N.SearchWrap>
              <N.StyledForm onSubmit={handleSubmit}>
                <N.SearchInput
                  type="text"
                  placeholder="검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
          </N.SearchWindow>
        )}
      </N.NavWrapper>
    </>
  );
}
