import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const NotificationWrapper = styled.div`
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
`;

const NotificationText = styled.div`
  font-size: 1vw; /* 기본적으로 화면 너비의 4% */

  @media (max-width: 768px) {
    font-size: 2vw; /* 화면 너비가 768px 이하일 때는 6%로 설정 */
  }

  @media (max-width: 480px) {
    font-size: 2vw; /* 화면 너비가 480px 이하일 때는 8%로 설정 */
  }
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  margin-right: -3%;
  margin-left: 2%;
`;

const NotificationBar = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <NotificationWrapper>
      <NotificationText>
       본사이트는 기업(고객) 구매 전용 사이트입니다. 제품 구매 및 문의 사항은 텔레그로 취급점으로 문의 바랍니다.
      제품 출고 마감: 오전 12:00 접수 마감.
      </NotificationText>
      <CloseButton size={20} onClick={handleClose} />
    </NotificationWrapper>
  );
};

export default NotificationBar;
