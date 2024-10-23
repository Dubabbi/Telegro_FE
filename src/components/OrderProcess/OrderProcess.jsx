import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; 
import { Postcode } from '../Postcode/Postcode'; 
import * as C from '../Cart/Cart';
import { useNavigate } from 'react-router-dom';

export const Div = styled.div`
  width: 100%;
  min-height: 160px;
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
  padding: 20px;
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

const RightSection = styled.div`
  width: 45%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 100%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h4 {
    font-size: 1.2rem;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 5px 0;
  }
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
const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
export const PriceDetailsWrapper = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  input{
    width: 74%;
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button{
    padding: 9px 20px;
    background-color: #000;
    color: #fff;
    width: 24%;
    border-radius: 5px;
    text-align: center;
  }
  p{
    white-space: nowrap;
    margin: 1%;
    text-align: center;
  }
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
  @media (max-width: 800px) {
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

const BoxSection = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
`;

const OrderProcess = () => {
  const navigate = useNavigate();
  const [isCreditCardChecked, setIsCreditCardChecked] = useState(false);
  const [isBankTransferChecked, setIsBankTransferChecked] = useState(false);
  const [isKakaoPayChecked, setIsKakaoPayChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(''); // 선택된 배송지 관리
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
      <C.Title style={{paddingLeft: '20px'}}><h1>결제하기</h1></C.Title>
      <OrderPageWrapper>
        {/* 좌측 섹션 */}
        <LeftSection>
          <BoxSection>
            <SectionTitle>주문 상품 정보</SectionTitle>
            <ProductInfo>
              <img src={img} alt="상품 이미지" />
              <div>
                <h4>Daily Facial Soap</h4>
                <p>₩18,000원</p>
              </div>
            </ProductInfo>
          </BoxSection>
          <BoxSection>
            <SectionTitle>주문자 정보</SectionTitle>
            <div>
              <p>홍길동</p>
              <p>01012345678</p>
              <p>user@imweb.me</p>
            </div>
          </BoxSection>
          <BoxSection>
            <SectionTitle>배송 정보</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={false}
                  onChange={() => {}}
                />
                <CheckboxLabel>기본 배송지 불러오기</CheckboxLabel>
              </CheckboxWrapper>
              <Select
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
          </BoxSection>
        </LeftSection>

        {/* 우측 섹션 */}
        <RightSection>
          <BoxSection>
            <SectionTitle>최종 결제금액</SectionTitle>
            <PriceDetail>
              <span>상품 가격</span>
              <span>₩18,000원</span>
            </PriceDetail>
            <PriceDetail>
              <span>배송비</span>
              <span>₩2,500원</span>
            </PriceDetail>
            <PriceDetail>
              <span>적립금 할인</span>
              <span style={{ color: 'red' }}>-₩1,000원</span>
            </PriceDetail>
            <PriceDetailsWrapper>
            <input type="text" placeholder="사용할 적립금 입력" />
            <button><p>모두 사용</p></button>
          </PriceDetailsWrapper>
            <PriceDetail  style={{marginTop: '10px'}}>
              <TotalPrice>총 결제금액</TotalPrice>
              <TotalPrice>₩19,500원</TotalPrice>
            </PriceDetail>
            <PriceDetail>
              <span>포인트 적립 예정</span>
              <span>700P</span>
            </PriceDetail>
          </BoxSection>
          <BoxSection>
            <PaymentMethodWrapper>
              <PaymentTitle>결제 방법</PaymentTitle>
              <PaymentOption>
                <Checkbox
                  type="checkbox"
                  checked={isCreditCardChecked}
                  onChange={() => setIsCreditCardChecked(!isCreditCardChecked)}
                />
                <CheckboxLabel>신용카드</CheckboxLabel>
              </PaymentOption>
              <PaymentOption>
                <Checkbox
                  type="checkbox"
                  checked={isBankTransferChecked}
                  onChange={() => setIsBankTransferChecked(!isBankTransferChecked)}
                />
                <CheckboxLabel>무통장 입금</CheckboxLabel>
              </PaymentOption>
              <PaymentOption>
                <Checkbox
                  type="checkbox"
                  checked={isKakaoPayChecked}
                  onChange={() => setIsKakaoPayChecked(!isKakaoPayChecked)}
                />
                <CheckboxLabel>카카오페이</CheckboxLabel>
              </PaymentOption>
            </PaymentMethodWrapper>
            <hr />
            <CheckboxWrapper>
            <Checkbox
                type="checkbox"
                checked={isAgreementChecked}
                onChange={() => setIsAgreementChecked(!isAgreementChecked)}
              />
                <CheckboxLabel>구매조건 확인 및 결제진행에 동의</CheckboxLabel>
            </CheckboxWrapper>
            <C.ConfirmButton onClick={()=>navigate('/completeorder')}>결제하기</C.ConfirmButton>
          </BoxSection>

        </RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default OrderProcess;

{/*


  */}