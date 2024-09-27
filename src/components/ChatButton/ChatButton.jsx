import React, { useState, useEffect } from 'react';

export default function ChatButton() {
  const [buttonSize, setButtonSize] = useState({ width: '90vw', height: '90vw' });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 780) {
        setButtonSize({ width: '70px', height: '70px' });
      } else {
        setButtonSize({ width: '90vw', height: '90vw' });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // 초기 크기 설정

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <a href="">
      <img
        src="https://vendor-cdn.imweb.me/images/kakao-talk-button-default.svg"
        alt="카카오톡 채널 채팅하기 버튼"
        width={buttonSize.width}
        height={buttonSize.height}
        style={{ position: 'fixed', right: 30, bottom: 16, cursor: 'pointer' }}
      />
    </a>
  );
}
