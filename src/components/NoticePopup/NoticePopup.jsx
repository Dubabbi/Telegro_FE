import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import Img from '/src/assets/image/Landing/logo.svg'; // 로고 이미지

// 오버레이 배경 추가
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45); /* 45% 불투명도 */
  z-index: 999;
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  max-height: 600px;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px ) {
    max-width: 400px;
    max-height: 500px;
  }
  @media (max-width: 700px) {
    max-width: 350px;
    max-height: 450px;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 400px;
  }
`;

const Header = styled.div`
  background-color: #F6F8FA;
  color: #092139;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative; /* Close 버튼을 별도로 배치하기 위해 필요 */
`;

const Logo = styled.img`
  width: 37px;
  height: auto;
  align-items: center;
  margin-right: 10px;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8vw;
  @media(max-width: 800px){
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  color: #30313D;
  text-align: left;
  line-height: 1.8;
  h2{
    font-size: 1.3vw;
    font-weight: bold;
      margin-left: 1%;
    @media(max-width: 800px){
      font-size: 1.3rem;
      margin-left: 2%;
    }
  }
  p{
    font-size: 1.1vw;
      margin-left: 1%;
    @media(max-width: 800px){
      font-size: 1.2rem;
      margin-left: 2%;
    }
  }
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 2px solid #D5DBE1;
  margin: 20px 0;
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  font-size: 2vw;
  position: absolute;
  right: 4%; /* 헤더 오른쪽에 위치 */
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #D5DBE1;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #F6F8FA;
  color: #30313D;
  width: 90%;
  font-size: 1.1vw;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NoticePopup = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Overlay onClick={handleClose} />
      <PopupWrapper>
        <Header>
          <HeaderTitle>
            <Logo src={Img} alt="Telegro Logo" />
            Telegro
          </HeaderTitle>
          <CloseButton onClick={handleClose} />
        </Header>
        <Content>
        <HorizontalRule />
          <h2>공지 드립니다.</h2>
          <HorizontalRule />
          <p>공지사항의 내용입니다.</p>
          <p>공지사항 제목과 내용, 그리고 확인 및 삭제 버튼이 있습니다.</p>
          <p>다른 공지 목록은 자료실에서 확인 가능합니다.</p>
        </Content>
        <Footer>
          <ConfirmButton onClick={handleClose}>확인</ConfirmButton>
        </Footer>
      </PopupWrapper>
    </>
  );
};

export default NoticePopup;
