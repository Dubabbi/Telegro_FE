import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../Pagination/Pagination';
// Wrapper for the whole page
const MainWrapper = styled.div`
  width: 78%;
  margin-left: 22%;
  padding: 20px;
`;

// Title
const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

// Search section
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

// Search input
const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Search button
const SearchButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
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
    }
  ]);

  return (
    <MainWrapper>
      <Title>주문현황</Title>

      <SearchSection>
        <div>
          <label>기간: </label>
          <DateInput type="date" /> - <DateInput type="date" />
        </div>
        <div>
          <SearchInput type="text" placeholder="상호명 검색" />
          <SearchButton>검색</SearchButton>
        </div>
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
