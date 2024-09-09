import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(20, 20, 20, 0.9);
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-bottom: 100px;
  padding-top: 5px;
`;

export const Logo = styled.a`
  width: 300px;
  height: 70px;
  line-height: 60px;
  font-size: 4.5rem;
  color: white;
  text-align: center;
  font-weight: bold;
  flex-shrink: 0;
`;

export const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export const MainNav = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  margin: 0;
  align-items: center;
  
  li {
    position: relative;
    padding: 0 25px;
    padding-top: 22px;
    height: 100%;
    align-items: center;
    transition: background 0.5s;
    &:hover {
      background-color: #6C6D6D;
      > ul {
        visibility: visible;       
        opacity: 1;                
        transform: translateY(0);  
      }
    }
  }

  a {
    font-size: 17px;
    color: white;
    align-items: center;
    text-decoration: none;
    display: block;
  }

  ul {
    position: absolute;
    left: 0;
    top: 100%;
    background: #ffffff;
    width: 250%;
    margin: 0;
    visibility: hidden;            
    opacity: 0;                    
    transform: translateY(20px);   
    transition: visibility 0s, opacity 0.5s ease, transform 0.5s ease; 

    li {
      display: block;
      width: 100%;
      margin: 2%;
      padding: 10px;
      font-size: 1rem;
      &:hover {
        background-color: transparent;
        transition: color 0.5s, margin-left 0.5s;
        color: #aaa;
        align-items: center;
        margin-left: 4%;
      }
      a {
      font-size: 1.3rem;
        display: block;
        color: inherit;
      }    
    }
  }
`;

export const StyledButton = styled(Button)`
    position: absolute;
    top: 50%;
    right: 5%; 
    transform: translateY(-50%);
    height: 30px; 
    width: 30px; 
    font-size: 1rem; 
    background-color: #fefefe; 
    border-radius: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        background: #F8F9FA;
        transition: 0.5s;
      }
`;

export const SearchWindow = styled.div`
  position: absolute;
  top: 70px;
  transform: translateX(-10%);
  right: 0;
  justify-content: flex-end;
  width: 100%;
  max-width: 350px;
  padding: 10px;
  color: #fff;
  z-index: 1001;
`;

export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  color: #fff;
  align-items: center;
  max-width: 300px;
  padding: 1%;
`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;

  input::placeholder {
    color: #eee;
    padding-left: 2%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #fff;
  }
`;

export const BoardSearchArea = styled.div`
  justify-content: flex-end;
  margin: 15px 0;
  max-height: 3%;
`