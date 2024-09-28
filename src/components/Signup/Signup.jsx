import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as L from '../Login/LoginStyle';
import { Postcode } from '../Postcode/Postcode';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  // Step 1 유효성 검사
  const validateStep1 = () => {
    let errors = {};

    if (!id.trim()) {
      errors.id = '아이디를 입력하세요.';
    }
    if (!email.trim()) {
      errors.email = '이메일을 입력하세요.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '유효한 이메일 주소를 입력하세요.';
    }
    if (!name.trim()) {
      errors.name = '이름을 입력하세요.';
    }
    if (!password.trim()) {
      errors.password = '비밀번호를 입력하세요.';
    } else if (password.length < 10 || !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{10,}$/.test(password)) {
      errors.password = '비밀번호는 숫자, 문자, 특수문자를 포함한 10자 이상이어야 합니다.';
    }

    return errors;
  };

  // Step 2 유효성 검사
  const validateStep2 = () => {
    let errors = {};

    if (!phoneNumber.trim()) {
      errors.phoneNumber = '휴대폰 번호를 입력하세요.';
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      errors.phoneNumber = '유효한 휴대폰 번호를 입력하세요 (형식: 010-1234-5678).';
    }
    if (!roadAddress.trim()) {
      errors.roadAddress = '주소를 입력하세요.';
    }
    if (!zipCode.trim()) {
      errors.zipCode = '우편번호를 입력하세요.';
    }
    if (!detailAddress.trim()) {
      errors.detailAddress = '상세 주소를 입력하세요.';
    }

    return errors;
  };

  //https://thingproxy.freeboard.io/fetch/

  const handleSignupClick = async () => {
    try {
      const response = await axios.post("/proxy/auth/signup", {
        userid: id,
        username: name,
        password: password,
        phone: phoneNumber,
        email: email,
        address: roadAddress,
        zipCode: zipCode,
        addressDetail: detailAddress,
      });
      if (response.status === 200) {
        navigate("/generallogin");
        alert("회원가입에 성공했습니다.");
      } else if (response.status === 409) {
        alert("등록된 회원입니다."); 
      } 
    } catch (error) {
      console.error("Error while signing up:", error);
    }
  };

  // Submit 처리
  const handleSubmit = (event) => {
    event.preventDefault();

    if (step === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
      } else {
        setErrors({});
        setStep(2); // Step 1이 유효하면 Step 2로 이동
      }
    } 
  };

  // 주소 검색 버튼 클릭 시 실행
  const handleAddressSearch = () => {
    setErrors({ ...errors, roadAddress: '', zipCode: '' }); // 주소 관련 유효성 검사 메시지 제거
  };

  // Postcode로부터 주소와 우편번호 가져오는 함수
  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setRoadAddress(fullAddress); // 도로명 주소 설정
    setZipcode(zonecode);        // 우편번호 설정
  };

  return (
    <L.Wrapper>
      <L.LoginSection>
        <L.Title>Telegro</L.Title>
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
                {errors.id && <L.ErrorText>{errors.id}</L.ErrorText>}
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
                {errors.email && <L.ErrorText>{errors.email}</L.ErrorText>}
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
                {errors.name && <L.ErrorText>{errors.name}</L.ErrorText>}
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
                {errors.password && <L.ErrorText>{errors.password}</L.ErrorText>}
              </L.InputBox>
              <L.Button2  type="button" onClick={handleSubmit}>다음</L.Button2>
            </>
          )}

          {step === 2 && (
            <>
              <L.InputBox>
                <label>휴대폰 번호</label>
                <input
                  placeholder="휴대폰 번호"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && <L.ErrorText>{errors.phoneNumber}</L.ErrorText>}
              </L.InputBox>
              <L.InputBox>
                <label htmlFor="addressText">주소</label>
                <input
                  id="addressText"
                  value={roadAddress}
                  type="text"
                  placeholder="주소를 검색해 주세요."
                  readOnly
                />
                {errors.roadAddress && <L.ErrorText>{errors.roadAddress}</L.ErrorText>}
              </L.InputBox>
              <L.AddressBox>
                <label htmlFor="zipCodeText">우편번호</label>
              </L.AddressBox>
              <div style={{ width: '100%', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <L.SearchInput 
                  id="zipCodeText"
                  type="text"
                  placeholder="우편번호"
                  value={zipCode}
                  readOnly
                />
                <L.SearchButton onClick={handleAddressSearch}><Postcode onComplete={handleAddressComplete} /></L.SearchButton>
              </div>
              
              <L.InputBox>
                <label htmlFor="detailAddressText">상세주소</label>
                <input
                  id="detailAddressText"
                  value={detailAddress}
                  placeholder="상세 주소를 입력하세요" 
                  onChange={e => setDetailAddress(e.target.value)} 
                />
                {errors.detailAddress && <L.ErrorText>{errors.detailAddress}</L.ErrorText>}
              </L.InputBox>
              <L.Button2 onClick={handleSignupClick} style={{ marginTop: '2%' }} primary={true} type="submit">회원가입</L.Button2>
            </>
          )}
             <div>
              <L.Text><a style={{color: '#0F62FE', textDecoration: 'underline', textDecorationColor: '#0F62FE'}} href="/generallogin">
                <span>이미 계정이 있으신가요?</span> <span style={{fontWeight: 'bold'}}>로그인</span>
                </a></L.Text>
            </div>
      </L.LoginSection>
    </L.Wrapper>
  );
}

export default Signup;
