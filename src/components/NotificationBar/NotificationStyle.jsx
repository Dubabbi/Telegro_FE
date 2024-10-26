import styled from "styled-components";
import { FaTimes } from 'react-icons/fa';

export const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #5A5A5A;
  color: white;
  text-align: center;
  padding: 0.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  @media (max-width: 768px) {
    padding: 1%;
  }
`;

export const NotificationText = styled.div`
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;



export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 999;
`;

export const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  height: 600px;
  max-height: 90%;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    max-width: 90%;
    max-height: 520px;
  }
`;

export const Header = styled.div`
  background-color: #F6F8FA;
  color: #092139;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
`;

export const Logo = styled.img`
  width: 37px;
  height: auto;
  align-items: center;
  margin-right: 10px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  @media (max-width: 800px) {
    font-size: 1.7rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 15px 30px;
  color: #30313D;
  text-align: center;
  line-height: 1.8;
  overflow-y: auto;
  max-height: calc(100% - 100px);
  
  h2 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-left: 1%;
    @media (max-width: 800px) {
      font-size: 1.6rem;
      margin-left: 2%;
    }
  }

  p {
    font-size: 1.3rem;
    margin-left: 1%;
    @media (max-width: 800px) {
      font-size: 1.2rem;
      margin-left: 2%;
    }
  }
  
  img {
    max-width: 100%;
    margin: 0 auto;
  }
`;

export const HorizontalRule = styled.hr`
  border: none;
  border-top: 2px solid #D5DBE1;
  margin: 20px 0;
  line-height: 1.7;
`;

export const PoPupCloseButton = styled(FaTimes)`
  cursor: pointer;
  font-size: 2.5rem;
  position: absolute;
  right: 6%;
  &:hover {
    color: #5351af;
  }
`;
export const CloseButton = styled(FaTimes)`
  cursor: pointer;
  margin-right: -3%;
  margin-left: 2%;
  &:hover{
    color: #7675df;
  }
  @media (max-width: 768px) {
    margin-right: 2px;
  }
`;
export const Footer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  gap: 2%;
  justify-content: center;
  border-top: 1px solid #D5DBE1;
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #F6F8FA;
  color: #30313D;
  width: 90%;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #E9EEF3;
    color: #5351af;
  }
  @media (max-width: 780px) {
    font-size: 1.3rem;
  }
`;
