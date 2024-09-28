import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg'; // 실제 이미지 경로로 수정 필요
import { useNavigate } from 'react-router-dom';
import Delete from '/src/assets/icon/delete.svg';

export const Div = styled.div`
  width: 100%;
  min-height: 15.6vh;
  border: none;
  @media (max-width: 780px) {
    max-height: 4vh;
    min-height: 6vh;
  }
`;

export const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2% auto;

  @media (max-width: 780px) {
    flex-direction: column;
    width: 90%;

  }
`;

export const LeftSection = styled.div`
  width: 60%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 780px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const DeleteIcon = styled.img`
  max-width: 20px;

  @media (max-width: 780px) {
    max-width: 15px;
  }
`;

export const RightSection = styled.div`
  width: 35%;
  background-color: #fff;
  padding: 2%;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 780px) {
    width: 100%;
    padding: 5.5%;
  }
`;

export const OrderTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 6px;
`;

export const ProductModel = styled.span`
  color: #666;
  font-size: 1rem;
`;

export const ProductColor = styled.span`
  font-size: 1rem;
  color: #666;
  margin-top: 4px;
`;

export const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuantityButton = styled.button`
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.5rem;
`;

export const PriceDetailsWrapper = styled.div`
  padding: 15px 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #dcdcdc;
  margin-top: 4%;
  input{
    width: 77%;
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button{
    padding: 9px 20px;
    background-color: #000;
    color: #fff;
    width: 19%;
    border-radius: 5px;
    text-align: center;
  }
  p{
    white-space: nowrap;
    margin: 1%;
    text-align: center;
  }
`;

export const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  span{
    font-size: 1.4rem;
    @media(max-width: 780px){
      font-size: 1.3rem;
    }
  }
`;

export const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4d44b5;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 2%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin-top: 5%;
  margin-left: 12%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5%;
  }

  h1 {
    font-size: 2.6rem;
    font-weight: bold;

    @media (max-width: 780px) {
      font-size: 1.9rem;
    }
  }
`;

const Cart = () => {
  const navigate = useNavigate('');

  // 상품 데이터 배열
  const [products, setProducts] = useState([
    { id: 1, name: '상품명1', model: '모델명', option: '옵션', price: 145, quantity: 10 },
    { id: 2, name: '상품명2', model: '모델명', option: '옵션', price: 180, quantity: 30 },
    { id: 3, name: '상품명3', model: '모델명', option: '옵션', price: 240, quantity: 25 },
  ]);

  // 상품 삭제 함수
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // 상품 수량 증가 함수
  const handleIncreaseQuantity = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  // 상품 수량 감소 함수
  const handleDecreaseQuantity = (id) => {
    setProducts(products.map(product => 
      product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  return (
    <>
      <Div></Div>
      <Title><h1>장바구니</h1></Title>
      <OrderPageWrapper>
        {/* 좌측 상품 리스트 영역 */}
        <LeftSection>
          {/* 상품 리스트를 동적으로 렌더링 */}
          {products.map(product => (
            <ProductItem key={product.id}>
              <ProductInfo>
                <ProductImage src={img} alt="상품 이미지" />
                <ProductDetails>
                  <ProductName>{product.name}</ProductName>
                  <ProductModel>모델명: {product.model}</ProductModel>
                  <ProductColor>옵션: {product.option}</ProductColor>
                </ProductDetails>
              </ProductInfo>
              <ProductPrice>${product.price}</ProductPrice>
              <QuantityWrapper>
                <QuantityButton onClick={() => handleDecreaseQuantity(product.id)}>-</QuantityButton>
                <QuantityInput type="text" value={product.quantity} readOnly />
                <QuantityButton onClick={() => handleIncreaseQuantity(product.id)}>+</QuantityButton>
              </QuantityWrapper>
              <DeleteButton onClick={() => handleDelete(product.id)}><DeleteIcon src={Delete} /></DeleteButton>
            </ProductItem>
          ))}
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
            <input type="text" placeholder="할인 코드 입력" />
            <button><p>확인</p></button>
          </PriceDetailsWrapper>

          {/* 구매하기 버튼 */}
          <ConfirmButton onClick={() => navigate('/orderprocess')}>구매하기</ConfirmButton>
        </RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default Cart;
