import React, { useEffect, useState } from 'react';
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
  const [isSamsungPayChecked, setIsSamsungPayChecked] = useState(false);
  const [isVirtualAccountChecked, setIsVirtualAccountChecked] = useState(false);
  const [isRealTimeAccountChecked, setIsRealTimeAccountChecked] = useState(false);
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
  const [isKakaopayChecked, setIsKakaopayChecked] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    detailedAddress: '',
    request: ''
  });
  const shippingCost = 3000; 
  const totalProductPrice = orderData.cartProductDTOS.reduce((acc, product, shippingCost) => shippingCost + acc + product.totalPrice, 0);
  const totalPayable = totalProductPrice + shippingCost - pointsToUse; 
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const date = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`; 
  };
  
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
          ? "CREDIT_CARD"
          : isVirtualAccountChecked
          ? "V_BANK"
          : isRealTimeAccountChecked
          ? "BANK_TRANSFER"
          : isKakaoPayChecked
          ? "EASY_PAYMENT"
          : null,
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
        console.log('주문이 생성되었습니다.');
        return response.data.data.id;
      } 
    } catch (error) {
      console.error('Order confirmation error:', error);
      alert('주문 확정 중 오류가 발생했습니다.');
    }
  };
  
  const getPaymentOptions = (payMethod, productInfo, paymentId, orderId) => {
    const today = getTodayDate();
    let baseOptions = {
      pg: "nice_v2",
      channelKey: "channel-key-0c462650-5c1a-4f74-86d5-80a67cb512c2",
      storeId: "store-a85691d3-8516-48fe-985b-03d01942b7d7",
      pay_method: payMethod,
      merchant_uid: paymentId,
      amount: productInfo.total + shippingCost - pointsToUse,
      name: productInfo.name.trim(),
      buyer_name: formData.name,
      buyer_tel: formData.phone,
      buyer_email: formData.email || "user@example.com",
      buyer_addr: formData.address,
      buyer_postcode: formData.postalCode,
      m_redirect_url: "https://www.telegro.kr/completeorder",
      vbank_due: today,
      digital: "false",
      escrow: "true",
      custom_data: {
        orderId,
        items: orderData.cartProductDTOS.map((p) => p.id),
      },
    };
  
    if (payMethod === "card") {
      baseOptions.card = {
        installmentMonth: productInfo.total >= 50000 ? 3 : 0,
        useCardPoint: false,
        useFreeInterestFromMerchant: true,
      };
    } else if (payMethod === "vbank") {
      baseOptions.virtualAccount = {
        vbank_due: today,
      };
    } 
  
    return baseOptions;
  };
  
  
  

  const handlePayment = async () => {
    if (!isAgreementChecked) {
      alert("구매 조건에 동의하셔야 합니다.");
      return;
    }
  
    if (!orderData || !orderData.cartProductDTOS || orderData.cartProductDTOS.length === 0) {
      alert("주문 데이터가 올바르지 않습니다.");
      return;
    }
  
    const productInfo = orderData.cartProductDTOS.reduce(
      (acc, product) => {
        acc.name += `${product.productName} `;
        acc.total += product.totalPrice;
        return acc;
      },
      { name: "", total: 0 }
    );
    const orderId = await confirmOrder();
  
    if (!orderId) {
      alert("주문 생성에 실패했습니다. 결제를 진행할 수 없습니다.");
      return;
    }

    const payMethod = isCreditCardChecked
    ? "card"
    : isVirtualAccountChecked
    ? "V_BANK"
    : isRealTimeAccountChecked
    ? "BANK_TRANSFER"
    : isKakaoPayChecked
    ? "kakaopay"
    : isSamsungPayChecked 
    ? "samsungpay"
    : null;
  
  if (!payMethod) {
    alert("결제 방법을 선택해주세요.");
    return;
  }
  
  
  
    const paymentId = `payment-${new Date().getTime()}`;
  
    const paymentOptions = getPaymentOptions(payMethod, productInfo, paymentId, orderId);
  
    const { IMP } = window;
    IMP.init("imp06338577");
  
    IMP.request_pay(paymentOptions, async (rsp) => {
      if (!rsp.error_code) {
        try {
          const verifyResponse = await axios.post(
            `https://api.telegro.kr/api/v1/order/payment/${rsp.imp_uid}`,
            {
              orderId,
              price: productInfo.total - pointsToUse,
              cartIds: orderData.cartProductDTOS.map((p) => p.id),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
  
          const { code, response } = verifyResponse.data;
  
          if (code === 0 && response.status === "paid") {
            alert("결제가 완료되었습니다.");
            navigate("/completeorder", {
              state: {
                orderDetails: orderData,
                userDetails: formData,
                pointsToUse: pointsToUse,
                pointsToEarn: 100,
              },
            });
          } else {
            alert("결제 검증에 실패했습니다.");
          }
        } catch (error) {
          console.error("결제 검증 중 오류:", error);
          alert("결제 검증 중 오류가 발생했습니다.");
        }
      } else {
        console.error("결제 실패:", rsp);
        alert(`결제 실패: ${rsp.error_msg || "알 수 없는 오류"}`);
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
                setIsRealTimeAccountChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>신용카드</O.CheckboxLabel>
          </O.PaymentOption>
          <O.PaymentOption>
            <img
              src={isVirtualAccountChecked ? checked : check}
              alt="가상 계좌"
              onClick={() => {
                setIsVirtualAccountChecked(true);
                setIsRealTimeAccountChecked(false);
                setIsCreditCardChecked(false);
                setIsKakaoPayChecked(false);
                setIsSamsungPayChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>가상 계좌(세금계산서 발행 - 업체)</O.CheckboxLabel>
          </O.PaymentOption>

          <O.PaymentOption>
            <img
              src={isRealTimeAccountChecked ? checked : check}
              alt="실시간 계좌이체"
              onClick={() => {
                setIsRealTimeAccountChecked(true);
                setIsVirtualAccountChecked(false);
                setIsCreditCardChecked(false);
                setIsKakaoPayChecked(false);
                setIsSamsungPayChecked(false);
              }}
              style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            />
            <O.CheckboxLabel>실시간 계좌이체</O.CheckboxLabel>
          </O.PaymentOption>

          <O.PaymentOption>
            <img
              src={isSamsungPayChecked ? checked : check}
              alt="삼성페이"
              onClick={() => {
                setIsSamsungPayChecked(true);
                setIsCreditCardChecked(false);
                setIsBankTransferChecked(false);
                setIsKakaoPayChecked(false);
                setIsVirtualAccountChecked(false);
                setIsRealTimeAccountChecked(false);
              }}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
            <O.CheckboxLabel>삼성페이</O.CheckboxLabel>
          </O.PaymentOption>
          <O.PaymentOption>
            <img
              src={isKakaopayChecked ? checked : check}
              alt="카카오페이"
              onClick={() => {
                setIsKakaopayChecked(true);
                setIsCreditCardChecked(false);
                setIsBankTransferChecked(false);
                setIsSamsungPayChecked(false);
                setIsRealTimeAccountChecked(false);
              }}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
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
            <C.ConfirmButton onClick={handlePayment}>결제하기</C.ConfirmButton>
          </O.BoxSection>
        </O.RightSection>
      </O.OrderPageWrapper>
    </>
  );
};

export default OrderProcess;
