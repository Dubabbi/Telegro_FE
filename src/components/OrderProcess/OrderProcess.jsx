import React, { useState } from 'react';
import img from '../Check/image.svg'; 
import { Postcode } from '../Postcode/Postcode'; 
import * as C from '../Cart/Cart';
import check from '/src/assets/icon/Admin/check.svg';
import checked from '/src/assets/icon/Admin/checked.svg';
import * as O from './OrderProcessStyle'
import { useNavigate } from 'react-router-dom';

const OrderProcess = () => {
  const navigate = useNavigate();
  const [isCreditCardChecked, setIsCreditCardChecked] = useState(false);
  const [isBankTransferChecked, setIsBankTransferChecked] = useState(false);
  const [isKakaoPayChecked, setIsKakaoPayChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(''); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    detailedAddress: '',
    request: ''
  });

  const AddressList = {
    A: '배송지1',
    B: '배송지2',
    C: '배송지3'
  };

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setFormData({
      ...formData,
      address: fullAddress,
      postalCode: zonecode  
    });
  };
  const addressData = {
    A: { name: '홍길동', phone: '01012345678', address: '서울시 강남구', postalCode: '12345', detailedAddress: '강남대로 396' },
    B: { name: '이순신', phone: '01087654321', address: '부산시 해운대구', postalCode: '54321', detailedAddress: '해운대해변로 123' },
    C: { name: '김유신', phone: '01013572468', address: '대구시 중구', postalCode: '13579', detailedAddress: '중앙대로 456' }
  };
  
  const updateAddressFormData = (key) => {
    const selectedAddressData = addressData[key];
    if (selectedAddressData) {
      setFormData({
        name: selectedAddressData.name,
        phone: selectedAddressData.phone,
        address: selectedAddressData.address,
        postalCode: selectedAddressData.postalCode,
        detailedAddress: selectedAddressData.detailedAddress,
        request: formData.request
      });
    }
  };
  
  const handleAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked);
    if (!isAgreementChecked) { 
      updateAddressFormData(selectedAddress);
    } else { 
      setFormData({
        name: '',
        phone: '',
        address: '',
        postalCode: '',
        detailedAddress: '',
        request: ''
      });
    }
  };
  
  return (
    <>
      <O.Div></O.Div>
      <C.Title style={{width: '70%'}}><h1>결제하기</h1></C.Title>
      <O.OrderPageWrapper>
        {/* 좌측 섹션 */}
        <O.LeftSection>
          <O.BoxSection>
            <O.SectionTitle>주문 상품 정보</O.SectionTitle>
            <O.ProductInfo>
              <img src={img} alt="상품 이미지" />
              <div>
                <h4>Daily Facial Soap</h4>
                <p>₩18,000원</p>
              </div>
            </O.ProductInfo>
          </O.BoxSection>
          <O.BoxSection>
            <O.SectionTitle>주문자 정보</O.SectionTitle>
            <div>
              <p>홍길동</p>
              <p>01012345678</p>
              <p>user@imweb.me</p>
            </div>
          </O.BoxSection>
          <O.BoxSection>
            <O.SectionTitle>배송 정보</O.SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <O.CheckboxWrapper>
              <img
                src={isAgreementChecked ? checked : check}
                alt="기본 배송지 불러오기"
                onClick={handleAgreementChange}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
                <O.CheckboxLabel>기본 배송지 불러오기</O.CheckboxLabel>
              </O.CheckboxWrapper>
              <O.Select
                name="AddressList"
                value={selectedAddress} // 선택된 값 상태 반영
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">배송지 선택</option>
                {Object.entries(AddressList).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </O.Select>
            </div>
            <O.DeliveryInfoForm>
              <O.FormRow>
                <O.FormInput
                  type="text"
                  placeholder="받는 분 이름 *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <O.FormInput
                  type="text"
                  placeholder="전화번호 *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </O.FormRow>
              <O.AddressSearchRow>
                <O.AddressInput
                  type="text"
                  placeholder="주소 *"
                  value={formData.address}
                  readOnly
                />
                <O.AddressButton onClick={handleAddressComplete}>
                  <Postcode onComplete={handleAddressComplete} />
                </O.AddressButton>
              </O.AddressSearchRow>
              <O.FormRow>
                <O.FormInput
                  type="text"
                  placeholder="우편번호 *"
                  value={formData.postalCode}
                  readOnly
                />
                <O.FormInput
                  type="text"
                  placeholder="상세 주소 *"
                  value={formData.detailedAddress}
                  onChange={(e) => setFormData({ ...formData, detailedAddress: e.target.value })}
                />
              </O.FormRow>
              <O.TextArea
                placeholder="요청 사항 (선택 사항)"
                value={formData.request}
                onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              />
            </O.DeliveryInfoForm>
          </O.BoxSection>
        </O.LeftSection>

        {/* 우측 섹션 */}
        <O.RightSection>
          <O.BoxSection>
            <O.SectionTitle>최종 결제금액</O.SectionTitle>
            <O.PriceDetail>
              <span>상품 가격</span>
              <span>₩18,000원</span>
            </O.PriceDetail>
            <O.PriceDetail>
              <span>배송비</span>
              <span>₩2,500원</span>
            </O.PriceDetail>
            <O.PriceDetail>
              <span>적립금 할인</span>
              <span style={{ color: 'red' }}>-₩1,000원</span>
            </O.PriceDetail>
            <O.PriceDetailsWrapper>
            <input type="text" placeholder="사용할 적립금 입력 (0 / 3,000)" />
            <button><p>모두 사용</p></button>
          </O.PriceDetailsWrapper>
            <O.PriceDetail  style={{marginTop: '10px'}}>
              <O.TotalPrice>총 결제금액</O.TotalPrice>
              <O.TotalPrice>₩19,500원</O.TotalPrice>
            </O.PriceDetail>
            <O.PriceDetail>
              <span>포인트 적립 예정</span>
              <span>700P</span>
            </O.PriceDetail>
          </O.BoxSection>
          <O.BoxSection>
            <O.PaymentMethodWrapper>
              <O.PaymentTitle>결제 방법</O.PaymentTitle>
              <O.PaymentOption>
                <img
                  src={isCreditCardChecked ? checked : check}
                  alt="신용카드 결제"
                  onClick={() => setIsCreditCardChecked(!isCreditCardChecked)}
                  style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
                <O.CheckboxLabel>신용카드</O.CheckboxLabel>
              </O.PaymentOption>
              <O.PaymentOption>
                <img
                  src={isBankTransferChecked ? checked : check}
                  alt="무통장 입금"
                  onClick={() => setIsBankTransferChecked(!isBankTransferChecked)}
                  style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
                <O.CheckboxLabel>무통장 입금</O.CheckboxLabel>
              </O.PaymentOption>
              <O.PaymentOption>
                <img
                  src={isKakaoPayChecked ? checked : check}
                  alt="카카오페이"
                  onClick={() => setIsKakaoPayChecked(!isKakaoPayChecked)}
                  style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
                <O.CheckboxLabel>카카오페이</O.CheckboxLabel>
              </O.PaymentOption>

            </O.PaymentMethodWrapper>
            <hr />
            <O.CheckboxWrapper>
              <img
                  src={isAgreementChecked ? checked : check}
                  checked={isAgreementChecked}
                  onClick={() => setIsAgreementChecked(!isAgreementChecked)}
                  style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
                <O.CheckboxLabel>구매조건 확인 및 결제진행에 동의</O.CheckboxLabel>
            </O.CheckboxWrapper>
            <C.ConfirmButton onClick={()=>navigate('/completeorder')}>결제하기</C.ConfirmButton>
          </O.BoxSection>

        </O.RightSection>
      </O.OrderPageWrapper>
    </>
  );
};

export default OrderProcess;



{/*


  */}