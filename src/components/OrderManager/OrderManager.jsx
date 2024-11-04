import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import * as N from '../Notice/NoticeStyle';
import * as R from './OrderManagerStyle';
import * as O from '../OrderProcess/OrderProcessStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, [startDate, endDate, page, size]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://api.telegro.kr/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page,
          size,
        },
      });
      const { data } = response.data;
      if (data) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
    setSearchValue('');
  };

  const filterOrdersByName = (filteredOrders) => {
    if (!searchValue) {
      return filteredOrders;
    }
    return filteredOrders.filter(order =>
      order.products.some(product =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const calculateTotalAmount = (filteredOrders) => {
    return filteredOrders.reduce((acc, order) => {
      return acc + order.products.reduce((sum, product) => sum + product.totalPrice, 0);
    }, 0);
  };

  const filteredOrders = filterOrdersByName(orders);

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
          />
          -
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
            <R.TableCell>주문상태</R.TableCell>
          </tr>
        </R.TableHead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <R.TableRow key={order.id}>
              <R.TableCell>{index + 1}</R.TableCell>
              <R.TableCell>
                {order.products.map((product) => (
                  <div key={product.id}>
                    <img src={product.coverImage || 'https://via.placeholder.com/100'} alt="product" width="100" />
                    <p>{product.productName}</p>
                  </div>
                ))}
              </R.TableCell>
              <R.TableCell>{order.products[0].selectOption}</R.TableCell>
              <R.TableCell>{order.products[0].quantity}</R.TableCell>
              <R.TableCell>{order.products[0].productPrice}원</R.TableCell>
              <R.TableCell>{order.products[0].totalPrice}원<br />({order.point}원)</R.TableCell>
              <R.TableCell>{order.createdAt.split('T')[0]}</R.TableCell>
              <R.TableCell>{order.orderStatus}</R.TableCell>
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
