import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';
import * as N from './Notice/NoticeStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

const MainWrapper = styled.div`
  width: 65%; 
  margin-left: 280px;
  margin-top: 4%;
  @media(max-width: 780px){
    width: 100%; 
    margin: 0 auto;
  }
`;
export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-left: 20%;
  width: 100%;
  max-width: 350px;
  align-items: center;

  @media (max-width: 780px) {
    justify-content: center; /* 작은 화면에서 가운데 정렬 */
    margin-right: 0;
    margin-top: 2%;
    max-width: 250px;
    width: 90%; /* 더 작은 화면에서 검색창을 적절히 줄임 */
  }
`;

const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  @media(max-width: 780px){
    font-size: 1.9rem;
    margin-top: 10%;
  }
`;


const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media(max-width: 780px) {
    flex-direction: column; // 작은 화면에서 세로로 정렬
    align-items: flex-start; // 왼쪽 정렬
  }
`;

const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: auto;

  @media(max-width: 780px) {
    max-width: 700px; // 작은 화면에서 너비 100%로 설정
    width: 70%;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 1rem;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 780px) {
    th, td {
      padding: 8px;
    }
  }
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle; /* This will vertically align content to the middle */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #FCFCFD;
    &:hover {
      background-color: #eceaea;
      cursor: pointer;
    }
  }
  &:hover {
    background-color: #eceaea;
    cursor: pointer;
  }
`;

const OrderList = () => {
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
      <Title>주문확인</Title>

      <SearchSection style={{whiteSpace: 'nowrap'}}>
        <div>
          <label>기간: </label>
          <DateInput type="date" /> - <DateInput type="date" />
        </div>
        <SearchWrap>
          <N.StyledForm onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="주문 목록 검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
          </N.StyledForm>
        </SearchWrap>
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

export default OrderList;
