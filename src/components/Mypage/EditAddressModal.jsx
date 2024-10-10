import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '/src/assets/icon/mypage/close.svg';
import { Postcode } from '../Postcode/Postcode';
import * as L from '../Login/LoginStyle';
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding-top: 6.5%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  @media(max-width: 780px){
    padding-top: 3%;
  }
`;

const ModalContent = styled.div`
  position: relative;
  min-width: 400px;
  min-height: 400px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media(max-width: 1024px){
    height: 40vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 7%;
  right: 5%;
  img {
    width: 25px;
    height: 25px;
  }
`;

const Title = styled.h1`
  font-size: 1.7rem;
  color: #333333;
  font-weight: bold;
`;

const InputField = styled.input`
  width: 90%;
  padding: 10px;
  height: 40px;
  border: 1.5px solid #cccccc;
  border-radius: 5px;

  &:focus {
    border: 1.5px solid #777777;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 20px;
  border: none;
  background-color: #ACAACC;
  color: white;
  cursor: pointer;
  width: 110px;

  &:hover {
     background-color: hsl(240, 8%, 70%);
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  height: 40px;
  border: 1.5px solid #cccccc;
  border-radius: 5px;
  background-color: #ACAACC;
  color: white;
  cursor: pointer;
  width: 25%;
  &:hover {
     background-color: hsl(240, 8%, 70%);
  }
`;


export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const CheckboxLabel = styled.label`
  font-size: 1.5rem;
  cursor: pointer;
    @media(max-width: 800px){
      font-size: 1.1rem;
    }
`;

export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #ACAACC;
  }
 @media(max-width: 800px){
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
`;

export default function EditAddressModal({ isOpen, toggleEditModal }) {
  const [roadAddress, setRoadAddress] = useState(''); 
  const [zipCode, setZipCode] = useState(''); 
  const [detailAddress, setDetailAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false); 
  const handleAddressSearch = () => {
    setErrors({ ...errors, roadAddress: '', zipCode: '' }); 
  };
  const handleCheckboxChange = () => {
    setIsDefault(!isDefault); 
  };
  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setRoadAddress(fullAddress);
    setZipCode(zonecode);        
  };
  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={toggleEditModal}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
        <Title>배송지 수정</Title>
        <InputField 
          placeholder="별명 입력"
        />
        <InputField 
          placeholder="주소"
          id="addressText"
          value={roadAddress}
          type="text"
          readOnly
        />
        <div style={{display: 'flex', flexDirection: 'row', width: '90%', height: '40px', justifyContent: 'space-between'}}>
        <InputField 
          style={{width: '73%'}}
          placeholder="우편번호"
          id="zipCodeText"
          type="text"
          value={zipCode}
          readOnly
        />
        <SearchButton onClick={handleAddressSearch}><Postcode onComplete={handleAddressComplete} /></SearchButton>
        </div>
        <InputField 
          placeholder="상세 주소"
          id="detailAddressText"
          value={detailAddress}
          onChange={e => setDetailAddress(e.target.value)} 
        />
           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <CheckboxContainer style={{alignItems: 'center'}}>
              <Checkbox
                type="checkbox" 
                id="defaultAddressCheckbox" 
                checked={isDefault} 
                onChange={handleCheckboxChange} 
              />
              <CheckboxLabel htmlFor="defaultAddressCheckbox">기본 배송지로 설정</CheckboxLabel>
            </CheckboxContainer>
            </div>
        <div>
          <Button onClick={toggleEditModal}>취소</Button>
          <Button onClick={toggleEditModal}>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  ) : null;
}

