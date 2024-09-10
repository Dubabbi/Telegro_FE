import React from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; // 실제 이미지 경로로 수정 필요

const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2% auto;
`;

const LeftSection = styled.div`
  width: 60%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
`;

const RightSection = styled.div`
  width: 35%;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrderTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const ProductModel = styled.span`
  color: #777;
  font-size: 1rem;
`;

const ProductColor = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-top: 5px;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.5rem;
`;

const PriceDetailsWrapper = styled.div`
  padding: 10px 0;
  border-top: 1px solid #dcdcdc;
  margin-top: 20px;
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

const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4d44b5;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin-top: 5%;
  margin-left: 15%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.7rem;
    font-weight: bold;
  }
  

`;
const OrderManager = () => {
  return (
    <>
      <div style={{ width: '100%', minHeight: '22.6vh', border: 'none' }}></div>
      <Title><h1>주문 관리</h1></Title>
      
    <OrderPageWrapper>
      {/* 좌측 상품 리스트 영역 */}
      <LeftSection>
        {/* 상품 리스트 */}
        <ProductItem>
          <ProductInfo>
            <ProductImage src={img} alt="상품 이미지" />
            <ProductDetails>
              <ProductName>상품명1</ProductName>
              <ProductModel>모델명: 모델명</ProductModel>
              <ProductColor>Color: White</ProductColor>
            </ProductDetails>
          </ProductInfo>
          <ProductPrice>$145</ProductPrice>
          <QuantityWrapper>
            <QuantityButton>-</QuantityButton>
            <QuantityInput type="text" value="10" />
            <QuantityButton>+</QuantityButton>
          </QuantityWrapper>
          <DeleteButton>🗑️</DeleteButton>
        </ProductItem>

        {/* 두 번째 상품 */}
        <ProductItem>
          <ProductInfo>
            <ProductImage src={img} alt="상품 이미지" />
            <ProductDetails>
              <ProductName>상품명2</ProductName>
              <ProductModel>모델명: 모델명</ProductModel>
              <ProductColor>Color: Red</ProductColor>
            </ProductDetails>
          </ProductInfo>
          <ProductPrice>$180</ProductPrice>
          <QuantityWrapper>
            <QuantityButton>-</QuantityButton>
            <QuantityInput type="text" value="30" />
            <QuantityButton>+</QuantityButton>
          </QuantityWrapper>
          <DeleteButton>🗑️</DeleteButton>
        </ProductItem>

        {/* 세 번째 상품 */}
        <ProductItem>
          <ProductInfo>
            <ProductImage src={img} alt="상품 이미지" />
            <ProductDetails>
              <ProductName>상품명3</ProductName>
              <ProductModel>모델명: 모델명</ProductModel>
              <ProductColor>Color: Blue</ProductColor>
            </ProductDetails>
          </ProductInfo>
          <ProductPrice>$240</ProductPrice>
          <QuantityWrapper>
            <QuantityButton>-</QuantityButton>
            <QuantityInput type="text" value="25" />
            <QuantityButton>+</QuantityButton>
          </QuantityWrapper>
          <DeleteButton>🗑️</DeleteButton>
        </ProductItem>
      </LeftSection>

      {/* 우측 주문 금액 영역 */}
      <RightSection>
        <OrderTitle>주문 금액</OrderTitle>
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

        {/* 할인 코드 입력 */}
        <PriceDetailsWrapper>
          <input type="text" placeholder="할인 코드 입력" style={{ width: '70%', padding: '8px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button style={{ padding: '8px 15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px' }}>확인</button>
        </PriceDetailsWrapper>

        {/* 구매하기 버튼 */}
        <ConfirmButton>구매하기</ConfirmButton>
      </RightSection>
    </OrderPageWrapper>
    </>
  );
};

export default OrderManager;
