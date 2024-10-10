import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; // Adjust the actual image path
import { Postcode } from '../Postcode/Postcode'; // 주소 검색 컴포넌트
import * as C from '../Cart/Cart';

export const Div = styled.div`
  width: 100%;
  min-height: 15.6vh;
  border: none;
  @media (max-width: 780px) {
    max-height: 4vh;
    min-height: 6vh;
  }
`;
export const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 77%;
  margin: 2% auto;

  @media (max-width: 780px) {
    flex-direction: column;
    width: 90%;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  background-color: #f8f9fa;
  background-color: #fff;
  padding: 2%;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 780px) {
    width: 100%;
    margin-bottom: 20px;
  }
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

const AddressInput = styled.input`
  width: 68%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddressSearchRow = styled(FormRow)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  flex-direction: row;
`;

const AddressButton = styled.button`
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  width: 30%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 100px;
`;


const OrderTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
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
export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #bbb;
  }
 @media(max-width: 800px){
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
`;
export const Select = styled.select`
  width: 50%;
  border: 1px solid #ddd;
  max-height: 30px;
  min-height: 30px;
  border-radius: 5px;
  font-size: 1rem;
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

const OrderProcess = () => {
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(''); // 선택된 배송지 관리
  const handleChange = (e) => {
    const selectedKey = e.target.value;
    const selectedAddressValue = AddressList[selectedKey];

    setSelectedAddress(selectedKey);
  };
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
  // Postcode로부터 주소와 우편번호 가져오는 함수
  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setFormData({
      ...formData,
      address: fullAddress, // 도로명 주소 설정
      postalCode: zonecode  // 우편번호 설정
    });
  };

  return (
    <>
      <Div></Div>
      <C.Title><h1>주문 관리</h1></C.Title>
      <OrderPageWrapper>
        {/* 좌측 배송 정보 입력란 */}
        <LeftSection>
          <SectionTitle>배송 정보</SectionTitle>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={isDefaultChecked}
              onChange={() => {
                setIsDefaultChecked(!isDefaultChecked);
                handleDefaultAddress();
              }}
          />
            <CheckboxLabel>기본 배송지 불러오기</CheckboxLabel>
          </CheckboxWrapper>
          <Select
              name="AddressList"
              value={selectedAddress} // 선택된 값 상태 반영
              onChange={handleChange}
            >
              <option value="">배송지 선택</option>
              {Object.entries(AddressList).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Select>
          </div>
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
            <AddressSearchRow>
              <AddressInput
                type="text"
                placeholder="주소 *"
                value={formData.address}
                readOnly
              />
              <AddressButton onClick={handleAddressComplete}>
                <Postcode onComplete={handleAddressComplete} />
              </AddressButton>
            </AddressSearchRow>
            <FormRow>
              <FormInput
                type="text"
                placeholder="우편번호 *"
                value={formData.postalCode}
                readOnly
              />
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
        <C.RightSection>
          <OrderTitle>결제 수단</OrderTitle>
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
          <C.ConfirmButton>구매하기</C.ConfirmButton>
        </C.RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default OrderProcess;
