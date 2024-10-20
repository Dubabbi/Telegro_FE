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

  input[type="checkbox"] {
    margin-right: 15px; /* 체크박스와 상품 정보 사이의 간격을 설정 */
    transform: scale(1.5); /* 체크박스 크기 조절 */
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
  @media(max-width: 780px){
    gap: 2px;
  }
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
  @media(max-width: 780px){
    width: 20px;
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.5rem;
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
    font-size: 2.3rem;
    font-weight: bold;

    @media (max-width: 780px) {
      font-size: 1.9rem;
    }
  }
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
  
  

  const handleIncreaseQuantity = (id, productOption, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
    updateCartItem(id, productOption, newQuantity); 
  };
  
  const handleDecreaseQuantity = (id, productOption, currentQuantity) => {
    const newQuantity = Math.max(currentQuantity - 1, 1); 
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
    updateCartItem(id, productOption, newQuantity); 
  };
  

  // 체크박스 변경 함수
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
  const updateCartItem = async (cartId, productOption, quantity) => {
    try {
      const accessToken = localStorage.getItem('token');
      
      const response = await axios.put(
        `https://api.telegro.kr/api/carts/${cartId}`,
        {
          productOption,
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
                
                {/* 옵션 선택 UI */}
                <select value={product.productOption} onChange={(e) => updateCartItem(product.id, e.target.value, product.quantity)}>
                  <option value="Option1">Option1</option>
                  <option value="Option2">Option2</option>
                  {/* 다른 옵션들 */}
                </select>
              </ProductDetails>
            </ProductInfo>

            <ProductPrice>₩{product.productPrice}</ProductPrice>
            
            <QuantityWrapper>
            <QuantityButton onClick={() => handleDecreaseQuantity(product.id, product.productOption, product.quantity)}>-</QuantityButton>
            <QuantityInput 
              type="number" 
              value={product.quantity} 
              onChange={(e) => updateCartItem(product.id, product.productOption, parseInt(e.target.value, 10))} // 수동 입력 시
            />
            <QuantityButton onClick={() => handleIncreaseQuantity(product.id, product.productOption, product.quantity)}>+</QuantityButton>
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
          <ConfirmButton onClick={handlePurchase}>구매하기</ConfirmButton>
        </RightSection>
      </OrderPageWrapper>
    </>
  );
};

export default Cart;
