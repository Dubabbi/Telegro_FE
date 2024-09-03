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
  padding: 20px 15px;
  border-bottom: 1px dashed #ddd;
  font-size: 2rem;
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
    top: 1px;
    left: 0;
    display: block;
    width: 1px;
    height: 13px;
    background: #ddd;
  }

  &:first-child::before {
    display: none;
  }
`;

export const InfoItemText = styled.div`
  display: inline-block;
  font-size: 1.4rem;
`;

export const Cont = styled.div`
  padding: 15px;
  border-bottom: 1px solid #000;
  line-height: 2;
  font-size: 1.3rem;
`;

export const BtWrap = styled.div`
  margin-top: 30px;
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