import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const NavWrapper = styled.div`
  top: 0;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding: 1%;
  margin: 0;
`;

export const Logo = styled.a`
  width: 200px;
  font-size: 3rem;
  color: white;
  text-align: center;
  font-weight: bold;
  flex-shrink: 0;
`;

export const Inline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 10%;
`

export const Content = styled.div`
    h1{
        font-size: 3rem;
        font-weight: bold;
    }

    p{
        font-size: 1.6rem;
        margin-top: 3%;
    }
`

export const Img = styled.img`
    max-width: 50%;
    height: auto;
`

export const LandingWrapper = styled.div`
    background-color: #F2F4F8;
    font-family: Roboto;
`

export const ButtonWrapper = styled.div`
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 3%;
`

export const FirstButton = styled.button`
    background-color: #0F62FE;
    color: #fff;
    border: 1px solid #0F62FE;
    border-radius: 0.2rem;
    font-size: 1.7rem;
    padding: 2% 3%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p{
        align-items: center;
        margin: 1%;
    }
    img{
        max-width: 25%;
        margin: 1%;
        align-items: center;
    }
`

export const SecondButton = styled.button`
    background-color: #ffffff;
    color: #0F62FE;
    border-radius: 0.2rem;
    border: 1px solid #0F62FE;
    font-size: 1.7rem;
    padding: 2% 3%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p{
        align-items: center;
        margin: 1%;
    }
    img{
        max-width: 25%;
        margin: 1%;
        align-items: center;
    }
`