import styled from 'styled-components';

export const BoardWrap = styled.div`
  width: 1200px;
  margin: 100px auto;
  @media (max-width: 1000px) {
    width: 100%;
    min-width: 320px;
    padding: 0 30px;
    box-sizing: border-box;
  }
`;

export const BoardTitle = styled.div`
  margin-bottom: 30px;
`;

export const BoardViewWrap = styled.div`
  width: 100%;
  border-top: 2px solid #000;
`;

export const BoardView = styled.div`
  width: 100%;
`;


export const Title = styled.div`
  position: relative; 
  padding-right: 30px; 
  margin: 0 auto;
  font-size: 1.8rem;
  padding: 20px 15px; 
  display: flex; 
  align-items: center;
  border-bottom: 1px dashed #ddd;
  @media(max-width: 780px){
    font-size: 1.6rem;
  }
`;


export const Info = styled.div`
  padding: 15px;
  border-bottom: 1px solid #999;
  font-size: 0;
`;

export const InfoItem = styled.dl`
  position: relative;
  display: inline-block;
  padding: 0 20px;
  &:first-child {
    padding-left: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 0;
    display: block;
    width: 1px;
    height: 13px;
    background: #ddd;
  }

  &:first-child::before {
    display: none;
  }
  @media(max-width: 780px){
    padding: 0 10px;
  }
`;

export const InfoItemText = styled.div`
  display: inline-block;
  font-size: 1.4rem;
  @media(max-width: 780px){
    font-size: 1.3rem;
  }
`;

export const Cont = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #000;
  line-height: 2;
  font-size: 1.3rem;
  text-align: left;
  img {
    width: 100%;
    margin: 0 auto;
    height: auto;
    object-fit: contain; 
  }
`;

export const BtWrap = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: 0;
`;

export const BtLink = styled.a`
  display: inline-block;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 2px;
  font-size: 1.4rem;

  &:first-child {
    margin-left: 0;
  }

  &.on {
    background: #000;
    color: #fff;
  }
  &:hover {
    background: #141414ae;
    color: #ccc;
  }
`;
export const DeleteBtLink = styled.a`
  color: red;
  display: inline-block;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 2px;
  font-size: 1.4rem;

  &:first-child {
    margin-left: 0;
  }

  &.on {
    background: #000;
    color: #fff;
  }
  &:hover {
    background: #f8d7da;
  }
`;

export const Section2 = styled.section`
  padding: 150px 0;
  min-width: 95%;
  width: 95%;
  min-height: 2.6vh;
  border: none;
  @media(max-width: 780px){
    max-width: 99%;
    margin-left: 0px;
    padding: 50px 10px;
  }
`

export const SubmitButton = styled.button`
  border: none;
  cursor: pointer;
  line-height: 1;
  font-size: 20px;
  background: #bbb;
  width: 20%;
  margin-left: 40%;
  color: #0d0d0d;
  border-radius: 5px;
  font-weight: bold;
  padding: 18px 32px;
  &:hover {
    background: #141414ae;
    border-radius: 5px;
    color: #ccc;
  }
`;

export const EditImg = styled.img`
  padding: 1%;
  text-align: center;
  align-items: center;
  height: 60px;
  cursor: pointer;

  @media(max-width: 780px){
    height: 40px;
  }
`;


export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #bbb;
  }
 @media(max-width: 800px){
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
`;