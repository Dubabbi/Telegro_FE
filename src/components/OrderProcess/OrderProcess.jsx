import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; // Adjust the actual image path
import { Postcode } from '../Postcode/Postcode';

const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2% auto;
`;

const LeftSection = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DeliveryInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddressSearchRow = styled(FormRow)`
  display: flex;
  align-items: center;
`;

const AddressButton = styled.button`
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 100px;
`;

const RightSection = styled.div`
  width: 35%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrderTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const PriceDetailsWrapper = styled.div`
  padding: 10px 0;
  border-top: 1px solid #dcdcdc;
  margin-top: 20px;
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4d44b5;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const PaymentMethodWrapper = styled.div`
  margin-top: 20px;
`;

const PaymentTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin-top: 5%;
  margin-left: 12%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.7rem;
    font-weight: bold;
  }
`;

const OrderProcess = () => {
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    detailedAddress: '',
    request: ''
  });

  const handleDefaultAddress = () => {
    if (isDefaultChecked) {
      setFormData({
        name: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123',
        postalCode: '06234',
        detailedAddress: 'A동 101호',
        request: ''
      });
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
      <div style={{ width: '100%', minHeight: '22.6vh', border: 'none' }}></div>
      <Title><h1 style={{ fontSize: '1.5vw' }}>주문 관리</h1></Title>
      
      <OrderPageWrapper>
        {/* 좌측 배송 정보 입력란 */}
        <LeftSection>
          <SectionTitle>배송 정보</SectionTitle>
          <CheckboxWrapper>
            <input
              type="checkbox"
              checked={isDefaultChecked}
              onChange={() => {
                setIsDefaultChecked(!isDefaultChecked);
                handleDefaultAddress();
              }}
            />
            <CheckboxLabel>기본 배송지 불러오기</CheckboxLabel>
          </CheckboxWrapper>
          <DeliveryInfoForm>
            <FormRow>
              <FormInput
                type="text"
                placeholder="받는 분 이름 *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <FormInput
                type="text"
                placeholder="전화번호 *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </FormRow>
            <FormRow>
              <FormInput
                type="text"
                placeholder="주소 *"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </FormRow>
            <AddressSearchRow>
              <FormInput
                type="text"
                placeholder="우편번호 *"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
              <AddressButton>주소 검색</AddressButton>
            </AddressSearchRow>
            <FormRow>
              <FormInput
                type="text"
                placeholder="상세 주소 *"
                value={formData.detailedAddress}
                onChange={(e) => setFormData({ ...formData, detailedAddress: e.target.value })}
              />
            </FormRow>
            <TextArea
              placeholder="요청 사항 (선택 사항)"
              value={formData.request}
              onChange={(e) => setFormData({ ...formData, request: e.target.value })}
            />
          </DeliveryInfoForm>
        </LeftSection>

        {/* 우측 주문 금액 및 결제 수단 영역 */}
        <RightSection>
          <OrderTitle>주문 금액</OrderTitle>
          <PriceDetail>
            <span>총 상품 금액</span>
            <span>₩880,000원</span>
          </PriceDetail>
          <PriceDetail>
            <span>할인 금액</span>
            <span style={{ color: 'red' }}>-₩80,000원</span>
          </PriceDetail>
          <PriceDetail>
            <span>배송비</span>
            <span>₩0원</span>
          </PriceDetail>
          <hr />
          <PriceDetail>
            <TotalPrice>합계</TotalPrice>
            <TotalPrice>₩800,000원</TotalPrice>
          </PriceDetail>
          <PriceDetail>
            <span>적립금</span>
            <span>₩8,000원</span>
          </PriceDetail>

          {/* 결제 수단 선택 */}
          <PaymentMethodWrapper>
            <PaymentTitle>결제 수단</PaymentTitle>
            <PaymentOption>
              <RadioButton type="radio" name="payment" /> 신용카드
            </PaymentOption>
            <PaymentOption>
              <RadioButton type="radio" name="payment" /> 무통장 입금
            </PaymentOption>
            <PaymentOption>
              <RadioButton type="radio" name="payment" /> 카카오페이
            </PaymentOption>
          </PaymentMethodWrapper>

          {/* 구매하기 버튼 */}
          <ConfirmButton>구매하기</ConfirmButton>
        </RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default OrderProcess;