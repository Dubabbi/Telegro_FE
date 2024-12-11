import React from "react";
import styled from "styled-components";

const OrderDetail = () => {
  const orderData = {
    orderDate: "2022-04-11",
    orderNumber: "202215483214",
    customer: {
      name: "홍길동",
      contact: "010-1234-5678",
      email: "example@example.com",
    },
    shipping: {
      name: "홍길동",
      contact: "010-1234-5678",
      address: "주소",
      memo: "문 앞에 놓아주세요.",
      shippingCost: 3000,
    },
    items: [
      {
        id: 1,
        name: "상품명",
        option: "Dark / Small",
        price: 142000,
        quantity: 1,
        status: "배송완료",
      },
      {
        id: 2,
        name: "상품명",
        option: "Gift - 1개",
        price: 2000,
        quantity: 1,
        status: "배송완료",
      },
    ],
    payment: {
      totalAmount: 146500,
      discount: 4000,
      finalAmount: 142500,
      method: "신용카드",
      cardInfo: "BC카드 (**** **** **** 1234)",
    },
  };

  const handleViewReceipt = () => {
    const receiptUrl = `https://developers.nicepay.co.kr/receipt.php?tid=${orderData.payment.transactionId}`;
    window.open(receiptUrl, "_blank"); 
  };

  return (
    <MainWrapper>
    <Container>
    <Title>주문확인</Title>
      <Section>
        <SectionTitle>주문 상세 내역</SectionTitle>
        <OrderInfo>
          <div>주문일자: {orderData.orderDate}</div>
          <div>주문번호: {orderData.orderNumber}</div>
        </OrderInfo>
        <Separator />
        {orderData.items.map((item) => (
          <Item key={item.id}>
            <ItemImage />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemOption>{item.option}</ItemOption>
              <ItemPrice>
                {item.price.toLocaleString()}원 / 수량 {item.quantity}
              </ItemPrice>
            </ItemDetails>
            <ItemStatus>
              <div>{item.status}</div>
            </ItemStatus>
          </Item>
        ))}
      </Section>
      <Section>
        <SectionTitle>구매자 정보</SectionTitle>
        <Details>
          <DetailItem>주문자: {orderData.customer.name}</DetailItem>
          <DetailItem>연락처: {orderData.customer.contact}</DetailItem>
          <DetailItem>이메일: {orderData.customer.email}</DetailItem>
        </Details>
      </Section>
     <Separator />
      <Section>
        <SectionTitle>배송지 정보</SectionTitle>
        <Details>
          <DetailItem>수령인: {orderData.shipping.name}</DetailItem>
          <DetailItem>연락처: {orderData.shipping.contact}</DetailItem>
          <DetailItem>배송지: {orderData.shipping.address}</DetailItem>
          <DetailItem>배송메모: {orderData.shipping.memo}</DetailItem>
        </Details>
      </Section>
      <Separator />
      <Section>
        <SectionTitle>주문 금액 상세</SectionTitle>
        <Details>
          <DetailItem>주문금액: {orderData.payment.totalAmount.toLocaleString()}원</DetailItem>
          <DetailItem>할인금액: {orderData.payment.discount.toLocaleString()}원</DetailItem>
          <DetailItem>배송비: {orderData.shipping.shippingCost.toLocaleString()}원</DetailItem>
          <DetailItem>총 주문금액: {orderData.payment.finalAmount.toLocaleString()}원</DetailItem>
          <DetailItem>결제수단: {orderData.payment.method}</DetailItem>
          <DetailItem>{orderData.payment.cardInfo}</DetailItem>
        </Details>
      </Section>
      <Separator />
    </Container>
    </MainWrapper>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  h1 {
    font-size: 1.5rem;
  }
`;

const Points = styled.div`
  text-align: center;
`;

const Coupons = styled.div`
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 10px;
  margin-top: 4px;
  font-weight: bold;
  color: #555;
`;

const OrderInfo = styled.div`
  margin-bottom: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: #ccc;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const ItemName = styled.div`
  font-weight: bold;
`;

const ItemOption = styled.div`
  color: #555;
  margin: 5px 0;
`;

const ItemPrice = styled.div`
  color: #333;
`;

const ItemStatus = styled.div`
  text-align: right;
  margin-top: 5px;
  padding: 5px 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const Details = styled.div`
  margin-top: 10px;
`;

const DetailItem = styled.div`
  margin-bottom: 5px;
`;
const MainWrapper = styled.div`
  width: 70%; 
  margin-left: 280px;
  margin-top: 5%;
  @media(max-width: 780px){
    width: 100%; 
    margin: 5% 1%;
  }
`;
const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  @media(max-width: 780px){
    font-size: 1.9rem;
    margin-top: 10%;
  }
`;
const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

export default OrderDetail;
