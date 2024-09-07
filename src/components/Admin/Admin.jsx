import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fix;
  padding: 6% 0;
  margin: 0;
  justify-content: center;
  background-color: #ccc;
`;

const LoginSection = styled.section`
  width: 38%;
  max-width: 558px;
  height: 80vh;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 60px 80px;
  border-radius: 10px;
  position: relative;
  border-radius: 1rem;
  z-index: 2;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const Text = styled.p`
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 9px;
  white-space: nowrap;
  color: #94A3D8;
  cursor: pointer;
  text-decoration : underline;
`;

const Account = styled.div`
  margin-bottom: 17px;
  border-radius: 0.7rem;
  color: white;
  padding: 3% 4%;
  display: inline-block;
  white-space: nowrap;
`;

const Span = styled.span`
  background-color: ${props => props.color};
  font-size: 13px;
  white-space: nowrap;
  padding: 2px 5px;
  border-radius: 4px;
  margin-right: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const InputBox = styled.div`
  margin-bottom: 14px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 6px;
  }
  input {
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    font-size: 18px;
    border-radius: 4px;
    &:focus {
      outline: 2.5px solid #94A3D8;
      border: none;
    }
    &::placeholder {
      color: #B4B4B4;
      font-size: 16px;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 14px;
  background-color: ${props => props.primary ? '#94A3D8' : '#FFFFFF'};
  color: ${props => props.primary ? '#FFFFFF' : '#000000'};
  border: ${props => props.primary ? 'none' : '1px solid #E0E0E0'};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #94A3D8;
  }
`;

const Link = styled.a`
  margin-top: -35px;
  color: #94A3D8;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

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
    <Wrapper>
      <LoginSection>
        <Title>Telegro</Title>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <label htmlFor="idText">아이디</label>
            <input id="idText" type="text" placeholder="아이디를 입력하세요" value={id} onChange={e => setId(e.target.value)} />
          </InputBox>
          <InputBox>
            <label htmlFor="passwordText">비밀번호</label>
            <input id="passwordText" type="password" placeholder="숫자, 문자, 특수문자를 포함한 10자 이상" value={password} onChange={e => setPassword(e.target.value)} />
          </InputBox>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CheckboxContainer style={{alignItems: 'center'}}>
            <Checkbox type="checkbox" id="checkId" />
            <CheckboxLabel htmlFor="checkId">아이디 저장</CheckboxLabel>
          </CheckboxContainer>
          <div>
          <Text><a href="/">일반고객으로 로그인</a></Text>

        </div>
          </div>
          <Button primary type="submit">로그인</Button>
          <Button onClick={() => navigate('/register')}>회원가입</Button>
        </Form>
      </LoginSection>
    </Wrapper>
  );
}

export default Admin;
