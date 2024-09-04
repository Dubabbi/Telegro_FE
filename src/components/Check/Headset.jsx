// Headset.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './Table/CommonTable';
import CommonTableColumn from './Table/CommonTableColumn';
import CommonTableRow from './Table/CommonTableRow';
import * as N from './Table/NoticeStyle'; 

const Headset = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "헤드셋", model: "HS-101", description: "고음질 게이밍 헤드셋", price: 50000, stock: 20, order: '주문하기' },
    { id: 2, name: "전화/증폭기", model: "AMP-202", description: "고출력 전화 증폭기", price: 75000, stock: 15, order: '주문하기' },
    { id: 3, name: "라인코드", model: "LC-303", description: "고내구성 라인코드", price: 15000, stock: 30, order: '주문하기' },
    { id: 4, name: "녹음기기", model: "RC-404", description: "휴대용 녹음기", price: 45000, stock: 10, order: '주문하기' },
    { id: 5, name: "악세사리", model: "AC-505", description: "다양한 헤드셋 악세사리", price: 10000, stock: 50, order: '주문하기' }
  ]);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };

  const items = products.map((product) => (
    <CommonTableRow key={product.id}>
      <CommonTableColumn>{product.name}</CommonTableColumn>
      <CommonTableColumn>{product.model}</CommonTableColumn>
      <CommonTableColumn>{product.description}</CommonTableColumn>
      <CommonTableColumn>{`₩${product.price.toLocaleString()}`}</CommonTableColumn>
      <CommonTableColumn>{product.stock}</CommonTableColumn>
      <CommonTableColumn>
        <Link to="/order">
          <FaShoppingCart /> {product.order}
        </Link>
      </CommonTableColumn>
    </CommonTableRow>
  ));

  return (
    <N.MainWrapper>
      <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>상품 목록</N.TitleText>
        </N.PageTitle>
        <N.BoardSearchArea>
          <N.SearchWindow>
            <N.SearchWrap>
              <N.StyledForm onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="상품 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <N.StyledButton type="submit" variant="none"><FaShoppingCart size={15} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
          </N.SearchWindow>
        </N.BoardSearchArea>
        <div><hr/>
          <CommonTable headersName={['상품명', '모델명', '설명', '단가', '재고보유', '주문']}>{items}</CommonTable><hr/>
        </div>
      </N.Section>
    </N.MainWrapper>
  );
};

export default Headset;
