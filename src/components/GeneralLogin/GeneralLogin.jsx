import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';
import axios from 'axios';

function GeneralLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        id: id,
        password: password,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate('/main');
      } else {
        alert("로그인에 실패했습니다: ");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
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
            <div>
              <L.Text>일반고객</L.Text>
              <L.Account>            
                <L.Span color="#94A3D8">ID: guest</L.Span>
                <L.Span color="#94A3D8">PW: 0000</L.Span>
              </L.Account>
            </div>
          </div>
          <L.Button style={{backgroundColor: '#94A3D8', color: '#fff'}} type="submit" onClick={handleSubmit}>로그인</L.Button>
          <L.Button onClick={e=>navigate('/signup')}>회원가입</L.Button>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default GeneralLogin;
