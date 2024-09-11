import React from 'react';
import styled from 'styled-components';
import img from './example.svg'; 
import { useNavigate } from 'react-router-dom';

const ProductPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2% auto 4%;
  margin-top: 12%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
`;

const ProductImage = styled.img`
  width: auto;
  height: 60vh;
  margin: 4%;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  color: #303972;
  margin-bottom: 10px;
  text-align: center;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  color: #444;
  margin: 10px auto;
  width: 70%;
  text-align: left; /* Aligning text to the left */
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

const PriceTag = styled.span`
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-radius: 1rem;
  font-size: 1.3rem;
  color: #303972;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const BuyButton = styled.button`
  padding: 10px 30px;
  background-color: #4D44B5;
  color: white;
  font-size: 1rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #37308f;
  }
`;

const CartButton = styled.button`
  padding: 10px 30px;
  background-color: #fff;
  border: 1px solid #4D44B5;
  color: #4D44B5;
  font-size: 1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProductDetail = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <ProductPageWrapper>
        <ProductImage src={img} alt="Product Image" />
        <ProductTitle>밀도 호밀잡곡식빵</ProductTitle>
        <ProductDescription>
          빵의 기본이 되는 식빵을 반죽 재료 하나만으로도 그 맛에 차이가 느껴지네요. 밀도의 호밀잡곡식빵은 블렌딩 밀가루에 호밀가루를 배합해 만들었습니다. 오독오독 씹히는 잡곡과 빠를 수 없는 매력 포인트들. 입에 넣는 순간 퍼지는 고소한 맛이 밖에 담긴 천연적 정성을 가능하게 합니다. 아무 것도 더하지 않았을 때 가장 맛있는 빵, 마지막 한입까지 맛있게 즐겨보세요.
        </ProductDescription>

        <PriceWrapper>
          <PriceTag>₩15,000</PriceTag>
        </PriceWrapper>

        <ButtonWrapper>
          <BuyButton onClick={() => navigate('/orderproduct')}>구매하기</BuyButton>
          <CartButton>장바구니</CartButton>
        </ButtonWrapper>
      </ProductPageWrapper>
    </>
  );
};

export default ProductDetail;
