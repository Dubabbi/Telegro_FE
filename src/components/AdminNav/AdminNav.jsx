import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from '/src/assets/image/Landing/logo.svg';

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  max-height: 100vh;
  padding-top: 4%;
  padding-bottom: 2%;
  width: 20%; 
  background-color: #4F4F4F;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1%;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 3%;
  flex-direction: row;
  margin-bottom: 4%;
`;

const LogoImage = styled.img`
  width: 35%;
  height: auto;
`;

const LogoText = styled.h1`
  color: #fff;
  font-size: 1.5rem;
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
    color: #fff;
  }

  svg {
    margin-right: 10px;
  }

  &.active {
    color: #FFD700; /* 선택된 메뉴 색상 */
    background-color: #6B6B6B;
  }
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

const AdminNav = () => {
  return (
    <Sidebar>
      <LogoWrapper>
        <LogoImage src={Logo} alt="Telegro Logo" />
        <LogoText>Telegro</LogoText>
      </LogoWrapper>

      <SearchBar>
        <FaSearch />
        <SearchInput type="text" placeholder="Search" />
      </SearchBar>

      <MenuWrapper>
        <MenuItem className="active">
          <FaCog />
          Dashboard
        </MenuItem>
        <MenuItem>
          <FaCog />
          고객 관리
        </MenuItem>
        <MenuItem>
          <FaCog />
          상품 접속 현황
        </MenuItem>
        <MenuItem>
          <FaCog />
          자료실
        </MenuItem>
        <MenuItem>
          <FaCog />
          문의사항
        </MenuItem>
        <MenuItem>
          <FaCog />
          상품 관리
        </MenuItem>
        <MenuItem>
          <FaCog />
          주문 현황
        </MenuItem>
      </MenuWrapper>

      <FooterWrapper>
        <ProfileWrapper>
          <ProfilePic />
          <ProfileInfo>
            <div>관리자</div>
            <div style={{ fontSize: '0.8rem', color: '#FFD700' }}>Admin</div>
          </ProfileInfo>
        </ProfileWrapper>

        <SettingsWrapper>
          <FaCog />
          Settings
        </SettingsWrapper>

        <LogoutButton>
          <FaSignOutAlt />
          Log out
        </LogoutButton>
      </FooterWrapper>
    </Sidebar>
  );
};

export default AdminNav;
