import React, { useState } from 'react';
import * as B from './NotificationStyle';

const NotificationBar = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <B.NotificationWrapper>
      <B.NotificationText>
       본사이트는 기업(고객) 구매 전용 사이트입니다. 제품 구매 및 문의 사항은 텔레그로 취급점으로 문의 바랍니다.
      제품 출고 마감: 오전 12:00 접수 마감.
      </B.NotificationText>
      <B.CloseButton size={20} onClick={handleClose} />
    </B.NotificationWrapper>
  );
};

export default NotificationBar;

