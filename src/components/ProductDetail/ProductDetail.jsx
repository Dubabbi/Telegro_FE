import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from './example.svg'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
  width: 40%;
  height: auto;
  margin: 0 auto;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  margin-top: 2%;
  font-size: 2rem;
  color: #303972;
  margin-bottom: 10px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 1.7rem;
  color: #111;
  margin-bottom: 10px;
  text-align: center;
`;

const ProductDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: #444;
  margin: 10px auto;
  width: 70%;
  text-align: left;

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
const DescriptionItem = styled.li`
  margin-bottom: 5px;
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
const AdditionalImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 5px; 
  column-gap: 10px;  
  padding-left: 20px;
  align-items: center;
  justify-items: center;
  height: auto;
  margin: 5% 0;
`;
const AdditionalImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  `;

const ProductDetail = () => {
  const navigate = useNavigate();
    //const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const productId = 3;
  useEffect(() => {
    const productId = 3;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/proxy/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('상품 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchProduct();
  }, [productId]); 

  if (!product) {
    return <div>로딩 중...</div>; 
  }

  return (
    <>
      <ProductPageWrapper>
        <ProductImage src={product.pictures[0] || img}  alt="Product Image" />
        <ProductTitle>모델명: {product.productModel}</ProductTitle>
        <SubTitle>상품명: {product.productName}</SubTitle>
        <AdditionalImagesWrapper>
            {product.pictures.slice(1).map((picture, index) => (
              <AdditionalImage key={index} src={picture} alt={`Additional Image ${index + 1}`} />
            ))}
          </AdditionalImagesWrapper>
        <PriceWrapper>
          <PriceTag>Biz: ₩{product.priceBusiness}</PriceTag>
          {/*
          <PriceTag>B: ₩{product.priceBest}</PriceTag>
          <PriceTag>D: ₩{product.priceDealer}</PriceTag>
          <PriceTag>C: ₩{product.priceCustomer}</PriceTag>
          */}
        </PriceWrapper>
        <ProductDescription>
        <DescriptionItem dangerouslySetInnerHTML={{ __html: product.content }} />
        </ProductDescription>


        <ButtonWrapper>
          <BuyButton onClick={() => navigate('/orderproduct')}>구매하기</BuyButton>
          <CartButton>장바구니</CartButton>
        </ButtonWrapper>
      </ProductPageWrapper>
    </>
  );
};

export default ProductDetail;
