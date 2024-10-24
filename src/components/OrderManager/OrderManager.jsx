import React, { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import * as N from '../Notice/NoticeStyle';
import * as R from './OrderManagerStyle'
import * as O from '../OrderProcess/OrderProcessStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

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

  const filterOrdersByDate = () => {
    if (!startDate || !endDate) {
      return orders; 
    }

    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
  };
  const filterOrdersByName = (filteredOrders) => {
    if (!searchValue) {
      return filteredOrders;
    }

    return filteredOrders.filter(order =>
      order.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const calculateTotalAmount = (filteredOrders) => {
    return filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  };

  const filteredOrders = filterOrdersByName(filterOrdersByDate());

  return (
    <R.MainWrapper>
      <O.Div />
      <R.Title>주문확인</R.Title>
      <R.SearchSection>
        <div>
          <label>기간: </label>
          <R.DateInput 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          /> - 
          <R.DateInput 
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
      </R.SearchSection>

      <R.OrderTable>
        <R.TableHead>
          <tr>
            <R.TableCell>No</R.TableCell>
            <R.TableCell>제목</R.TableCell>
            <R.TableCell>옵션 선택</R.TableCell>
            <R.TableCell>수량</R.TableCell>
            <R.TableCell>단가</R.TableCell>
            <R.TableCell>총 금액(적립금)</R.TableCell>
            <R.TableCell>주문정보</R.TableCell>
          </tr>
        </R.TableHead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <R.TableRow key={order.id}>
              <R.TableCell>{index + 1}</R.TableCell>
              <R.TableCell>
                <img src={order.productImage} alt="product" width="100" />
                <p>{order.productName}</p>
              </R.TableCell>
              <R.TableCell>{order.option}</R.TableCell>
              <R.TableCell>{order.quantity}</R.TableCell>
              <R.TableCell>{order.unitPrice}원</R.TableCell>
              <R.TableCell>{order.totalPrice}원<br />({order.point}원)</R.TableCell>
              <R.TableCell>{order.orderDate}</R.TableCell>
            </R.TableRow>
          ))}
        </tbody>
      </R.OrderTable>
      
      <R.TotalAmount>총 주문 금액: ₩{calculateTotalAmount(filteredOrders).toLocaleString()}</R.TotalAmount>
      
      <Pagination />
    </R.MainWrapper>
  );
};

export default OrderManager;
