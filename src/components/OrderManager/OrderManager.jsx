import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';
import * as N from '../Notice/NoticeStyle';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
export const Div = styled.div`
  width: 100%;
  min-height: 160px;
  border: none;
  @media (max-width: 780px) {
    max-height: 4vh;
    min-height: 6vh;
  }
`;

const MainWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 90%;
    margin-left: 5%;
  }
`;

const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Date input styles
const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


// Table
const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// Table head
const TableHead = styled.thead`
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: left;
`;

// Table cell
const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle; /* This will vertically align content to the middle */
`;

// Table row
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const CheckOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productImage: 'https://via.placeholder.com/100',  // 실제 이미지 URL로 변경
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: '1',
      totalPrice: '₩280,000',
      orderDate: '2024-09-06',
      point: '₩0'
    },
    {
      id: 2,
      productImage: 'https://via.placeholder.com/100',  // 실제 이미지 URL로 변경
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: '1',
      totalPrice: '₩280,000',
      orderDate: '2024-09-06',
      point: '₩0'
    },
    {
        id: 2,
        productImage: 'https://via.placeholder.com/100',  // 실제 이미지 URL로 변경
        productName: '단방향 자브라 마이크 (KJ 337 QD)',
        option: '17mm 전용',
        quantity: 1,
        unitPrice: '1',
        totalPrice: '₩280,000',
        orderDate: '2024-09-06',
        point: '₩0'
      }
  ]);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };
  return (
    <MainWrapper>
      <Div></Div>
      <Title>주문확인</Title>
      <SearchSection >
        <div>
          <label>기간: </label>
          <DateInput type="date" /> - <DateInput type="date" />
        </div>
        <N.SearchWrap style={{marginLeft: '20%'}}>
            <N.StyledForm onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="게시글 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
      </SearchSection>

      <OrderTable>
        <TableHead>
          <tr>
            <TableCell>No</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>옵션 선택</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>단가</TableCell>
            <TableCell>총 금액(적립금)</TableCell>
            <TableCell>주문정보</TableCell>
          </tr>
        </TableHead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={order.productImage} alt="product" width="100" />
                <p>{order.productName}</p>
              </TableCell>
              <TableCell>{order.option}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.unitPrice}</TableCell>
              <TableCell>{order.totalPrice}<br />({order.point})</TableCell>
              <TableCell>{order.orderDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </OrderTable>
      <Pagination />
    </MainWrapper>
  );
};

export default CheckOrder;
