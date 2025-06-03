import styled from 'styled-components';

export const TopBar = styled.div`
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

export const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const MenuButton = styled.button`
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

export const Sidebar = styled.div`
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

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3%;
  text-align: center;
  flex-direction: row;
  margin-bottom: 4%;
`;

export const LogoText = styled.h1`
  color: #ccc;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #E0E0E0;
  width: 90%;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 30px;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  padding-left: 10px;
`;

export const MenuWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export const MenuItem = styled.div`
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

export const SubMenu = styled.div`
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

export const SubMenuWrapper = styled.div`
  position: relative;
`;

export const FooterWrapper = styled.div`
  margin-top: auto;
  width: 100%;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #303030;
  border-radius: 10px;
  margin-bottom: 12%;
`;

export const ProfileInfo = styled.div`
  color: white;
  font-size: 1rem;
`;

export const LogoutButton = styled.div`
  color: red;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    color: #ff5a5a;
  }
`;