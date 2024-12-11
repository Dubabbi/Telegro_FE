import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductList/ProductStyle';
import * as N from './Notice/NoticeStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';


const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchCategory, setSearchCategory] = useState('productName');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(3);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get(`https://api.telegro.kr/api/orders`, {
          params: { startDate, endDate, page: currentPage - 1, size },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  
        if (response.data.code === 20000) {
          const sortedOrders = response.data.data.orders.sort((a, b) => b.id - a.id);
          setOrders(sortedOrders);
          setTotalPages(response.data.data.totalPage);
        } else {
          alert('주문 목록을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error("Error fetching order list:", error);
        alert('주문 목록을 불러오는 중 오류가 발생했습니다.');
      }
    };
  
    fetchOrders();
  }, [startDate, endDate, currentPage, size]);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", searchValue);
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

  const filterOrdersBySearch = (filteredOrders) => {
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

  const filteredOrders = filterOrdersBySearch(orders);


  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.patch(
        `https://api.telegro.kr/api/orders/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            status: newStatus,
          },
        }
      );
  
      if (response.data.code === 20000) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        alert('주문 상태가 변경되었습니다.');
      } else {
        alert('주문 상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert('주문 상태 변경 중 오류가 발생했습니다.');
    }
  };
  
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
              <Form.Control
                type="text"
                placeholder="검색어 입력"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <N.StyledButton type="submit"><FaSearch size={15} /></N.StyledButton>
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
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              {order.products.map((product, productIndex) => (
                <TableRow onClick={() => navigate('/admin/orderlist/:orderId')} className={`order-${order.id} ${productIndex === 0 ? 'highlight-row' : ''}`} key={product.id}>
                  {productIndex === 0 && (
                    <TableCell rowSpan={order.products.length}>
                      {index + 1 + (currentPage - 1) * size}
                    </TableCell>
                  )}
                  <TableCell>
                    <img src={product.coverImage || 'https://via.placeholder.com/100'} alt="product" width="100" />
                    <p>{product.productName}</p>
                  </TableCell>
                  <TableCell>{product.selectOption || 'N/A'}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{`${product.productPrice}원`}</TableCell>
                  <TableCell>{`${product.totalPrice}원 (${product.point || 0}원)`}</TableCell>
                  {productIndex === 0 && (
                    <>
                      <TableCell rowSpan={order.products.length}>{order.createdAt}</TableCell>
                      <TableCell rowSpan={order.products.length}>
                        {order.userInfo.username}
                        <br/><br/>
                        <small>{order.deliveryAddress.address}</small>
                        <br/>
                        <small>{order.deliveryAddress.addressDetail}({order.deliveryAddress.zipcode})</small>
                      </TableCell>
                      <TableCell rowSpan={order.products.length}>
                        <StatusSelect
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="ORDER_COMPLETED">주문 완료</option>
                          <option value="ORDER_CANCELED">주문 취소</option>
                          <option value="SHIPPING">배송 중</option>
                          <option value="DELIVERED">배송 완료</option>
                        </StatusSelect>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          </tbody>
        </OrderTable>
        <TotalAmount>총 주문 금액: ₩{calculateTotalAmount(filteredOrders).toLocaleString()}</TotalAmount>
      </MainWrapper>
      <P.Pagediv>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </P.Pagediv>
    </>
  );
};

export default OrderList;


const MainWrapper = styled.div`
  width: 70%; 
  margin-left: 280px;
  margin-top: 5%;
  @media(max-width: 780px){
    width: 100%; 
    margin: 5% 1%;
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

const SelectBar = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;
const TableRow = styled.tr`
  cursor: pointer;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;