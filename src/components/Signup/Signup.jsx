import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 처리 로직
    console.log('Signup Attempt', { id, email, name, password });
    // 회원가입 후 리다이렉트
    // navigate('/welcome'); 
  };

  return (
    <L.Wrapper>
      <L.LoginSection>
        <L.Title>Telegro</L.Title>
        <L.Form onSubmit={handleSubmit}>
          <L.InputBox>
            <label htmlFor="idText">아이디</label>
            <input 
              id="idText" 
              type="text" 
              placeholder="아이디를 입력하세요" 
              value={id} 
              onChange={e => setId(e.target.value)} 
            />
          </L.InputBox>
          <L.InputBox>
            <label htmlFor="emailText">이메일</label>
            <input 
              id="emailText" 
              type="email" 
              placeholder="이메일을 입력하세요" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </L.InputBox>
          <L.InputBox>
            <label htmlFor="nameText">이름</label>
            <input 
              id="nameText" 
              type="text" 
              placeholder="이름을 입력하세요" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </L.InputBox>
          <L.InputBox>
            <label htmlFor="passwordText">비밀번호</label>
            <input 
              id="passwordText" 
              type="password" 
              placeholder="숫자, 문자, 특수문자를 포함한 10자 이상" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </L.InputBox>
          <L.Button primary type="submit">회원가입</L.Button>
        </L.Form>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Signup;
