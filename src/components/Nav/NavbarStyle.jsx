import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
  @media (max-width: 1000px) {
    
  }
  @media (max-width: 780px) {
    
  }
  @media (max-width: 500px) {
    
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%; 
  @media (max-width: 500px) {
    width: 95%;
  }
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
    @media (max-width: 780px) {
      padding: 0 8px;
    }

    a {
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
      transition: color 0.3s ease;
      @media (max-width: 780px) {
        font-size: 1rem;
      }

      &:hover {
        color: #bbb;
      }
    }
  }
`;

export const SecondaryNavContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  padding: 10px 5%;
  align-items: center;
  @media (max-width: 500px) {
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
      font-size: 0.9rem;
      text-decoration: none;
      white-space: nowrap;
      &:hover {
        color: #bbb;
      }
    }
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
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
