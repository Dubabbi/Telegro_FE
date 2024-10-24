import React, { useState } from 'react';
import CloseIcon from '/src/assets/icon/mypage/close.svg';
import { Postcode } from '../Postcode/Postcode';
import axios from 'axios';
import * as M from './ModalStyle';

export default function AddressModal({ isOpen, toggleModal, onAddAddress }) {
  const [nickname, setNickname] = useState(''); 
  const [fullAddress, setFullAddress] = useState(''); 
  const [zipCode, setZipCode] = useState(''); 
  const [detailAddress, setDetailAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddressSearch = () => {
    setIsSearching(true);
  };

  const handleCheckboxChange = () => {
    setIsDefault(!isDefault);
  };

  const handleAddressComplete = (data) => {
    setFullAddress(data.fullAddress);
    setZipCode(data.zonecode);
    setIsSearching(false);
  };

  const setAsDefault = async (addressId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `https://api.telegro.kr/api/users/address/${addressId}/set-default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.code === 20000) {
        console.log('기본 배송지 설정 완료');
        window.location.reload();
      } else {
        alert('기본 배송지 설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      alert('기본 배송지 설정 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    const newAddress = {
      name: nickname,
      address: fullAddress,
      addressDetail: detailAddress,
      zipcode: zipCode,
      isDefault,
    };

    try {
      const response = await axios.post('https://api.telegro.kr/api/users/address', newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.code === 20000) {
        const addedAddress = {
          ...newAddress,
          id: response.data.data.id,
        };

        if (isDefault) {
          await setAsDefault(addedAddress.id); 
        }

        onAddAddress(addedAddress);
        toggleModal(); 
      } else {
        alert('주소 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('주소 추가 중 오류가 발생했습니다.');
    }
  };

  return isOpen ? (
  <M.ModalOverlay>
    <M.ModalContent>
      <M.CloseButton onClick={toggleModal}>
        <img src={CloseIcon} alt="Close" />
      </M.CloseButton>
      <M.Title>배송지 추가</M.Title>
      <M.InputField 
        placeholder="별명 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <M.InputField 
        placeholder="주소"
        id="addressText"
        value={fullAddress}
        type="text"
        readOnly
      />
      <div style={{display: 'flex', flexDirection: 'row', width: '90%', height: '40px', justifyContent: 'space-between'}}>
        <M.InputField 
          style={{width: '73%'}}
          placeholder="우편번호"
          id="zipCodeText"
          type="text"
          value={zipCode}
          readOnly
        />
        <M.SearchButton onClick={handleAddressSearch}>
          <Postcode onComplete={handleAddressComplete}>주소 검색</Postcode>
        </M.SearchButton>
      </div>
      <M.InputField 
        placeholder="상세 주소"
        id="detailAddressText"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)} 
      />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <M.CheckboxContainer style={{alignItems: 'center'}}>
          <M.Checkbox
            type="checkbox" 
            id="defaultAddressCheckbox" 
            checked={isDefault} 
            onChange={handleCheckboxChange} 
          />
          <M.CheckboxLabel htmlFor="defaultAddressCheckbox">기본 배송지로 설정</M.CheckboxLabel>
        </M.CheckboxContainer>
      </div>
      <div>
        <M.Button onClick={toggleModal}>취소</M.Button>
        <M.Button onClick={handleSubmit}>확인</M.Button>
      </div>
    </M.ModalContent>
  </M.ModalOverlay>
  ):null;
}
