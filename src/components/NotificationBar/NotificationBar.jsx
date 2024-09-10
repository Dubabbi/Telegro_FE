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
  font-size: 0.9rem;
  flex: 1;
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  margin-left: 10px;
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
        본사이트는 기업전용 사이트로 일반고객은 제품구매를 하실 수 없습니다. 제품문의 및 구매는 KJ대리점으로 문의하시기 바랍니다. 
        제품출고일: 매주 목요일(오후3시 접수마감) 입니다.
      </NotificationText>
      <CloseButton size={20} onClick={handleClose} />
    </NotificationWrapper>
  );
};

export default NotificationBar;
