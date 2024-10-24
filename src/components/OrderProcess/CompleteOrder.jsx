import React from 'react';
import * as O from './OrderProcessStyle';
import img from '../Check/image.svg'; 
import { useNavigate } from 'react-router-dom';

const CompleteOrder = () => {
const navigate = useNavigate();
  return (
    <O.CompleteOrderWrapper>
      <img src={img} alt="Order Complete" />
      <O.Title>주문이 완료되었습니다</O.Title>
      <O.OrderInfo>
        2023.11.28 주문하신 상품의 주문번호는 <span>12524</span>입니다.
      </O.OrderInfo>

      <O.SectionTitle style={{TextAlign: 'left'}}>주문 상품</O.SectionTitle>
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
          <tr>
            <td><img src={img} alt="상품 이미지" /> 핸디 텀블러 – 베이비핑크</td>
            <td>1</td>
            <td>0원</td>
            <td>9,900원</td>
          </tr>
          <tr>
            <td><img src={img} alt="상품 이미지" /> Wireless Over Ear Headphone</td>
            <td>1</td>
            <td>0원</td>
            <td>1,700원</td>
          </tr>
        </tbody>
      </O.Table>

      <O.SectionTitle style={{marginTop: '30px'}}>배송지 정보</O.SectionTitle>
      <O.InfoBox>
        <div>
          <h4>이름</h4>
          <p>홍길동</p>
          <h4>휴대전화번호</h4>
          <p>01012341234</p>
          <h4>배송지 주소</h4>
          <p>(우편번호) 상세주소 뫄뫄뫄</p>
        </div>

        <div>
          <h4>결제 정보</h4>
          <p>상품금액: <span>11,600원</span></p>
          <p>할인금액: <span>0원</span></p>
          <p>적립예정 포인트: <span>1160P</span></p>
          <p>배송비: <span>0원</span></p>
          <h4>총 결제 금액</h4>
          <p><span>11,600원</span></p>
        </div>
      </O.InfoBox>

      <O.Button onClick={()=>navigate('/main')}>확인</O.Button>
    </O.CompleteOrderWrapper>
  );
};

export default CompleteOrder;
