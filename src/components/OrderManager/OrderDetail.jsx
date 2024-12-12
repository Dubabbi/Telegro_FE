import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { orderId } = useParams(); 
  const paymentMethodMap = {
    'card': '카드',
    'vbank': '가상계좌',
    'trans': '계좌이체'
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.telegro.kr/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.code === 20000 && response.data.data) {
          setOrderData(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError("주문 상세 정보를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleViewReceipt = () => {
    if (orderData?.paymentMethod?.receipt_url) {
      const TID = orderData.paymentMethod.receipt_url; 
      window.open(TID, "_blank"); 
    } else {
      alert("영수증을 볼 수 없습니다. TID가 누락되었습니다.");
    }
  };

  const formatNumber = (value) => {
    return value !== undefined && value !== null 
      ? Number(value).toLocaleString()
      : '0';
  };

  const formatDate = (dateString) => {
    return dateString 
      ? new Date(dateString).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '정보 없음';
  };

  if (loading) return <Loading>로딩 중...</Loading>;
  if (error) return <Error>{error}</Error>;
  if (!orderData) return null;

  return (
    <MainWrapper>
      <Container>
        <Title>주문확인</Title>
        
        <Section>
          <SectionTitle>주문 상세 내역</SectionTitle>
          <Details>
            <DetailItem>주문일자: {formatDate(orderData.orderDate)}</DetailItem>
            <DetailItem>주문번호: {orderData.imp_uid || '정보 없음'}</DetailItem>
            <DetailItem>주문상태: {orderData.orderStatus || '정보 없음'}</DetailItem>
          </Details>
          <Separator />
          
          {orderData.products && orderData.products.map((product) => (
            <Item key={product.productId}>
              <ItemImage src={product.coverImage} alt={product.productName} />
              <ItemDetails>
                <ItemName>{product.productName || '상품명 없음'}</ItemName>
                <ItemOption>
                  모델: {product.productModel || '정보 없음'}
                  <br />
                  옵션: {product.selectOption || '옵션 없음'}
                </ItemOption>
                <ItemPrice>
                  {formatNumber(product.productPrice)}원 / 수량 {product.quantity || 0}
                </ItemPrice>
              </ItemDetails>
            </Item>
          ))}
        </Section>

        <Section>
          <SectionTitle>구매자 정보</SectionTitle>
          {orderData.user && (
            <Details>
              <DetailItem>주문자: {orderData.user.name || '정보 없음'}</DetailItem>
              <DetailItem>연락처: {orderData.user.phone || '정보 없음'}</DetailItem>
              <DetailItem>이메일: {orderData.user.email || '정보 없음'}</DetailItem>
              <DetailItem>담당자 연락처: {orderData.user.managerPhone || '연락처 없음'}</DetailItem>
            </Details>
          )}
        </Section>
        <Separator />

        {orderData.deliveryAddress && (
          <Section>
            <SectionTitle>배송지 정보</SectionTitle>
            <Details>
              <DetailItem>수령인: {orderData.deliveryAddress.name || '정보 없음'}</DetailItem>
              <DetailItem>연락처: {orderData.deliveryAddress.phone || '연락처 없음'}</DetailItem>
              <DetailItem>
                배송지: {orderData.deliveryAddress.address || '정보 없음'} 
                ({orderData.deliveryAddress.zipcode || '우편번호 없음'}), ({orderData.deliveryAddress.addressDetail || '상세주소 없음'})
              </DetailItem>
              <DetailItem>상세 주소: {orderData.deliveryAddress.addressDetail || '정보 없음'}</DetailItem>
            </Details>
          </Section>
        )}
        <Separator />

        <Section>
          <SectionTitle>주문 금액 상세</SectionTitle>
          <Details>
            <DetailItem>주문금액: {formatNumber(orderData.price)}원</DetailItem>
            <DetailItem>할인금액: {formatNumber(orderData.discountPrice)}원</DetailItem>
            <DetailItem>배송비: {formatNumber(orderData.shippingCost)}원</DetailItem>
            <DetailItem>총 주문금액: {formatNumber(orderData.totalPrice)}원</DetailItem>
            <DetailItem>결제수단: {paymentMethodMap[orderData.paymentMethod?.paymentMethod] || orderData.paymentMethod?.paymentMethod}</DetailItem>
          </Details>
        </Section>
        <Separator />
        {orderData.request && (
          <Section>
            <SectionTitle>배송 요청사항</SectionTitle>
            <Details>
              <DetailItem>{orderData.request}</DetailItem>
            </Details>
          </Section>
        )}
        <Separator />
        <DetailButton onClick={handleViewReceipt}>매출전표 보기</DetailButton>
      </Container>
    </MainWrapper>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
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

const ItemImage = styled.img`
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
  width: 80%;
  margin-left: 10%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 90%;
    margin-left: 5%;
  }
`;
const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-top: 160px;
  padding-bottom: 10px;
  @media(max-width: 780px){
    font-size: 1.9rem;
    padding-top: 5px;
    margin-top: 10%;
  }
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const DetailButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: #ff4d4d;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
`;

const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: red;
  font-size: 1.2rem;
`;

export default OrderDetail;
