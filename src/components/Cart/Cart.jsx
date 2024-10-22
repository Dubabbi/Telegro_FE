import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import img from '../Check/image.svg'; // 실제 이미지 경로로 수정 필요
import { useNavigate } from 'react-router-dom';
import Delete from '/src/assets/icon/delete.svg';

export const Div = styled.div`
  width: 100%;
  min-height: 160px;
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

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 90%;
  }
`;

export const LeftSection = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
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
  max-width: 100%;
  position: relative; 
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start; /* 요소들을 왼쪽 정렬 */
  }
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
  width: 100%;
  overflow: auto; 
  
  @media (max-width: 780px) {
    flex-grow: 1; /
  }

  span {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
`;


export const ProductName = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 6px;
`;

export const ProductModel = styled.span`
  color: #111;
  font-size: 1.2rem;
  margin-bottom: 10px;
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
  white-space: nowrap;

  @media (max-width: 780px) {
    width: 100%; /* 전체 너비 사용 */
    margin-bottom: 10px; /* 수량 선택 부분과의 간격 */
  }
`;

export const QuantityButton = styled.button`
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;

  @media (max-width: 780px) {
    width: 20%; /* 전체 너비 사용 */
    justify-content: space-between; /* 버튼을 양쪽 끝으로 분산 */
  }
`;

export const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  @media(max-width: 780px){
    width: 30px; /* 작은 화면에서 입력 필드 크기 조정 */
  }
`;


export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.3rem;
  position: absolute; 
  top: 10px;
  right: 10px; 

  @media (max-width: 780px) {
    top: 5px; 
    right: 5px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  white-space: nowrap;
`;

export const CheckboxLabel = styled.label`
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 800px) {
    font-size: 1.1rem;
  }
`;

export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 15px;
  border: 1px solid #ddd;
  height: 15px;
  cursor: pointer;
  border-radius: 8px;
  &:checked {
    background-color: #4d44b5;
  }
  @media (max-width: 800px) {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
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
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2%;
  &:hover {
    background-color: rgba(77, 68, 181, 0.6);  /* 호버 시 배경을 진한 보라색으로 */
    color: #fff;    
  }
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
    font-size: 2.3rem;
    font-weight: bold;

    @media (max-width: 780px) {
      font-size: 1.9rem;
    }
  }
`;

export const OptionInputWrapper = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin-top: 5px;
`;

const Cart = () => {
  const navigate = useNavigate('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('https://api.telegro.kr/api/carts?page=0&size=10',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        if (response.status === 200) {
          setProducts(response.data.data.carts);
        } else {
          alert('장바구니 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // 상품 삭제 함수
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('정말로 이 상품을 장바구니에서 삭제하시겠습니까?');

    if (!confirmDelete) {
      return; // 사용자가 취소를 누르면 삭제를 진행하지 않음
    }

    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.delete(`https://api.telegro.kr/api/carts/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setProducts(products.filter(product => product.id !== id));
        alert('상품이 장바구니에서 삭제되었습니다.');
      } else {
        alert('상품 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert('장바구니 항목을 삭제하는 중 오류가 발생했습니다.');
    }
  };


  const [updatedProduct, setUpdatedProduct] = useState(null);

  useEffect(() => {
    if (updatedProduct) {
      updateCartItem(updatedProduct.id, updatedProduct.selectOption, updatedProduct.inputOption, updatedProduct.quantity);
    }
  }, [updatedProduct]);
  
  const handleIncreaseQuantity = (id) => {
    const newProducts = products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(newProducts);
    const updated = newProducts.find(p => p.id === id);
    setUpdatedProduct(updated);
  };
  
  
  const handleDecreaseQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(product.quantity - 1, 1) } : product
    ));
  };
  
  useEffect(() => {
    products.forEach(product => {
      updateCartItem(product.id, product.selectOption, product.inputOption, product.quantity);
    });
  }, [products]); 
  
  
  const handleQuantityChange = (id, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10); 
    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = 1; 
    }
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };
  
  

  const handleOptionChange = (id, selectedOption) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, selectOption: selectedOption } : product
    ));
  
    // 옵션이 변경된 해당 상품만 PUT 요청을 보냄
    const product = products.find(product => product.id === id);
    if (product) {
      updateCartItem(id, selectedOption, product.inputOption, product.quantity);
    }
  };
  

  const handleInputOptionChange = (id, inputOptionValue) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, inputOption: inputOptionValue } : product
    ));
  };

  const updateCartItem = async (cartId, productOption, inputOption, quantity) => {
    try {
      const accessToken = localStorage.getItem('token');

      const response = await axios.put(
        `https://api.telegro.kr/api/carts/${cartId}`,
        {
          productOption,
          inputOption,
          quantity: parseInt(quantity, 10)
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      if (response.status === 200) {
        console.log('장바구니가 성공적으로 업데이트되었습니다.');
      } else {
        alert('장바구니 업데이트 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      alert('장바구니 항목을 업데이트하는 중 오류가 발생했습니다.');
    }
  };


  const handleCheckboxChange = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, selected: !product.selected } : product
    ));
  };

  // 선택한 상품만 구매하기
  const handlePurchase = () => {
    const selectedProducts = products.filter(product => product.selected);
    if (selectedProducts.length === 0) {
      alert('구매할 상품을 선택해주세요.');
      return;
    }
    console.log("구매할 상품들:", selectedProducts);
    navigate('/orderprocess', { state: { products: selectedProducts } });
  };

  return (
    <>
      <Div></Div>
      <Title><h1>장바구니</h1></Title>
      <OrderPageWrapper>
        {/* 좌측 상품 리스트 영역 */}
        <LeftSection>
          {products.map(product => (
            <ProductItem key={product.id}>
            <CheckboxContainer style={{ alignItems: 'center' }}>
              <Checkbox
                type="checkbox"
                id={`checkbox-${product.id}`}
                checked={product.selected}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <CheckboxLabel htmlFor={`checkbox-${product.id}`} />
            </CheckboxContainer>

            <ProductInfo>
              <ProductImage src={product.coverImage} alt="상품 이미지" />
              <ProductDetails>
              <ProductName>{product.productName}</ProductName>
              <ProductModel>{product.productModel}</ProductModel>
              <select
                value={product.selectOption || ''}
                onChange={(e) => handleOptionChange(product.id, e.target.value)}
              >
                {product.productOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {(product.productCategory === 'HEADSET' || product.productCategory === 'LINE_CORD' || product.productCategory === 'RECORDER') && (
              <>
                <OptionInputWrapper>
                  <input
                    style={{ border: '1px solid #555', borderRadius: '3px'}}
                    type="text"
                    value={product.inputOption || ''}
                    onChange={(e) => handleInputOptionChange(product.id, e.target.value)}
                    placeholder="기타 옵션 기재"
                  />
                  <button
                    style={{
                      backgroundColor: '#eee',
                      borderRadius: '3px',
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() =>
                      updateCartItem(product.id, product.selectOption, product.inputOption, product.quantity)
                    }
                  >
                    확인
                  </button>
                </OptionInputWrapper>
                </>
              )}
            </ProductDetails>
            </ProductInfo>

            <ProductPrice>{product.productPrice}원</ProductPrice>

          <QuantityWrapper>
            <QuantityButton onClick={() => handleDecreaseQuantity(product.id, product.selectOption, product.quantity)}>-</QuantityButton>
            <QuantityInput
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}  
            />
            <QuantityButton onClick={() => handleIncreaseQuantity(product.id, product.selectOption, product.quantity)}>+</QuantityButton>
          </QuantityWrapper>
            <DeleteButton onClick={() => handleDelete(product.id)}>
              <DeleteIcon src={Delete} />
            </DeleteButton>
          </ProductItem>

          ))}
        </LeftSection>

        {/* 우측 주문 금액 영역 */}
        <RightSection>
          <OrderTitle>주문 금액</OrderTitle>
          <PriceDetail>
            <span>총 상품 금액</span>
            <span>880,000원</span>
          </PriceDetail>
          <PriceDetail>
            <span>선택한 상품 금액</span>
            <span style={{ color: 'red' }}>80,000원</span>
          </PriceDetail>
          <PriceDetail>
            <span>배송비</span>
            <span>0원</span>
          </PriceDetail>
          <hr />
          <PriceDetail>
            <TotalPrice>합계</TotalPrice>
            <TotalPrice>800,000원</TotalPrice>
          </PriceDetail>


          {/* 할인 코드 입력 */}
          <PriceDetailsWrapper>
            <input type="text" placeholder="할인 코드 입력" />
            <button><p>확인</p></button>
          </PriceDetailsWrapper>

          {/* 구매하기 버튼 */}
          <ConfirmButton onClick={handlePurchase}>구매하기</ConfirmButton>
        </RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default Cart;
