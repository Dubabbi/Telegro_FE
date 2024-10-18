import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from './example.svg'; 
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
  @media(max-width: 780px){
    width: 90%;
    margin: 0 auto;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 40px;
  @media(max-width: 780px){
    flex-direction: column;
  }
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
  @media(max-width: 780px){
    width: 100px;
  }
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
  row-gap: 5px;
  column-gap: 10px; 
  padding-left: 20px;
  align-items: center;
  justify-items: center;
  height: 29.5vh;
  margin: 5% 0;
  @media(max-width: 780px){
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AdditionalImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #d3d3d3;
  object-fit: cover; 
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

const BuyButton = styled.button`
  padding: 10px 25px;
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: bold;
  width: 120px;
  margin: 0 auto;
  &:hover {
    background-color: rgba(77, 68, 181, 0.6); 
    color: #fff;    
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 30px 0;
`;


const DescriptionTitle = styled.h4`
  font-size: 1.6rem;
  color: #303972;
  font-weight: bold;
  margin-bottom: 10px;
  white-space: nowrap;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  margin-top: 2%;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1.7;
  color: #444;
  position: relative;
`;

const DescriptionItem = styled.li`
  margin-bottom: 5px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  img {
    max-width: 80%;
    margin: 0 auto;
    height: auto;
    object-fit: contain; /* 이미지를 비율에 맞게 축소 */
  }
`;

const Div = styled.div`
  height: 10px;
  @media(max-width: 780px){
    height: 100px;
  }
`;

const MainWrapper = styled.div`
  width: 70%;
  margin: 160px auto 0 auto; 
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 70%;
  @media(max-width: 780px){
    margin: 0 auto;
    padding-top: 60px;
  }
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
          <div style={{backgroundColor: '#EAEDF7', borderRadius: '5px', padding: '2px 4px', marginTop: '5px'}}><p>category: {product.category}</p></div>
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
          <PriceTag>Biz: ₩{product.priceCustomer}</PriceTag>
        </PriceWrapper>
        <ContentWrapper>
            <DescriptionTitle>상품 설명</DescriptionTitle>
            <DescriptionList> <DescriptionItem dangerouslySetInnerHTML={{ __html: product.content }} /> 
            </DescriptionList>

        </ContentWrapper>
      </ProductPageWrapper>
      <ButtonWrapper>
      <BuyButton onClick={() => navigate('/orderprocess')}>구매하기</BuyButton>
      </ButtonWrapper>
      <Div></Div>
    </>
  );
};

export default ProductDetail;
