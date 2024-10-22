import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductList/ProductStyle';
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
    justify-content: center;
    margin-right: 0;
    margin-top: 2%;
    max-width: 250px;
    width: 90%;
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
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: auto;

  @media(max-width: 780px) {
    max-width: 700px;
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

const StatusSelect = styled.select`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

// 새로 추가한 SelectBar 스타일
const SelectBar = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productImage: 'https://via.placeholder.com/100',  // 실제 이미지 URL로 변경
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: 280000,
      totalPrice: 280000,
      orderDate: '2024-09-06',
      point: 0,
      customer: '홍길동',
      status: '주문 완료'
    },
    {
      id: 2,
      productImage: 'https://via.placeholder.com/100',  // 실제 이미지 URL로 변경
      productName: '단방향 자브라 마이크 (KJ 337 QD)',
      option: '17mm 전용',
      quantity: 1,
      unitPrice: 280000,
      totalPrice: 280000,
      orderDate: '2024-09-06',
      point: 0,
      customer: '김철수',
      status: '배송 중'
    }
  ]);

  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchCategory, setSearchCategory] = useState('productName'); // 검색 카테고리

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", searchValue);
    setSearchValue('');
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
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

  // 검색 필터링 함수 (선택된 카테고리에 따라 검색)
  const filterOrdersBySearch = (filteredOrders) => {
    if (!searchValue) {
      return filteredOrders; // 검색어가 없으면 전체 목록 반환
    }

    return filteredOrders.filter(order => 
      order[searchCategory].includes(searchValue)
    );
  };

  // 총 주문 금액 계산
  const calculateTotalAmount = (filteredOrders) => {
    return filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  };

  // 날짜와 검색어 필터링을 함께 적용
  const filteredOrders = filterOrdersBySearch(filterOrdersByDate());

  return (
    <>
      <MainWrapper>
        <Title>주문확인</Title>
        <SearchSection style={{whiteSpace: 'nowrap'}}>
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
          <SearchWrap>
          <SelectBar 
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="productName">상품명</option>
                <option value="customer">주문자 정보</option>
              </SelectBar>
            <N.StyledForm onSubmit={handleSubmit}>
              {/* Select Bar 추가 */}
              <Form.Control
                type="text"
                placeholder="검색어 입력"
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
              <TableCell>상품명</TableCell>
              <TableCell>옵션 선택</TableCell>
              <TableCell>수량</TableCell>
              <TableCell>단가</TableCell>
              <TableCell>총 금액(적립금)</TableCell>
              <TableCell>주문정보</TableCell>
              <TableCell>주문자 정보</TableCell>
              <TableCell>주문 상태</TableCell>
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
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <StatusSelect
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="주문 완료">주문 완료</option>
                    <option value="배송 중">배송 중</option>
                    <option value="배송 완료">배송 완료</option>
                  </StatusSelect>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </OrderTable>
        <TotalAmount>총 주문 금액: ₩{calculateTotalAmount(filteredOrders).toLocaleString()}</TotalAmount>
      </MainWrapper>
      <P.Pagediv>
        <Pagination />
      </P.Pagediv>
    </>
  );
};

export default OrderList;
