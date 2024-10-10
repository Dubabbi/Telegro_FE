import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '/src/assets/icon/mypage/close.svg';
import { Postcode } from '../Postcode/Postcode';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  position: relative;
  min-width: 400px;
  min-height: 70vh;
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

const SearchTitle = styled.div`
  font-size: 1.5rem;
  text-align: left;
  p{
    text-align: left;
  }
`

export default function AddressModal({ isOpen, toggleModal }) {
  const [roadAddress, setRoadAddress] = useState(''); 
  const [zipCode, setZipCode] = useState(''); 
  const [detailAddress, setDetailAddress] = useState('');

  const handleAddressSearch = () => {
    setErrors({ ...errors, roadAddress: '', zipCode: '' }); 
  };

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setRoadAddress(fullAddress);
    setZipCode(zonecode);        
  };
  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={toggleModal}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
        <Title>배송지 추가</Title>
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
        <div>
          <Button onClick={toggleModal}>취소</Button>
          <Button onClick={toggleModal}>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  ) : null;
}

