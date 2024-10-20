import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from './example.svg'; 
import * as N from '../Notice/NoticeStyle';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const getCategoryBackground = (category) => {
  switch (category) {
    case 'electronics':
      return '#EAEDF7';
    case 'clothing':
      return '#F0F8E2';
    case 'furniture':
      return '#E6F0F8';
    default:
      return '#F3F3F3';
  }
};
const ProductPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  padding: 2%;
  margin-bottom: 2%;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  @media (max-width: 780px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const StickyBarWrapper = styled.div`
  position: sticky;
  top: 180px; 
  width: 20%;
  margin-left: 20px;
  padding: 2%;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  @media (max-width: 780px) {
    width: 90%;
    margin: 0 auto;
    position: static;  /* 모바일 화면에서는 고정되지 않도록 */
  }
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 40px;
  @media (max-width: 780px) {
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
  @media (max-width: 780px) {
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
  color: #303972;
  margin-bottom: 10px;
`;

const ProductSubtitle = styled.h3`
  font-weight: bold;
  font-size: 1.6rem;
  color: #6B6B6B;
  margin-bottom: 35%;
`;

const OptionSelectWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Select = styled.select`
  padding: 10px;
  width: 200px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
`;

const QuantityInput = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  width: 200px;
  text-align: left;
  border: 1px solid #d3d3d3;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const BuyButton = styled.button`
  padding: 8px 18px;
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: bold;
  width: 100px;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(77, 68, 181, 0.6);
    color: #fff;
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
  height: 29.5vh;
  margin: 5% 0;
  @media (max-width: 780px) {
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
    object-fit: contain;
  }
`;

const CategoryTag = styled.div`
  background-color: ${(props) => getCategoryBackground(props.category)};
  max-width: 170px;
  border-radius: 5px;
  padding: 2px 8px;
  margin-top: 5px;
  margin-left: 12px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #303972;
`;

const Div = styled.div`
  height: 10px;
  @media(max-width: 780px){
    height: 100px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  padding-top: 160px;
  justify-content: space-around;
  align-items: flex-start;
  width: 90%;
  margin-left: 10%;
  @media (max-width: 780px) {
    flex-direction: column;
    margin: 0 auto;
    gap: 15px;
  }
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
  color: #444;
  font-weight: semibold;
  font-size: 1.3rem;
`;

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { productId } = useParams();

  const handlePurchase = async () => {
    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.post(
        `https://api.telegro.kr/api/carts/${productId}`,
        {
          productOption: selectedOption, // 요청 본문에 포함되는 데이터
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // 헤더
        }
      );
  
      if (response.status === 200) {
        alert('상품이 장바구니에 담겼습니다!');
      } else {
        alert('장바구니에 담기 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('장바구니에 물건을 담는 중 오류가 발생했습니다.');
    }
  };
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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(99, e.target.value));
    setQuantity(value);
  };



  if (!product) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <MainWrapper>
        <ProductPageWrapper>
          <CategoryTag category={product.category}>
            <p>category: {product.category}</p>
          </CategoryTag>
          <ProductDetails>
            <ProductInfoWrapper>
              <ProductImage src={product.pictures[0] || img} alt="Main Product" />
              <div>
                <ProductTitle>{product.productName}</ProductTitle>
                <ProductSubtitle>{product.productModel}</ProductSubtitle>
                <PriceTag>₩{product.priceCustomer}</PriceTag>
              </div>
            </ProductInfoWrapper>

            <AdditionalImagesWrapper>
              {product.pictures.slice(1).map((picture, index) => (
                <AdditionalImage
                  style={{ cursor: 'pointer' }}
                  key={index}
                  src={picture}
                  alt={`Additional Image ${index + 1}`}
                  onClick={() => openModal(index)}
                />
              ))}

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
          <ContentWrapper>
            <DescriptionTitle>상품 설명</DescriptionTitle>
            <DescriptionList>
              <DescriptionItem dangerouslySetInnerHTML={{ __html: product.content }} />
            </DescriptionList>
          </ContentWrapper>
        </ProductPageWrapper>

        <StickyBarWrapper>
          <OptionSelectWrapper>
            <DescriptionTitle style={{fontSize: '1.2rem'}} htmlFor="optionSelect">옵션 선택</DescriptionTitle>
            <Select id="optionSelect" value={selectedOption} onChange={handleOptionChange}>
              <option value="">옵션을 선택하세요</option>
              {product.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </Select>

            <DescriptionTitle style={{fontSize: '1.2rem', paddingTop: '3%'}} htmlFor="quantity">수량</DescriptionTitle>
            <QuantityInput
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="99"
            />
          </OptionSelectWrapper>

          <ButtonWrapper>
            <BuyButton onClick={() => handlePurchase()}>구매하기</BuyButton>
            <BuyButton onClick={handlePurchase}>장바구니</BuyButton>
          </ButtonWrapper>
        </StickyBarWrapper>
        <Div></Div>
      </MainWrapper>
    </>
  );
};

export default ProductDetail;
