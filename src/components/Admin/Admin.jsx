import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';

// 로그인 컴포넌트
function Admin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 처리 로직
    console.log('Login Attempt', id, password);
    // navigate('/dashboard'); // 로그인 성공 후 리다이렉트
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
          <L.Button primary type="submit" onClick={() => navigate('/admin/stat')}>로그인</L.Button>
          
        </L.Form>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Admin;
