//ChatButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ChatButton() {
    return (
        <a href ="">
            <img
                src="https://vendor-cdn.imweb.me/images/kakao-talk-button-default.svg" alt="카카오톡 채널 채팅하기 버튼"
                width="90vw" 
                height="90vw" 
                style={{position: 'fixed', right: 30, bottom: 15, cursor: 'pointer'}}/>
        </a>
    );
}