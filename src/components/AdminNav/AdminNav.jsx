import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '/src/assets/image/Landing/logo.svg';

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

// absolute 포지션을 사용해 다른 요소에 영향을 주지 않음
const SubMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  left: 100%;  /* 오른쪽에 하위 메뉴가 뜨도록 설정 */
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

const AdminNav = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

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
        <MenuItem  onClick={() => navigate('/admin/stat')} className="active">
          <FaCog />
          Dashboard
        </MenuItem>

        <MenuItem onClick={() => navigate('/admin/clientmanagement')}>
          <FaCog />
          고객 관리
        </MenuItem>
 
        <MenuItem onClick={() => navigate('/admin/stat')}>
          <FaCog/>
          상점 접속 현황
        </MenuItem>

        <MenuItem  onClick={() => navigate('/admin/adminnotice')}>
          <FaCog/>
          자료실
        </MenuItem>

        <MenuItem onClick={() => navigate('/admin/admininquiry')}>
          <FaCog />
          문의사항
        </MenuItem>

        {/* 상품 관리 메뉴 및 하위 카테고리 */}
        <SubMenuWrapper>
          <MenuItem onClick={toggleSubMenu}>
            <FaCog />
            상품 관리
            {isSubMenuOpen ? <FaChevronDown /> : <FaChevronRight />}
          </MenuItem>
          <SubMenu open={isSubMenuOpen}>
            <MenuItem onClick={() => navigate('/admin/headset')}>
              헤드셋
            </MenuItem>
            <MenuItem onClick={() => navigate('/admin/phoneAmplifier')}>
              전화/증폭기
            </MenuItem>
            <MenuItem onClick={() => navigate('/admin/lineCord')}>
              라인 코드
            </MenuItem>
            <MenuItem onClick={() => navigate('/admin/recording')}>
              녹음기기
            </MenuItem>
            <MenuItem onClick={() => navigate('/admin/accessory')}>
              악세서리
            </MenuItem>
          </SubMenu>
        </SubMenuWrapper>

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