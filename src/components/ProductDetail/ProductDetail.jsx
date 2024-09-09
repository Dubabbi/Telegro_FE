import React from 'react';
import styled from 'styled-components';
import img from '../Check/image.svg';

const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 20px;
`;

const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20px;
`;

const ProductImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 1.5rem;
  color: #003087;
  margin-bottom: 10px;
`;

const ProductSubtitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  background-color: #0f62fe;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const PriceTag = styled.span`
  padding: 5px 15px;
  background-color: #e0e0e0;
  border-radius: 20px;
  color: #555;
  font-size: 1rem;
`;

const AdditionalImagesWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #d3d3d3;
  padding-left: 20px;
`;

const AdditionalImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DescriptionWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const DescriptionTitle = styled.h4`
  font-size: 1.2rem;
  color: #003087;
  margin-bottom: 10px;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #555;
`;

const DescriptionItem = styled.li`
  margin-bottom: 5px;
`;

const RequestInputWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const RequestInputLabel = styled.label`
  font-size: 1.2rem;
  color: #003087;
  margin-bottom: 10px;
  display: block;
`;

const RequestInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  resize: none;
`;

const ProductDetail = () => {
  return (
    <>
    <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
    <ProductPageWrapper>
      <ProductDetails>
        {/* 좌측 상품 정보 */}
        <ProductInfo>
          <ProductImage src={img} alt="Main Product" />
          <ProductTitle>상품명</ProductTitle>
          <ProductSubtitle>제품명</ProductSubtitle>
          <BuyButton>구매하기</BuyButton>
          <PriceWrapper>
            <PriceTag>Biz: ₩160,000</PriceTag>
            <PriceTag>B: ₩110,000</PriceTag>
            <PriceTag>D: ₩100,000</PriceTag>
            <PriceTag>C: ₩90,000</PriceTag>
          </PriceWrapper>
        </ProductInfo>

        {/* 우측 추가 상품 이미지 */}
        <AdditionalImagesWrapper>
          <AdditionalImage src={img} alt="Additional Image 1" />
          <AdditionalImage src={img} alt="Additional Image 2" />
          <AdditionalImage src={img} alt="Additional Image 3" />
          <AdditionalImage src={img} alt="Additional Image 4" />
        </AdditionalImagesWrapper>

        {/* 상품 설명과 요청사항 입력란 */}
        <DescriptionWrapper>
          <DescriptionTitle>상품 설명</DescriptionTitle>
          <DescriptionList>
            <DescriptionItem>이 상품은 이런 특징이 있어요.</DescriptionItem>
            <DescriptionItem>~~~~한 장점도 있어요.</DescriptionItem>
            <DescriptionItem>다른 상품들과 이런 차이점이 있어요.</DescriptionItem>
            <DescriptionItem>이 상품은 다양한 장점이 있어요.</DescriptionItem>
            <DescriptionItem>만족도가 높은 제품이에요.</DescriptionItem>
          </DescriptionList>
          <RequestInputWrapper>
            <RequestInputLabel>요청 사항</RequestInputLabel>
            <RequestInput placeholder="요청 사항을 입력해 주세요." />
          </RequestInputWrapper>
        </DescriptionWrapper>
      </ProductDetails>
    </ProductPageWrapper>
    </>
  );
};

export default ProductDetail;
