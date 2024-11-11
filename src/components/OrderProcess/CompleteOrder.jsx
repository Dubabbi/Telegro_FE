import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as O from './OrderProcessStyle';
import img from '../Check/image.svg';

const CompleteOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { orderDetails, userDetails, shippingInfo, pointsToUse, pointsToEarn, shippingCost } = state;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  };

  return (
    <O.CompleteOrderWrapper>
      <img src={img} alt="Order Complete" />
      <O.Title>주문이 완료되었습니다</O.Title>
      <O.OrderInfo>
      2023.11.28에 주문하신 상품의 주문번호는 <span>12524</span>입니다. 
      </O.OrderInfo>

      <O.SectionTitle style={{textAlign: 'left'}}>주문 상품</O.SectionTitle>
      <O.Table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>수량</th>
            <th>할인금액</th>
            <th>결제금액</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.products.map((product, index) => (
            <tr key={index}>
              <td><img src={product.coverImage} alt="상품 이미지" /> {product.name}</td>
              <td>{product.quantity}</td>
              <td>{formatPrice(pointsToUse)}원</td>
              <td>{formatPrice(product.totalPrice)}원</td>
            </tr>
          ))}
        </tbody>
      </O.Table>

      <O.SectionTitle style={{marginTop: '30px'}}>배송지 정보</O.SectionTitle>
      <O.InfoBox>
        <div>
          <h4>이름</h4>
          <p>{userDetails.name}</p>
          <h4>휴대전화번호</h4>
          <p>{userDetails.phone}</p>
          <h4>배송지 주소</h4>
          <p>({shippingInfo.postalCode}) {shippingInfo.address}, {shippingInfo.detailedAddress}</p>
        </div>
        <div>
          <h4>결제 정보</h4>
          <p>상품금액: <span>{formatPrice(orderDetails.total)}</span></p>
          <p>할인금액: <span>{formatPrice(pointsToUse)}원</span></p>
          <p>적립예정 포인트: <span>{pointsToEarn}P</span></p>
          <p>배송비: <span>{formatPrice(shippingCost)}원</span></p>
          <h4>총 결제 금액</h4>
          <p><span>{formatPrice(orderDetails.total - pointsToUse + shippingCost)}원</span></p>
        </div>
      </O.InfoBox>

      <O.Button onClick={() => navigate('/main')}>확인</O.Button>
    </O.CompleteOrderWrapper>
  );
};

export default CompleteOrder;
