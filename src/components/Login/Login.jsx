import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from './LoginStyle';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        id: id,
        password: password,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // 응답 코드에 따라 처리 분기
      if (response.status === 200 && response.data.code === 20000) {
        localStorage.setItem('token', response.data.data.accessToken); // 토큰 저장
        navigate('/main'); // 메인 페이지로 이동
        alert("로그인에 성공했습니다.");
      } else if (response.status === 401 && response.data.code === 40102) {
        alert("아이디/비밀번호가 적절하지 않습니다."); // 인증 실패 메시지
      } else {
        alert("로그인에 실패했습니다: " + response.data.message); // 기타 실패 메시지
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 실패: " + (error.response?.data?.message || "네트워크 오류")); // 네트워크 오류 처리
    }
  };

  return (
    <L.Wrapper>
      <L.LoginSection>
        <L.Title>Telegro</L.Title>
        <L.Form onSubmit={handleSubmit}>
          <L.InputBox>
            <label htmlFor="idText">아이디</label>
            <input id="idText" type="text" placeholder="아이디를 입력하세요" value={id} onChange={e => setId(e.target.value)} />
          </L.InputBox>
          <L.InputBox>
            <label htmlFor="passwordText">비밀번호</label>
            <input id="passwordText" type="password" placeholder="숫자, 문자, 특수문자를 포함한 10자 이상" value={password} onChange={e => setPassword(e.target.value)} />
          </L.InputBox>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <L.CheckboxContainer style={{alignItems: 'center'}}>
              <L.Checkbox type="checkbox" id="checkId" />
              <L.CheckboxLabel htmlFor="checkId">아이디 저장</L.CheckboxLabel>
            </L.CheckboxContainer>
            <div>
              <L.Text><a style={{color: '#0F62FE', textDecoration: 'underline', textDecorationColor: '#0F62FE'}} href="/generallogin">일반고객으로 로그인</a></L.Text>
            </div>
          </div>
          <L.Button style={{backgroundColor: '#94A3D8', color: '#fff'}} type="submit">로그인</L.Button>
        </L.Form>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Login;
