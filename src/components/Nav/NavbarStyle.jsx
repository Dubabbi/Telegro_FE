import styled from 'styled-components';

export const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 150px;
`;

export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;  // 상품들이 세로로 나열되도록 설정
  align-items: center;  // 중앙 정렬
  padding-top: 200px;
  min-height: 100vh;

  h1 {
    font-size: 2rem;
    color: #0000ff;
    text-align: center;
    font-weight: bold;
  }
  @media(max-width: 780px){
    padding-top: 20px;
  }
`;

export const ProductItem = styled.div`
  display: flex; 
  flex-direction: row;  
  align-items: center; 
  justify-content: space-between;  
  width: 90%; 
  cursor: pointer;
  max-width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;  // 텍스트를 왼쪽 정렬
  padding: 10px;
  margin-bottom: 20px;  // 각 상품 간의 간격 설정
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 120px;  // 이미지의 고정 너비
    height: 120px;  // 이미지의 고정 높이
    object-fit: cover;
    border-radius: 8px;  // 이미지의 둥근 모서리
    margin-right: 20px;  // 이미지와 텍스트 간의 간격
  }

  p {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;  // 텍스트의 여백 제거
    color: #333;
    flex-grow: 1;  // 제목이 공간을 넓게 차지하도록 설정
  }

  span {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    margin-left: 20px;  // 가격과 텍스트 간의 간격 설정
  }
`;
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const Logo = styled.a`
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  text-decoration: none;
`;

export const MainNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0;

  li {
    padding: 0 30px;
    white-space: nowrap;

    a {
      color: white;
      font-size: 1.4rem;
      font-weight: bold;
      text-decoration: none;
      &:hover {
        color: #94A3D8;
      }
    }
  }

  @media (max-width: 780px) {
    display: none; /* 780px 이하에서 메인 네비게이션을 숨김 */
  }
`;

export const SecondaryNavContainer = styled.div`
  display: flex;
  margin-top: 1%;
  justify-content: space-between; 
  width: 100%;
  padding: 10px 5%;
  align-items: center;
  @media (max-width: 780px) {
    padding: 0 2%;
  }
`;

export const SecondaryNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
    li {
    padding: 0 30px;
    @media (max-width: 500px) {
      padding: 0 5%;
    }
    a {
      color: white;
      font-size: 1.2rem;
      text-decoration: none;
      white-space: nowrap;
      &:hover {
        color: #94A3D8;
      }
    }
  }
  @media(max-width: 780px){
       
  }
`;



export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 250px;
`;

export const SearchInput = styled.input`
  width: 80%;
  padding: 8px 10px;
  border: 1px solid #444;
  border-radius: 20px;
  background-color: black;
  color: white;
`;

export const StyledButton = styled.button`
  background: #fff;
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 20px;
`;

export const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 60%;
  height: 100vh;
  background-color: #4F4F4F;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  z-index: 2000;

  li {
    margin: 20px 0;
    a {
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
  z-index: 2000;

  @media (max-width: 780px) {
    display: block;
  }
`;
