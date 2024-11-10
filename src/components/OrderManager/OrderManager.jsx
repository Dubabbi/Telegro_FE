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
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      const params = {
        startDate: startDate ? formatDate(startDate) : undefined,
        endDate: endDate ? formatDate(endDate) : undefined,
        search: searchValue || undefined,
        page,
        size,
      };
  
      console.log("Request parameters:", params); // 파라미터 확인용 로그
  
      const response = await axios.get('https://api.telegro.kr/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params,
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
          {filteredOrders.map((order, orderIndex) =>
            order.products.map((product, productIndex) => (
              <R.TableRow key={`${order.id}-${product.id}`}>
                <R.TableCell>{productIndex === 0 ? orderIndex + 1 : ''}</R.TableCell>
                <R.TableCell>
                  <div>
                    <img src={product.coverImage || 'https://via.placeholder.com/100'} alt="product" width="100" />
                    <p>{product.productName}</p>
                  </div>
                </R.TableCell>
                <R.TableCell>{product.selectOption || 'N/A'}</R.TableCell>
                <R.TableCell>{product.quantity}</R.TableCell>
                <R.TableCell>{product.productPrice}원</R.TableCell>
                <R.TableCell>{product.totalPrice}원<br />({product.point || 0}원)</R.TableCell>
                <R.TableCell>{order.createdAt.split('T')[0]}</R.TableCell>
                <R.TableCell>{order.orderStatus}</R.TableCell>
              </R.TableRow>
            ))
          )}
        </tbody>
      </R.OrderTable>

      <R.TotalAmount>총 주문 금액: ₩{calculateTotalAmount(filteredOrders).toLocaleString()}</R.TotalAmount>

      <Pagination />
    </R.MainWrapper>
  );
};

export default OrderManager;
