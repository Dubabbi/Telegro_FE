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
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // FaSearch 클릭 시 상태 토글
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

        {/* FaSearch 아이콘 클릭 시 검색 창이 보이도록 상태에 따라 조건부 렌더링 */}
        {isSearchOpen ? (
            <N.SearchWindow>
              <N.SearchWrap>
                <N.StyledForm onSubmit={handleSubmit}>
                  <N.SearchInput
                    type="text"
                    placeholder="게시글 검색"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
                </N.StyledForm>
              </N.SearchWrap>
            </N.SearchWindow>
        ) : (
          <N.StyledButton onClick={toggleSearch}><FaSearch /></N.StyledButton>
        )}
      </N.NavWrapper>
    </>
  );
}
