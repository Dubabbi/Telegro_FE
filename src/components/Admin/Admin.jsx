import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';
import axios from 'axios';

function Admin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/proxy/auth/login", {
        id: id,
        password: password,
      });
  
      console.log('Response:', response); // 응답 전체 확인
      console.log('Response Data:', response.data); // 응답 데이터 확인
  
      // 응답 데이터에서 accessToken 확인
      if (response.status === 200 && response.data.data.accessToken) {
        console.log('Login successful, accessToken:', response.data.data.accessToken);
        localStorage.setItem('token', response.data.data.accessToken); // accessToken으로 변경
        navigate('/admin/stat'); 
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
        <L.Title style={{fontSize: '1.5rem', color: '#94A3D8'}}>관리자 모드</L.Title>
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
          <L.Text style={{color: '#0F62FE', textDecoration: 'underline', textDecorationColor: '#0F62FE'}}><a href="/">일반고객으로 로그인</a></L.Text>

        </div>
          </div>
          <L.Button2 type="submit" >로그인</L.Button2>
          
        </L.Form>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Admin;
