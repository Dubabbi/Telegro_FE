import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';
import axios from 'axios';

function GeneralLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://api.telegro.kr/auth/login", {
        id: id,
        password: password,
      });
  
      console.log('Response:', response); // 응답 전체 확인
      console.log('Response Data:', response.data); // 응답 데이터 확인
  
      // 응답 데이터에서 accessToken 확인
      if (response.status === 200 && response.data.data.accessToken) {
        console.log('Login successful, accessToken:', response.data.data.accessToken);
        localStorage.setItem('token', response.data.data.accessToken); // accessToken으로 변경
        navigate('/main'); 
        alert("로그인에 성공했습니다.");
      } else if (response.status === 401) {
        console.log('Invalid credentials');
        alert("잘못된 인증입니다."); 
      } 
    } catch (error) {
      console.error('Login error:', error); // 에러 로그 추가
      alert("로그인 실패: " + (error.response?.data?.message || "네트워크 오류")); 
    }
  };

  return (
    <L.Wrapper>
      <L.LoginSection>
        <L.Title>Telegro</L.Title>
          <L.InputBox>
            <label htmlFor="idText">아이디</label>
            <input id="idText" type="text" placeholder="아이디를 입력하세요" value={id} onChange={e => setId(e.target.value)} />
          </L.InputBox>
          <L.InputBox>
            <label htmlFor="passwordText">비밀번호</label>
            <input id="passwordText" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={e => setPassword(e.target.value)} />
          </L.InputBox>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <L.CheckboxContainer>
              <L.Checkbox type="checkbox" id="checkId" />
              <L.CheckboxLabel htmlFor="checkId">아이디 저장</L.CheckboxLabel>
            </L.CheckboxContainer>

          </div>
          <L.Button2 type="submit" onClick={handleSubmit}>로그인</L.Button2>
          <L.Button onClick={e=>navigate('/signup')}>회원가입</L.Button>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default GeneralLogin;
