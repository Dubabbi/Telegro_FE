import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '/src/assets/image/Landing/logo.svg';
import axios from 'axios';

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 4%;
  padding-bottom: 2%;
  max-width: 280px;
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

const MenuButton = styled.button`
  display: none;
  position: fixed;
  left: 15px;
  top: 13px;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 2000;
  color: #bbb;
  @media (max-width: 780px) {
    display: block; 
  }
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

const AdminNav = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/admin');
    alert('로그아웃되었습니다.')
  };

  const fetchProductsByCategory = async (category, page = 0) => {
    try {
      const response = await axios.get(`https://api.telegro.kr/products`, {
        params: { category, page, size: 10 }
      });
      if (response.data.code === 20000) {
        return response.data.data;
      } else {
        console.error(`Error fetching products for ${category}:`, response.data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  

  useEffect(() => {
    setIsMobileSidebarVisible(false);
    setIsSubMenuOpen(false); 
  }, [location.pathname]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const categories = ['HEADSET', 'LINE_CORD', 'RECORDER', 'ACCESSORY'];
      let allProducts = [];
      
      for (const category of categories) {
        const response = await fetchProductsByCategory(category);
        
        // 응답 데이터가 객체일 경우, 배열을 추출
        const productsArray = response.data?.products || [];
        
        // allProducts에 병합
        allProducts = [...allProducts, ...productsArray];
      }
  
      setProducts(allProducts); // 병합된 제품 배열로 상태 업데이트
      setIsLoading(false);  
    };
  
    fetchAllProducts();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // 검색어로 상품 필터링
    let filtered = [];
    if (searchValue.trim() !== '') {
      filtered = products.filter(product =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())  // 검색어로 필터링
      );
    }
  
    // 검색 결과가 있으면 ID 기준으로 역순 정렬
    if (filtered.length > 0) {
      filtered = filtered.sort((a, b) => b.id - a.id);  // ID 기준으로 역순 정렬
    }
  
    // 검색 결과가 없을 경우 alert를 띄우고 페이지 이동을 하지 않음
    if (filtered.length === 0) {
      alert('검색 결과가 없습니다.');
    } else {
      navigate('/admin/search', { state: { filteredProducts: filtered } });
    }
  
    setSearchValue('');  // 검색어 초기화
  };
  
  // 토글 버튼 클릭 시 모달 열기/닫기
  const toggleSidebar = () => {
    setIsMobileSidebarVisible(!isMobileSidebarVisible);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  // 페이지가 변경되면 사이드바를 자동으로 닫고 서브메뉴도 초기화
  useEffect(() => {
    setIsMobileSidebarVisible(false);
    setIsSubMenuOpen(false); // 서브메뉴 초기화
  }, [location.pathname]);

  return (
    <>
      {/* 모바일에서 사이드바 상태에 따라 아이콘 변경 */}
      <MenuButton onClick={toggleSidebar}>
        {isMobileSidebarVisible ? <FaTimes /> : <FaBars />} {/* X 아이콘과 햄버거 메뉴 아이콘 전환 */}
      </MenuButton>

      <Sidebar show={isMobileSidebarVisible || window.innerWidth > 780}>
        <LogoWrapper>
          <LogoImage src={Logo} alt="Telegro Logo" />
          <LogoText>Telegro</LogoText>
        </LogoWrapper>
        <SearchBar style={{ marginTop: '2%' }}>
          <FaSearch />
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </SearchBar>
        <MenuWrapper>
          <MenuItem style={{cursor: 'default'}} className="active">
            <FaCog />
            Dashboard
          </MenuItem>

          <MenuItem onClick={() => navigate('/admin/clientmanagement')}>
            <FaCog />
            고객 관리
          </MenuItem>

          <MenuItem onClick={() => navigate('/admin/stat')}>
            <FaCog />
            상점 접속 현황
          </MenuItem>

          <MenuItem onClick={() => navigate('/admin/adminnotice')}>
            <FaCog />
            자료실
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

          <MenuItem onClick={() => navigate('/admin/adminorderlist')}>
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

          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            Log out
          </LogoutButton>
        </FooterWrapper>
      </Sidebar>
    </>
  );
};

export default AdminNav;
