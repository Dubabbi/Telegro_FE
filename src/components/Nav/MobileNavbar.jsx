import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as N from './NavbarStyle';
import { FaSearch, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '/src/assets/image/Landing/logo.svg';  // 로고 파일 경로

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 10px 20px;
  color: white;
  position: fixed;
  border-radius: 10px;
  z-index: 4000;
`;



const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  left: 15px;
  top: 13px;
  border: none;
  color: white;
  font-size: 2.7rem;
  cursor: pointer;
  z-index: 3000;
  color: #bbb;
  align-items: center;
  @media (max-width: 780px) {
    display: block; 
  }
`;
const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 4%;
  padding-bottom: 2%;
  width: 20%;
  height: 100vh;
  background-color: #4F4F4F;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1%;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 780px) {
    width: 60%; 
    transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(-100%)')}; /* 모바일일 때 사이드바의 이동을 제어 */
  }
`;


const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3%;
  text-align: center;
  flex-direction: row;
  margin-bottom: 4%;
`;

const LogoImag = styled.img`
  width: 35%;
  height: auto;
`;

const LogoText = styled.h1`
  color: #ccc;
  font-size: 1.8rem;
  font-weight: bold;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #E0E0E0;
  width: 90%;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  padding-left: 10px;
`;
const MenuWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #D3D3D3;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: #6B6B6B;
    color: white;
  }
  
  svg {
    margin-right: 10px;
  }

  &.active {
    color: #FFD700;
    background-color: #6B6B6B;
  }
`;

const SubMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  left: 100%;
  top: 0;
  background-color: #4F4F4F;
  padding: 10px 20px;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  ${MenuItem} {
    padding: 10px;
    &:hover {
      background-color: #6B6B6B;
      padding-left: 1.7rem;
      transition: all 0.5s ease;
    }
  }
`;

const SubMenuWrapper = styled.div`
  position: relative;
`;



const FooterWrapper = styled.div`
  margin-top: auto;
    width: 100%;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #303030;
  border-radius: 10px;
  margin-bottom: 3%;
`;

const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #C4C4C4;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  color: white;
  font-size: 1rem;
`;


const SettingsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: #D3D3D3;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const LogoutButton = styled.div`
  color: red;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    color: #ff5a5a;
  }
`;

export default function MobileNavbar() {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      setIsMobileSidebarVisible(false); 
      setIsSubMenuOpen(false);
    }, [location.pathname]);
  
    const toggleSidebar = () => {
      setIsMobileSidebarVisible(!isMobileSidebarVisible);
    };
    const toggleSubMenu = () => {
      setIsSubMenuOpen(!isSubMenuOpen);
    };
    useEffect(() => {
      setIsMobileSidebarVisible(false);
      setIsSubMenuOpen(false); // 서브메뉴 초기화
    }, [location.pathname]);
  

  return (
    <>
      {/* 상단 바 */}
      <TopBar>
        <MenuButton onClick={toggleSidebar}>
          {isMobileSidebarVisible ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <LogoWrapper>
          <LogoImg src={LogoImage} alt="Telegro Logo" />
          <LogoText>Telegro</LogoText>
        </LogoWrapper>
      </TopBar>

      {/* 사이드바 */}
      <Sidebar show={isMobileSidebarVisible}>
      <LogoWrapper style={{opacity: '0'}}>
          <LogoImg src={LogoImage} alt="Telegro Logo" />
          <LogoText>Telegro</LogoText>
        </LogoWrapper>

        <SearchBar style={{marginTop: '2%'}}>
          <FaSearch />
          <SearchInput type="text" placeholder="Search" />
        </SearchBar>

        <MenuWrapper>
          <MenuItem style={{cursor: 'default'}} className="active">
            <FaCog />
            Dashboard
          </MenuItem>

          <MenuItem onClick={() => navigate('/cart')}>
            <FaCog />
            장바구니
          </MenuItem>

          <MenuItem onClick={() => navigate('/ordermanager')}>
            <FaCog />
            주문확인
          </MenuItem>

          <MenuItem onClick={() => navigate('/notice')}>
            <FaCog />
            자료실
          </MenuItem>

          <MenuItem>
            <FaCog />
            <a href="mailto:Telegro@telegro.com">Contact Us</a>
          </MenuItem>

          {/* 상품 관리 메뉴 및 하위 카테고리 */}
          <SubMenuWrapper>
            <MenuItem onClick={toggleSubMenu}>
              <FaCog />
              상품 목록
              {isSubMenuOpen ? <FaChevronDown /> : <FaChevronRight />}
            </MenuItem>
            <SubMenu open={isSubMenuOpen}>
              <MenuItem onClick={() => navigate('/headset')}>
                헤드셋
              </MenuItem>
              <MenuItem onClick={() => navigate('/lineCord')}>
                라인 코드
              </MenuItem>
              <MenuItem onClick={() => navigate('/recording')}>
                녹음기기
              </MenuItem>
              <MenuItem onClick={() => navigate('/accessory')}>
                악세서리
              </MenuItem>
            </SubMenu>
          </SubMenuWrapper>
        </MenuWrapper>
        <FooterWrapper>
          <ProfileWrapper>
            <ProfilePic />
            <ProfileInfo>
              <div>회원명</div> {/* 비회원인 경우 '비회원' */}
              <div style={{ fontSize: '0.8rem', color: '#FFD700' }}>일반회원</div> {/* 등급 */}
            </ProfileInfo>
          </ProfileWrapper>
          <LogoutButton onClick={() => navigate('/logout')}>
            <FaSignOutAlt />
            Log out
          </LogoutButton>
        </FooterWrapper>
      </Sidebar>
    </>
  );
}
