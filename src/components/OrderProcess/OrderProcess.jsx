import React, { useEffect, useState } from 'react';
import img from '../Check/image.svg'; 
import { Postcode } from '../Postcode/Postcode'; 
import * as C from '../Cart/Cart';
import check from '/src/assets/icon/Admin/check.svg';
import checked from '/src/assets/icon/Admin/checked.svg';
import * as O from './OrderProcessStyle'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderProcess = () => {
  const navigate = useNavigate();
  const [isCreditCardChecked, setIsCreditCardChecked] = useState(false);
  const [isBankTransferChecked, setIsBankTransferChecked] = useState(false);
  const [isKakaoPayChecked, setIsKakaoPayChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(''); 
  const [addressList, setAddressList] = useState([]);
  const [isDefaultAddressChecked, setIsDefaultAddressChecked] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [point, setPoint] = useState(0); 
  const [pointsToUse, setPointsToUse] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    detailedAddress: '',
    request: ''
  });

  
  useEffect(() => {
    const fetchAddressList = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/api/users/my', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.code === 20000) {
          const userPhone = response.data.data.phone;
          const addresses = response.data.data.addressList;
          const userPoints = response.data.data.point;
          setAddressList(addresses);
          setPoint(userPoints);
          const defaultAddress = addresses.find((addr) => addr.isDefault);
          if (defaultAddress) {
            updateAddressFormData(defaultAddress, userPhone);
          } else {
            setFormData((prev) => ({ ...prev, phone: userPhone })); 
          }
        }
      } catch (error) {
        console.error("Error fetching address list:", error);
      }
    };
    
    fetchAddressList();
  }, []);

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setFormData({
      ...formData,
      address: fullAddress,
      postalCode: zonecode  
    });
  };

  const updateAddressFormData = (addressData, phone = formData.phone) => {
    setFormData((prev) => ({
      ...prev,
      name: addressData.name,
      phone: phone,
      address: addressData.address,
      postalCode: addressData.zipcode,
      detailedAddress: addressData.addressDetail,
      request: prev.request
    }));
  };

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    const selectedAddressData = addressList.find((addr) => addr.id.toString() === selectedId);
    if (selectedAddressData) {
      updateAddressFormData(selectedAddressData);
      setSelectedAddress(selectedId);
    }
  };

  const handleLoadDefaultAddress = () => {
    setIsDefaultAddressChecked((prev) => !prev);
    if (!isDefaultAddressChecked) { 
      const defaultAddress = addressList.find((addr) => addr.isDefault);
      if (defaultAddress) {
        updateAddressFormData(defaultAddress);
      } else {
        alert("기본 배송지가 없습니다.");
      }
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
  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  }
  const handlePointsToUseChange = (e) => {
    const inputPoints = Math.min(parseInt(e.target.value || '0', 10), point);
    setPointsToUse(inputPoints);
  };
  
  const handleAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked);
  };
  const confirmOrder = async () => {
    if (!isAgreementChecked) {
      alert("구매 조건에 동의하셔야 합니다.");
      return;
    }
    try {
      const response = await axios.post(
        'https://api.telegro.kr/api/orders/done', 
        {
          deliveryAddress: {
            address: formData.address,
            addressDetail: formData.detailedAddress,
            zipcode: formData.postalCode,
          },
          request: formData.request,
          shoppingCost: 3000,
          pointsToUse: 0,
          pointsToEarn: 100,
          paymentMethod: isCreditCardChecked
            ? 'CREDIT_CARD'
            : isBankTransferChecked
            ? 'BANK_TRANSFER'
            : 'EASY_PAYMENT'
        },
        { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
  
      if (response.status === 200) {
        alert('주문이 완료되었습니다.');
        navigate('/completeorder');
      } 
    } catch (error) {
      console.error('Order confirmation error:', error);
      alert('주문 확정 중 오류가 발생했습니다.');
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
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '5%'}}><p>옵션</p><p>수량</p></div>
                <p>₩18,000원</p>
              </div>
            </O.ProductInfo>
          </O.BoxSection>
          <O.BoxSection>
            <O.SectionTitle>주문자 정보</O.SectionTitle>
            <div>
              <p style={{margin: '1%', fontSize: '1.2rem'}}>홍길동</p>
              <p style={{margin: '1%', fontSize: '1.2rem'}}>{formData.phone}</p>
              <p style={{margin: '1%', fontSize: '1.2rem'}}>user@imweb.me</p>
            </div>
          </O.BoxSection>
          <O.BoxSection>
            <O.SectionTitle>배송 정보</O.SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <O.CheckboxWrapper>
              <img
                src={isDefaultAddressChecked ? checked : check} 
                alt="기본 배송지 불러오기"
                onClick={handleLoadDefaultAddress}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
              <O.CheckboxLabel>기본 배송지 불러오기</O.CheckboxLabel>
            </O.CheckboxWrapper>
              <O.Select
                name="AddressList"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                <option value="">배송지 선택</option>
                {addressList.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.name}
                  </option>
                ))}
              </O.Select>
            </div>
            <O.DeliveryInfoForm>
              {/* 배송 정보 입력 필드 */}
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

        {/* 우측 결제 및 총 결제금액 */}
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
              <span style={{ color: 'red' }}>-₩{pointsToUse.toLocaleString()}원</span>
            </O.PriceDetail>
            <O.PriceDetailsWrapper>
            <input
              type="number"
              placeholder={`사용할 적립금 입력 (0 / ${point})`}
              value={pointsToUse === 0 ? '' : pointsToUse}
              onChange={handlePointsToUseChange}
            />
            <button onClick={() => setPointsToUse(point)}>모두 사용</button>
          </O.PriceDetailsWrapper>
            <O.PriceDetail style={{marginTop: '10px'}}>
              <O.TotalPrice>총 결제금액</O.TotalPrice>
              <O.TotalPrice>{formatPrice(19500 - pointsToUse)}원</O.TotalPrice>
            </O.PriceDetail>
            <O.PriceDetail>
              <span>포인트 적립 예정</span>
              <span>700P</span>
            </O.PriceDetail>
          </O.BoxSection>
          <O.BoxSection>
          <O.PaymentTitle>결제 방법</O.PaymentTitle>
          <O.PaymentOption>
            <img
              src={isCreditCardChecked ? checked : check}
              alt="신용카드 결제"
              onClick={() => {
                setIsCreditCardChecked(true);
                setIsBankTransferChecked(false);
                setIsKakaoPayChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>신용카드</O.CheckboxLabel>
          </O.PaymentOption>
          <O.PaymentOption>
            <img
              src={isBankTransferChecked ? checked : check}
              alt="무통장 입금"
              onClick={() => {
                setIsBankTransferChecked(true);
                setIsCreditCardChecked(false);
                setIsKakaoPayChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>무통장 입금(세금계산서 발행 - 업체)</O.CheckboxLabel>
          </O.PaymentOption>
          <O.PaymentOption>
            <img
              src={isKakaoPayChecked ? checked : check}
              alt="카카오페이"
              onClick={() => {
                setIsKakaoPayChecked(true);
                setIsCreditCardChecked(false);
                setIsBankTransferChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>카카오페이</O.CheckboxLabel>
          </O.PaymentOption>
            <hr />
            <O.CheckboxWrapper>
              <img
                src={isAgreementChecked ? checked : check} 
                alt="구매 조건 동의"
                onClick={handleAgreementChange}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
              <O.CheckboxLabel>구매조건 확인 및 결제진행에 동의</O.CheckboxLabel>
            </O.CheckboxWrapper>
            <C.ConfirmButton onClick={confirmOrder}>결제하기</C.ConfirmButton>
          </O.BoxSection>
        </O.RightSection>
      </O.OrderPageWrapper>
    </>
  );
};

export default OrderProcess;
