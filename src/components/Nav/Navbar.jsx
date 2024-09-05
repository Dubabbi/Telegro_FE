import React, { useState } from 'react';
import * as N from './NavbarStyle';
import * as T from '../Notice/NoticeStyle'
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };
  return (
    <>
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
          <li><a href="/order">주문확인</a></li>
          <li><a href="mailto:ykjroom@naver.com">Contact Us</a></li>
        </N.MainNav>
      </N.NavContainer>
      <N.StyledButton><FaSearch /></N.StyledButton>
    </N.NavWrapper>
  </>
  );
}

{/*
            <T.BoardSearchArea>
          <T.SearchWindow>
            <T.SearchWrap>
            <T.StyledForm onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="게시글 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              <T.StyledButton type="submit" variant="none"><FaSearch size={15} /></T.StyledButton>
              </T.StyledForm>
            </T.SearchWrap>
          </T.SearchWindow>
        </T.BoardSearchArea>
  */}