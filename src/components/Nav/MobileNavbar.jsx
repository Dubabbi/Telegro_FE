import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCog, FaSignOutAlt, FaChevronDown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '/src/assets/image/Landing/logo.svg'; 
import Avvvatars from 'avvvatars-react';
import axios from 'axios';

export default function MobileNavbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   
  const [userInfo, setUserInfo] = useState({
    id: 'Justin Hope',
    name: '홍길동',
    avatarUrl: 'https://example.com/avatar.jpg', 
  });
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProductsByCategory = async (category, page = 0) => {
    try {
      const response = await axios.get(`https://api.telegro.kr/products`, {
        params: { category, page, size: 10 }
      });
      if (response.data.code === 20000) {
        return response.data.data.products;s
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
    const fetchAllProducts = async () => {
      const categories = ['HEADSET', 'LINE_CORD', 'RECORDER', 'ACCESSORY'];
      let allProducts = [];
      
      for (const category of categories) {
        const productsArray = await fetchProductsByCategory(category);
        allProducts = [...allProducts, ...productsArray];  
      }
  
      setProducts(allProducts);
      setIsLoading(false);  
    };
  
    fetchAllProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let filtered = [];
    if (searchValue.trim() !== '') {
      filtered = products.filter(product =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())  
      );
    }
  
    if (filtered.length > 0) {
      filtered = filtered.sort((a, b) => b.id - a.id); 
    }
  
    if (filtered.length === 0) {
      alert('검색 결과가 없습니다.');
    } else {
      navigate('/search', { state: { filteredProducts: filtered } });
    }
  
    setSearchValue(''); 
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const toggleSidebar = () => {
    setIsMobileSidebarVisible(!isMobileSidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    setIsMobileSidebarVisible(false);
    setIsSubMenuOpen(false); 
  }, [location.pathname]);

  return (
    <>
      <TopBar>
        <MenuButton onClick={toggleSidebar}>
          {isMobileSidebarVisible ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <LogoWrapper style={{cursor: 'pointer'}} onClick={() => navigate('/main')}>
          <LogoImg src={LogoImage} alt="Telegro Logo" />
          <LogoText>Telegro</LogoText>
        </LogoWrapper>
      </TopBar>

      <Sidebar show={isMobileSidebarVisible}>
        <LogoWrapper style={{opacity: '0'}}>
          <LogoImg src={LogoImage} alt="Telegro Logo" />
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
          {isLoggedIn ? (
            <ProfileWrapper onClick={() => navigate('/mypage')}>
              <Avvvatars value={userInfo.id} size={40} />
              <ProfileInfo style={{marginLeft: '10px'}}>
                <div>{userInfo.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#FFD700' }}>일반회원</div>
              </ProfileInfo>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                Log out
              </LogoutButton>
            </ProfileWrapper>
          ) : (
            <ProfileWrapper style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>
              <ProfileInfo>
                <div>로그인해주세요</div>
              </ProfileInfo>
            </ProfileWrapper>
          )}
        </FooterWrapper>
      </Sidebar>
    </>
  );
}


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
    transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(-100%)')};
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
  margin-bottom: 12%;
`;

const ProfileInfo = styled.div`
  color: white;
  font-size: 1rem;
`;

const LogoutButton = styled.div`
  color: red;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    color: #ff5a5a;
  }
`;