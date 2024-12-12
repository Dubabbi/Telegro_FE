import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import * as N from '../Notice/NoticeStyle';
import * as R from './OrderManagerStyle';
import * as O from '../OrderProcess/OrderProcessStyle';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';

const OrderManager = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(3);
  const [allOrders, setAllOrders] = useState([]); 
  const pagesPerGroup = 5; 
  const startPage = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const getIamportToken = async () => {
    try {
      const response = await axios.post("https://api.iamport.kr/users/getToken", {
        imp_key: "7540428574040455",
        imp_secret: "N3gflhvzjeD6LRRMTqOLJRCYn3HyJgoBjpkZk6JQJY8c0jPtXjS0wRVvmR5eAJLm8ezBWUnxXIoNH6j9",
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (response.data.code === 0) {
        return response.data.response.access_token;
      } else {
        console.error("토큰 발급 실패:", response.data.message);
      }
    } catch (error) {
      console.error("토큰 발급 중 오류 발생:", error);
    }
    return null;
  };
  
  const handleCancelRequest = async (orderId, impUid, reason, refundDetails) => {
    const iamportToken = await getIamportToken();
  
    if (!iamportToken) {
      alert("결제 취소를 위한 인증 토큰 발급에 실패했습니다.");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://api.iamport.kr/payments/cancel`,
        {
          imp_uid: impUid,
          merchant_uid: orderId,
          reason: reason,
          refund_holder: refundDetails.holder,
          refund_bank: refundDetails.bankCode,
          refund_account: refundDetails.account,
        },
        {
          headers: {
            Authorization: `Bearer ${iamportToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.code === 0) {
        alert("결제가 성공적으로 취소되었습니다.");
      } else {
        alert(`결제 취소 요청에 실패했습니다: ${response.data.message}`);
      }
    } catch (error) {
      console.error("결제 취소 요청 중 오류 발생:", error);
      alert("결제 취소 요청 중 오류가 발생했습니다.");
    }
  };
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const formatDate = (date) => {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
  
        const accessToken = localStorage.getItem('token');

        const allDataResponse = await axios.get(`https://api.telegro.kr/api/orders`, {
          params: {
            startDate: startDate ? formatDate(startDate) : undefined,
            endDate: endDate ? formatDate(endDate) : undefined,
            search: searchValue || undefined,
            page: 0, 
            size: 1000,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        const { data: allData } = allDataResponse.data;
        setAllOrders(allData.orders);
        
        const paginatedResponse = await axios.get(`https://api.telegro.kr/api/orders`, {
          params: {
            startDate: startDate ? formatDate(startDate) : undefined,
            endDate: endDate ? formatDate(endDate) : undefined,
            page: currentPage - 1,
            search: searchValue || undefined,
            size,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        const { data: paginatedData } = paginatedResponse.data;
        setOrders(paginatedData.orders);
        setTotalPages(paginatedData.totalPage); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [startDate, endDate, currentPage, size, searchValue]); 
  

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

const handleGroupChange = (direction) => {
  if (direction === 'prev' && startPage > 1) {
    setCurrentPage(startPage - 1);
  } else if (direction === 'next' && endPage < totalPages) {
    setCurrentPage(endPage + 1);
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

  const calculateTotalAmount = (allOrders) => {
    return allOrders.reduce((acc, order) => {
      return acc + order.products.reduce((sum, product) => sum + product.totalPrice, 0);
    }, 0);
  };

  const filteredOrders = filterOrdersByName(orders);
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
        setTotalPages(response.data.data.totalPage);
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
              <TableCell>주문 상태</TableCell>
            </tr>
          </TableHead>
          <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              {order.products.map((product, productIndex) => (
                <TableRow onClick={() => navigate(`/ordermanager/${order.id}`)} className={`order-${order.id} ${productIndex === 0 ? 'highlight-row' : ''}`} key={product.id}>
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
                        <div>
                          <span>{order.orderStatus}</span>
                          {order.orderStatus === "ORDER_COMPLETED" && (
                            <>
                            <br />
                            <CancelButton
                              onClick={() =>
                                handleCancelRequest(order.id, order.impUid, "고객 요청", {
                                  holder: "예금주 이름",
                                  bankCode: "은행 코드",
                                  account: "환불 계좌 번호",
                                })
                              }
                            >
                              취소 요청
                            </CancelButton>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
          </tbody>
        </OrderTable>
      <R.TotalAmount>
      <R.TotalAmount>
        총 주문 금액: ₩{calculateTotalAmount(allOrders).toLocaleString()}
      </R.TotalAmount>
      </R.TotalAmount>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        onPageChange={handlePageChange}
        onGroupChange={handleGroupChange}
      />
    </R.MainWrapper>
  );
};

export default OrderManager;


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


const TableRow = styled.tr`
  cursor: pointer;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

const CancelButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #ff4d4d;
  }
`;
