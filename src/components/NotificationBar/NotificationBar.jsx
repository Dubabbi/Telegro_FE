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
  @media (max-width: 768px) {
    padding: 1%;
  }
`;

const NotificationText = styled.div`
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CloseButton = styled(FaTimes)`
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
