import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

// 오버레이 배경 추가
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45); /* 10% 불투명도 */
  z-index: 999; /* 팝업보다 낮은 레이어 */
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 팝업 레이어 */
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #5A5A5A;
  color: white;
  padding: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 1rem;
  color: black;
  text-align: left;
  line-height: 1.5;
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  font-size: 1.5rem;
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ddd;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #5A5A5A;
  color: white;
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
          공지사항
          <CloseButton onClick={handleClose} />
        </Header>
        <Content>
          <h2>공지 드립니다.</h2>
          <p>공지사항의 내용입니다.</p>
          <p>여기에 자세한 내용이 포함됩니다.</p>
          <p>참고 바랍니다.</p>
        </Content>
        <Footer>
          <ConfirmButton onClick={handleClose}>확인</ConfirmButton>
        </Footer>
      </PopupWrapper>
    </>
  );
};

export default NoticePopup;
