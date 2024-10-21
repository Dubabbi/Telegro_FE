import React from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; 
import { useNavigate } from 'react-router-dom';
import LogoImage from '/src/assets/image/Landing/logo.svg'; 
const CompleteOrderWrapper = styled.div`
  width: 77%;
  margin: 2% auto;
  text-align: center;
  padding-top: 150px;

  @media (max-width: 780px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

const OrderInfo = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;

  span {
    color: #4D44B5;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  font-size: 1rem;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    vertical-align: middle; /* 셀 내용의 수직 중앙 정렬 */
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    text-align: left;
  }

  img {
    width: 50px;
    height: 50px;
    vertical-align: middle; /* 이미지도 수직 중앙 정렬 */
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: left;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  div {
    width: 48%;
    text-align: left;

    h4 {
      margin-top: 15px;
      font-size: 1.2rem;
      font-weight: bold;
      color: #4D44B5;
    }

    p {
      margin-bottom: 10px;
      margin-top: 10px;
    }

    span {
      font-weight: bold;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;

    div {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: rgba(77, 68, 181, 0.6);  /* 호버 시 배경을 진한 보라색으로 */
    color: #fff;    
  }
`;

const CompleteOrder = () => {
const navigate = useNavigate();
  return (
    <CompleteOrderWrapper>
      <img src={img} alt="Order Complete" />
      <Title>주문이 완료되었습니다</Title>
      <OrderInfo>
        2023.11.28 주문하신 상품의 주문번호는 <span>12524</span>입니다.
      </OrderInfo>

      <SectionTitle>주문 상품</SectionTitle>
      <Table>
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
      </Table>

      <SectionTitle style={{marginTop: '30px'}}>배송지 정보</SectionTitle>
      <InfoBox>
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
      </InfoBox>

      <Button onClick={()=>navigate('/main')}>확인</Button>
    </CompleteOrderWrapper>
  );
};

export default CompleteOrder;
