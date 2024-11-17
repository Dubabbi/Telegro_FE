import React, { useEffect, useState } from 'react';
import img from '../Check/image.svg'; 
import { Postcode } from '../Postcode/Postcode'; 
import * as C from '../Cart/Cart';
import check from '/src/assets/icon/Admin/check.svg';
import checked from '/src/assets/icon/Admin/checked.svg';
import * as O from './OrderProcessStyle'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import * as PortOne from "@portone/browser-sdk/v2";

const OrderProcess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isCreditCardChecked, setIsCreditCardChecked] = useState(false);
  const [isBankTransferChecked, setIsBankTransferChecked] = useState(false);
  const [isKakaoPayChecked, setIsKakaoPayChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(''); 
  const [addressList, setAddressList] = useState([]);
  const [isDefaultAddressChecked, setIsDefaultAddressChecked] = useState(false);
  const [orderData, setOrderData] = useState(state.orderData);
  const [userDetails, setUserDetails] = useState(state.userDetails);
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
  const totalProductPrice = orderData.cartProductDTOS.reduce((acc, product) => acc + product.totalPrice, 0);
  const shippingCost = 3000; // 배송비는 고정 값
  const totalPayable = totalProductPrice + shippingCost - pointsToUse; // 최종 결제금액 계산
  useEffect(() => {
    if (!orderData) {
      alert("주문 정보가 존재하지 않습니다.");
      navigate(-1); 
    }
  }, [orderData, navigate]);
  
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
        navigate('/completeorder', { 
          state: { 
            orderDetails: productInfo,
            userDetails: {
              name: formData.name,
              email: userDetails.userEmail,
              phone: formData.phone
            },
            shippingInfo: {
              address: formData.address,
              postalCode: formData.postalCode,
              detailedAddress: formData.detailedAddress,
              request: formData.request
            },
            pointsToUse: pointsToUse,
            pointsToEarn: 100,  
            shippingCost: 3000  
          }
        });
      } 
    } catch (error) {
      console.error('Order confirmation error:', error);
      alert('주문 확정 중 오류가 발생했습니다.');
    }
  };
  

  const handlePayment = () => {
    if (!isAgreementChecked) {
      alert("구매 조건에 동의하셔야 합니다.");
      return;
    }
  
    // 주문 상품 정보를 집계하여 이름과 총 금액을 계산합니다.
    const productInfo = orderData.cartProductDTOS.reduce((acc, product) => {
      acc.name += `${product.productName} `;
      acc.total += product.totalPrice;
      return acc;
    }, { name: '', total: 0 });
  
    const { IMP } = window; 
    IMP.init('imp06338577'); 
  
    const paymentData = {
      pg: 'nice_v2.iamport00m', 
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: productInfo.total - pointsToUse, 
      name: productInfo.name.trim(), 
      buyer_name: formData.name,
      buyer_tel: formData.phone,
      buyer_email: 'user@example.com',
      buyer_addr: formData.address,
      buyer_postcode: formData.postalCode,
      m_redirect_url: '/completeorder'
    };
  
    // 결제창 호출
    IMP.request_pay(paymentData, function (response) {
      if (response.success) {
        axios.post('https://api.yoursite.com/payments/verify', {
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid
        }).then(res => {
          if (res.data.status === 'success') {
            confirmOrder();
          } else {
            alert('결제 검증 실패');
          }
        });
      } else {
        alert(`결제 실패: ${response.error_msg}`);
      }
    });
  };

  const orderCustomerInfo = userDetails ? (
    <>
      <p style={{ margin: '1%', fontSize: '1.2rem' }}>{userDetails.userName}</p>
      <p style={{ margin: '1%', fontSize: '1.2rem' }}>{userDetails.userEmail}</p>
    </>
  ) : (
    <>
      <p style={{ margin: '1%', fontSize: '1.2rem' }}>로딩 중...</p>
    </>
  );

  return (
    <>
      <O.Div></O.Div>
      <C.Title style={{width: '70%'}}><h1>결제하기</h1></C.Title>
      <O.OrderPageWrapper>
        {/* 좌측 섹션 */}
        <O.LeftSection>
          <O.BoxSection>
            <O.SectionTitle>주문 상품 정보</O.SectionTitle>
            {orderData.cartProductDTOS.map((product, index) => (
              <O.ProductInfo key={index}>
                <img src={product.coverImage} alt="상품 이미지" />
                <div>
                  <h4>{product.productName}</h4>
                  <p>옵션: {product.selectOption}</p>
                  <p>수량: {product.quantity}</p>
                  <p>{formatPrice(product.totalPrice)}원</p>
                </div>
              </O.ProductInfo>
            ))}
          </O.BoxSection>
          <O.BoxSection>
            <O.SectionTitle>주문자 정보</O.SectionTitle>
              <div>{orderCustomerInfo}</div>
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
            <span>{formatPrice(totalProductPrice)}</span>
          </O.PriceDetail>
          <O.PriceDetail>
            <span>배송비</span>
            <span>{formatPrice(shippingCost)}</span>
          </O.PriceDetail>
          <O.PriceDetail>
            <span>적립금 할인</span>
            <span style={{ color: 'red' }}>-{formatPrice(pointsToUse)}</span>
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
          <O.PriceDetail style={{ marginTop: '10px' }}>
            <O.TotalPrice>총 결제금액</O.TotalPrice>
            <O.TotalPrice>{formatPrice(totalPayable)}</O.TotalPrice>
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
            {/*<C.ConfirmButton onClick={confirmOrder}>결제하기</C.ConfirmButton>*/}
            <C.ConfirmButton onClick={handlePayment}>결제하기</C.ConfirmButton>
          </O.BoxSection>
        </O.RightSection>
      </O.OrderPageWrapper>
    </>
  );
};

export default OrderProcess;
