//MainStyle.jsx

import styled from 'styled-components';

export const ContactWrapper = styled.div`
    color: white;
    font-size: 2rem;
    text-align: center;
    align-items: center;
    padding: 4% 11%;
    display: flex;
    width: 100%;
    minHeight: 20vh;
    background-color: #333;
    flex-direction: row;
    justify-content: space-around;
    @media (max-width: 1024px) {
        max-width: 90%;
        padding: 0 2%;
        margin: 5%;
    }
    p{
        font-size: 1.5rem;
        color: grey;
        text-align: left;
    }
    h1{
        font-size: 3rem;
        color: white;
        text-align: left;
    }
`

export const Contact = styled.div`
    background-color: #000;
    text-align: center;
    align-items: center;
    padding: 1% 3%;
    display: flex;
    &:hover{
        background-color: #555;
    }
    @media (max-width: 1024px) {
        max-width: 90%;
        padding: 0 2%;
        margin: 5%;
    }
`


export const TitleWrap = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #262626;
  letter-spacing: 0px;
  line-height: 1.5;
`;

export const OptionLink = styled.a`
    display: block;
    background-color: #4B518F;
    text-align: center;
    line-height: 1.7;
    padding: 8%;
    margin-bottom: 30%;
    border-radius: 10px;
    text-decoration: none;
    color: #EEFFFF;
    font-size: 2rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #5D639A;
    }
`;

export const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    img {
        margin: 7% auto 0;
        max-width: 50%;
    }
`

