//ChatButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ChatButton() {
    return (
        <a href ="">
            <img
                src="https://vendor-cdn.imweb.me/images/kakao-talk-button-default.svg" alt="카카오톡 채널 채팅하기 버튼"
                width="70vw" 
                height="70vw" 
                style={{position: 'fixed', right: 25, bottom: 25, cursor: 'pointer'}}/>
        </a>
    );
}