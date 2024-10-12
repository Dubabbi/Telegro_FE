// Order.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './Table/CommonTable';
import CommonTableColumn from './Table/CommonTableColumn';
import CommonTableRow from './Table/CommonTableRow';
import * as N from './Table/NoticeStyle';  

const Order = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: "헤드셋 HS-101", option: "색상: 검정", quantity: 2, price: 50000, total: 100000, info: '상세보기' },
    { id: 2, product: "전화/증폭기 AMP-202", option: "색상: 흰색", quantity: 1, price: 75000, total: 75000, info: '상세보기' },
    { id: 3, product: "라인코드 LC-303", option: "길이: 3m", quantity: 3, price: 15000, total: 45000, info: '상세보기' },
    { id: 4, product: "녹음기기 RC-404", option: "용량: 256GB", quantity: 1, price: 45000, total: 45000, info: '상세보기' },
    { id: 5, product: "악세사리 AC-505", option: "종류: 케이스", quantity: 5, price: 10000, total: 50000, info: '상세보기' }
  ]);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };

  const items = orders.map((order) => (
    <CommonTableRow key={order.id}>
      <CommonTableColumn>{order.id}</CommonTableColumn>
      <CommonTableColumn>{order.product}</CommonTableColumn>
      <CommonTableColumn>{order.option}</CommonTableColumn>
      <CommonTableColumn>{order.quantity}</CommonTableColumn>
      <CommonTableColumn>{`₩${order.price.toLocaleString()}`}</CommonTableColumn>
      <CommonTableColumn>{`₩${order.total.toLocaleString()}`}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/order/${order.id}`}>
          <FaInfoCircle /> {order.info}
        </Link>
      </CommonTableColumn>
    </CommonTableRow>
  ));

  return (
    <N.MainWrapper>
      <div style={{width: '100%', minHeight: '160px', border: 'none'}}></div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>주문 목록</N.TitleText>
        </N.PageTitle>
        <div style={{textAlign: 'right'}}>  총 주문 건수 : 0  현재 페이지 : 1 / 0 </div>
        <N.BoardSearchArea>
          <N.SearchWindow>
            <N.SearchWrap>
              <N.StyledForm onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="주문 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
          </N.SearchWindow>
        </N.BoardSearchArea>
        <div><hr/>
          <CommonTable headersName={['No', '주문상품', '옵션선택', '수량', '가격', '총 금액(적립금)', '주문정보']}>{items}</CommonTable><hr/>
        </div>
      </N.Section>
      <h1 style={{textAlign: 'right', fontSize: '1.5rem', marginRight: '1%', color: '#94A3D8', fontWeight: 'bold'}}>총 주문 금액 (적립금) : \0 (\0) </h1>
    </N.MainWrapper>
  );
};

export default Order;
