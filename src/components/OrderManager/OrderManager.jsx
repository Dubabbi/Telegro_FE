import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';
import * as N from '../Notice/NoticeStyle';
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

const DateInput = styled.input`
  padding: 5px;
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
  font-weight: bold;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
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

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

const OrderManager = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productImage: 'https://via.placeholder.com/100',
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: 280000,
      totalPrice: 280000,
      orderDate: '2024-09-06',
      point: 0
    },
    {
      id: 2,
      productImage: 'https://via.placeholder.com/100',
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: 280000,
      totalPrice: 280000,
      orderDate: '2024-09-10',
      point: 0
    },
    {
      id: 3,
      productImage: 'https://via.placeholder.com/100',
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: 280000,
      totalPrice: 280000,
      orderDate: '2024-09-15',
      point: 0
    }
  ]);

  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchValue);
    setSearchValue('');
  };

  // 날짜 필터링 함수
  const filterOrdersByDate = () => {
    if (!startDate || !endDate) {
      return orders; // 날짜가 선택되지 않으면 전체 주문 목록을 반환
    }

    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
  };

  // 주문명(상품명)으로 필터링하는 함수
  const filterOrdersByName = (filteredOrders) => {
    if (!searchValue) {
      return filteredOrders; // 검색어가 없으면 필터링된 전체 목록 반환
    }

    return filteredOrders.filter(order =>
      order.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  // 필터링된 주문의 총 주문 금액 계산
  const calculateTotalAmount = (filteredOrders) => {
    return filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  };

  // 필터링된 주문 목록 (날짜와 주문명에 따라)
  const filteredOrders = filterOrdersByName(filterOrdersByDate());

  return (
    <MainWrapper>
      <Div />
      <Title>주문확인</Title>
      <SearchSection>
        <div>
          <label>기간: </label>
          <DateInput 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          /> - 
          <DateInput 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <N.SearchWrap style={{ marginLeft: '20%' }}>
          <N.StyledForm onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="주문명 검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <N.StyledButton type="submit" variant="none">
              <FaSearch size={15} />
            </N.StyledButton>
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
          {filteredOrders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={order.productImage} alt="product" width="100" />
                <p>{order.productName}</p>
              </TableCell>
              <TableCell>{order.option}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.unitPrice}원</TableCell>
              <TableCell>{order.totalPrice}원<br />({order.point}원)</TableCell>
              <TableCell>{order.orderDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </OrderTable>
      
      {/* 총 주문 금액 */}
      <TotalAmount>총 주문 금액: ₩{calculateTotalAmount(filteredOrders).toLocaleString()}</TotalAmount>
      
      <Pagination />
    </MainWrapper>
  );
};

export default OrderManager;
