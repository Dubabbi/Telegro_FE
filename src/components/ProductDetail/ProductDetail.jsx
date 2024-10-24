import React, { useState, useEffect } from 'react';
import * as P from './ProductDetailStyle'; 
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import img from './example.svg'; 
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [inputOption, setInputOption] = useState('');
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { productId } = useParams();

  const handleInputOptionChange = (e) => {
    setInputOption(e.target.value);
  };
  const handlePurchase = async () => {
    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }
    if ((product.category === 'HEADSET' || product.category === 'LINE_CORD' || product.category === 'RECORDER') && !inputOption) {
      alert('사용 전화기명을 입력해주세요.');
      return;
    }
    
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.post(
        `https://api.telegro.kr/api/carts/${productId}`,
        {
          selectOption: selectedOption,
          quantity: quantity,
          inputOption: inputOption
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }, 
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
        const response = await axios.get(`https://api.telegro.kr/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

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
      <P.MainWrapper>
        <P.ProductPageWrapper>
          <P.CategoryTag category={product.category}>
            <p>category: {product.category}</p>
          </P.CategoryTag>
          <P.ProductDetails>
            <P.ProductInfoWrapper>
              <P.ProductImage src={product.pictures[0] || img} alt="Main Product" />
              <div>
                <P.ProductTitle>{product.productName}</P.ProductTitle>
                <P.ProductSubtitle>{product.productModel}</P.ProductSubtitle>
                <P.PriceTag>₩{product.price}</P.PriceTag>
              </div>
            </P.ProductInfoWrapper>

            <P.AdditionalImagesWrapper>
              {product.pictures.slice(1).map((picture, index) => (
                <P.AdditionalImage
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
                <P.LeftArrow onClick={prevImage}>&lt;</P.LeftArrow>
                <P.ModalImage src={product.pictures[currentImageIndex]} onClick={closeModal} alt="Modal" />
                <P.RightArrow onClick={nextImage}>&gt;</P.RightArrow>
              </Modal>
            </P.AdditionalImagesWrapper>
          </P.ProductDetails>
          <P.ContentWrapper>
            <P.DescriptionTitle>상품 설명</P.DescriptionTitle>
            <P.DescriptionList>
              <P.DescriptionItem className="toastui-editor-contents" dangerouslySetInnerHTML={{ __html: product.content }} />
            </P.DescriptionList>
          </P.ContentWrapper>
        </P.ProductPageWrapper>

        <P.StickyBarWrapper>
          <P.OptionSelectWrapper>
            <P.DescriptionTitle style={{fontSize: '1.2rem'}} htmlFor="optionSelect">옵션 선택</P.DescriptionTitle>
            <P.Select id="optionSelect" value={selectedOption} onChange={handleOptionChange}>
              <option value="">옵션을 선택하세요</option>
              {product.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </P.Select>
            {(product.category === 'HEADSET' || product.category === 'LINE_CORD' || product.category === 'RECORDER') && (
              <>
                <P.DescriptionTitle style={{fontSize: '1.2rem', paddingTop: '3%'}} htmlFor="inputoption">사용 전화기명 기재(전화기뒷면)</P.DescriptionTitle>
                <P.QuantityInput
                  type="text" 
                  id="inputoption" 
                  value={inputOption}
                  onChange={handleInputOptionChange} 
                  placeholder="옵션을 입력하세요"
                />
              </>
            )}
            <P.DescriptionTitle style={{fontSize: '1.2rem', paddingTop: '3%'}} htmlFor="quantity">수량</P.DescriptionTitle>
            <P.QuantityInput
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="99"
            />

          </P.OptionSelectWrapper>

          <P.ButtonWrapper>
            <P.BuyButton onClick={() => navigate('/orderprocess')}>구매하기</P.BuyButton>
            <P.BuyButton onClick={handlePurchase}>장바구니</P.BuyButton>
          </P.ButtonWrapper>
        </P.StickyBarWrapper>
        <P.Div></P.Div>
      </P.MainWrapper>
    </>
  );
};

export default ProductDetail;