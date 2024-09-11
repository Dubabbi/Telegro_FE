import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';
import { Postcode } from '../Postcode/Postcode';

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2); // Step 1을 완료하면 Step 2로 이동
    } else {
      console.log('Signup Attempt', { id, email, name, password, roadAddress, zipCode, detailAddress });
      // 회원가입 로직 추가 후 리다이렉트
    }
  };

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setRoadAddress(fullAddress); // 도로명 주소 설정
    setZipcode(zonecode);        // 우편번호 설정
  };

  return (
    <L.Wrapper>
      <L.LoginSection>
        <L.Title>Telegro</L.Title>
        <L.Form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
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
              <L.Button primary="true" type="submit">다음</L.Button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
              <L.InputBox style={{ textAlign: 'center'}}>
                <label style={{  marginBottom: '2%', color: '#94A3D8', fontSize: '1.3vw', fontWeight: 'bold'}}>배송지 등록</label>
                </L.InputBox>
                <L.AddressBox>
                  <label htmlFor="zipCodeText">우편번호</label>
                  <input
                    id="zipCodeText"
                    value={zipCode}
                    type="text"
                    placeholder="우편번호"
                    readOnly
                  />
                </L.AddressBox>
                <L.InputBox>
                <label htmlFor="addressText">주소</label>
                </L.InputBox>
                <div style={{width: '100%', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <L.SearchInput 
                       id="addressText"
                       type="text"
                       placeholder="주소를 검색해 주세요"
                       value={roadAddress}
                      readOnly/>
                  <L.SearchButton><Postcode onComplete={handleAddressComplete} /></L.SearchButton>
                </div>
                
                <L.AddressInput>
                  <label htmlFor="detailAddressText">상세주소</label>
                  <input 
                    id="detailAddressText"
                    value={detailAddress}
                    placeholder="상세 주소를 입력하세요" 
                    onChange={e => setDetailAddress(e.target.value)} 
                  />
                </L.AddressInput>
              </div>
              <L.Button style={{marginTop: '2%'}} primary="true" type="submit">회원가입</L.Button>
            </>
          )}
        </L.Form>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Signup;
