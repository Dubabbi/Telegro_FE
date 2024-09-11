import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/* Navbar Wrapper */
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
`;

/* Navigation Container (Logo + Main Nav + Avatar) */
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%; /* Adjust as per your needs to control width */
`;

/* Logo Styling */
export const Logo = styled.a`
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  text-decoration: none;
`;

/* Main Navigation Links */
export const MainNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: auto; /* Pushes navigation to the right */
  padding: 0;

  li {
    padding: 0 20px;

    a {
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #bbb; /* Lighter hover color */
      }
    }
  }
`;

/* Secondary Navigation (for categories like 헤드셋, 라인코드) */
export const SecondaryNav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  
  li {
    padding: 0 15px;

    a {
      color: white;
      font-size: 1rem;
      text-decoration: none;

      &:hover {
        color: #bbb;
      }
    }
  }
`;

/* Search Wrapper */
export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  padding-left: 20px;
`;

/* Search Form Wrapper */
export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
`;

/* Search Input Field */
export const SearchInput = styled.input`
  width: 80%;
  padding: 8px 10px;
  border: 1px solid #444;
  border-radius: 20px;
  color: white;
  background-color: black;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #777;
  }

  &::placeholder {
    color: #bbb;
  }
`;

/* Search Button */
export const StyledButton = styled.button`
  background: #fff;
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
