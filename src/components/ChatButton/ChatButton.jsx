import React, { useState, useEffect } from 'react';

export default function ChatButton() {
  const [buttonSize, setButtonSize] = useState({ width: '90vw', height: '90vw' });

  useEffect(() => {
    // 카카오 SDK가 로드되었는지 확인
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init('9d7e3bf3d02c6226c026fb519c6e9e7e'); 
      }
    };

    // SDK가 로드되었는지 체크
    if (document.readyState === 'complete') {
      initializeKakao();
    } else {
      window.addEventListener('load', initializeKakao);
    }

    const updateSize = () => {
      if (window.innerWidth <= 780) {
        setButtonSize({ width: '70px', height: '70px' });
      } else {
        setButtonSize({ width: '90vw', height: '90vw' });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('load', initializeKakao);
    };
  }, []);

  const handleChatClick = () => {
    // 카카오톡 채널과 1:1 채팅 시작
    if (window.Kakao && window.Kakao.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: '_xoqEEn', 
      });
    }
  };

  return (
    <div onClick={handleChatClick} style={{ position: 'fixed', right: 30, bottom: 16, cursor: 'pointer' }}>
      <img
        src="https://vendor-cdn.imweb.me/images/kakao-talk-button-default.svg"
        alt="카카오톡 채널 채팅하기 버튼"
        width={buttonSize.width}
        height={buttonSize.height}
      />
    </div>
  );
}
