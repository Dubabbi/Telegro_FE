import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from './example.svg'; 
import * as P from '../Product/ProductStyle';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  width: 70%;
  margin: 0 auto;
  padding: 2%;
  margin-bottom: 4%;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;
const ModalImage = styled.img`
  width: 80%;
  height: auto;
  max-height: 80vh;
  cursor: pointer;
  object-fit: contain;
  margin: auto;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 2rem;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 5%;
`;

const RightArrow = styled(ArrowButton)`
  right: 5%;
`;

const ProductImage = styled.img`
  width: 250px;
  height: auto;
  margin-right: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  white-space: nowrap;
  color: #303972;
  margin-bottom: 10px;
  margin-left: 6%;
`;

const ProductSubtitle = styled.h3`
  font-weight: bold;
  font-size: 1.6rem;
  color: #6B6B6B;
  margin-bottom: 35%;
  margin-left: 8%;
`;

const BuyButton = styled.button`
  padding: 10px 25px;
  background-color: #4D44B5;
  color: white;
  font-size: 1rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 20px;
  h1{
    font-size: 1.4rem;
  }
`;

const PriceTag = styled.span`
  padding: 5px 15px;
  background: rgba(77, 68, 181, 0.2);
  border-radius: 1rem;
  align-items: center;
  color: #444;
  font-weight: semibold;
  font-size: 1.3rem;
`;

const AdditionalImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 5px;  /* 위아래 간격을 5px로 설정 */
  column-gap: 10px;  /* 좌우 간격 */
  padding-left: 20px;
  align-items: center;
  justify-items: center;
  height: 29.5vh;
  margin: 5% 0;
`;

const AdditionalImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 5px;
  cusor: pointer;
  border: 1px solid #d3d3d3;
  `;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 5%;
  padding-top: 5%;
`;


const DescriptionTitle = styled.h4`
  font-size: 1.6rem;
  color: #303972;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  margin-top: 2%;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1.7;
  color: #444;
`;

const DescriptionItem = styled.li`
  margin-bottom: 5px;
`;


const MainWrapper = styled.div`
  width: 70%; /* 가운데 정렬을 위해 고정된 너비 설정 */
  margin: 160px auto 0 auto; 
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 70%; /* 최대 너비 설정 */
`;
const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { productId } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/products/${productId}`);
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
   
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.pictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.pictures.length - 1 : prevIndex - 1
    );
  };

  if (!product) {
    return <div>로딩 중...</div>; 
  }

  return (
    <>
    <MainWrapper>
        <N.PageTitle style={{ margin: '0', padding: '0' }}>
          <h2>제품 상세</h2>
          <p>category: {product.category}</p>
        </N.PageTitle>
    </MainWrapper>

      <ProductPageWrapper>
        <ProductDetails>
          <ProductInfoWrapper>
            <ProductImage src={product.pictures[0] || img} alt="Main Product" /> {/* 메인 이미지 표시 */}
            <ProductInfo>
              <ProductTitle>{product.productName}</ProductTitle> {/* 상품명 */}
              <ProductSubtitle>{product.productModel}</ProductSubtitle> {/* 모델명 */}
            </ProductInfo>
          </ProductInfoWrapper>
          <AdditionalImagesWrapper>
            {product.pictures.slice(1).map((picture, index) => (
              <AdditionalImage
                style={{cursor: 'pointer'}}
                key={index}
                src={picture}
                alt={`Additional Image ${index + 1}`}
                onClick={() => openModal(index)} />
            ))}
                  {/* 모달 */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={{
                content: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  inset: 0,
                },
                overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
              }}
            >
        <LeftArrow onClick={prevImage}>&lt;</LeftArrow>
        <ModalImage src={product.pictures[currentImageIndex]} onClick={closeModal} alt="Modal" />
        <RightArrow onClick={nextImage}>&gt;</RightArrow>
      </Modal>
          </AdditionalImagesWrapper>
        </ProductDetails>
        <PriceWrapper>
          <DescriptionTitle style={{ marginBottom: '0px', alignItems: 'center' }}>가격</DescriptionTitle>
          <PriceTag>Biz: ₩{product.priceBusiness}</PriceTag>
          <PriceTag>B: ₩{product.priceBest}</PriceTag>
          <PriceTag>D: ₩{product.priceDealer}</PriceTag>
          <PriceTag>C: ₩{product.priceCustomer}</PriceTag>
        </PriceWrapper>
        <ContentWrapper>
            <DescriptionTitle>상품 설명</DescriptionTitle>
            <DescriptionList> <DescriptionItem dangerouslySetInnerHTML={{ __html: product.content }} /> 
            </DescriptionList>

        </ContentWrapper>
      </ProductPageWrapper>
    </>
  );
};

export default ProductDetail;
