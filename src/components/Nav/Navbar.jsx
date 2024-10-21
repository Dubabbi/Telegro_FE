import React, { useState, useEffect } from 'react';
import * as N from './NavbarStyle';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react';
import axios from 'axios';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);  // 검색 결과를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState({
    id: 'Justin Hope',
    phone: '010-1234-5678',
    email: 'example@email.com',
    name: '홍길동',
    avatarUrl: 'https://example.com/avatar.jpg' 
  });

  // 로그인 여부를 확인하는 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // 컴포넌트가 로드될 때 로그인 상태를 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);
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
    const fetchAllProducts = async () => {
      const categories = ['HEADSET', 'LINE_CORD', 'RECORDER', 'ACCESSORY'];
      let allProducts = [];
      
      for (const category of categories) {
        const products = await fetchProductsByCategory(category);
        allProducts = [...allProducts, ...products];
      }
  
      setProducts(allProducts);
      setIsLoading(false);  // 로딩 완료
    };
  
    fetchAllProducts();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let filtered = [];
    if (searchValue.trim() !== '') {
      filtered = products.filter(product => 
        product.productName.toLowerCase().includes(searchValue.toLowerCase())  // 검색어로 필터링
      );
    }

    // 검색 결과가 없을 경우 alert를 띄우고 페이지 이동을 하지 않음
    if (filtered.length === 0) {
      alert('검색 결과가 없습니다.');
    } else {
      // 검색 결과 페이지로 이동하고, 필터링된 결과를 state로 전달
      navigate('/search', { state: { filteredProducts: filtered } });
    }
    
    setSearchValue('');  // 검색어 초기화
  };

  return (
    <N.NavWrapper>
      <N.NavContainer>
        <N.Logo href="/main">Telegro</N.Logo>
        <N.MainNav>
          <li><a href="/main">Home</a></li>
          {!isLoggedIn ? (
            <li><a href="/login">로그인</a></li>
          ) : (
            <li><a onClick={(e) => { e.preventDefault(); handleLogout(); }}>로그아웃</a></li>
          )}
          <li><a href="/cart">장바구니</a></li>
          <li><a href="mailto:Telegro@telegro.com">Contact Us</a></li>
        </N.MainNav>
        {isLoggedIn && <Link to="/mypage"><Avvvatars value={userInfo.username} style="Shapes" size={40} /></Link>}
      </N.NavContainer>

      <N.SecondaryNavContainer>
        <N.SecondaryNav>
          <li><a href="/headset">헤드셋</a></li>
          <li><a href="/lineCord">라인코드</a></li>
          <li><a href="/recording">녹음기기</a></li>
          <li><a href="/accessory">악세서리</a></li>
          <li><a href="/notice">자료실</a></li>
        </N.SecondaryNav>
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
      </N.SecondaryNavContainer>
    </N.NavWrapper>
  );
}
