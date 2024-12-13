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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(7);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // 검색 결과를 저장
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
        const accessToken = localStorage.getItem('token');
        const paginatedResponse = await axios.get(`https://api.telegro.kr/api/orders`, {
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            page: currentPage - 1,
            size,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { data: paginatedData } = paginatedResponse.data;
        setOrders(paginatedData.orders || []);
        setTotalPages(paginatedData.totalPage || 0);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [startDate, endDate, currentPage, size]);

  useEffect(() => {
    // 검색 필터링 로직을 분리
    const applySearchFilter = () => {
      if (!searchValue) {
        setFilteredOrders(orders);
      } else {
        const filtered = orders.filter(order =>
          order.products.some(product =>
            product.productName.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        setFilteredOrders(filtered);
      }
    };

    applySearchFilter();
  }, [searchValue, orders]);

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

  const formatDate = (dateString) => {
    if (!dateString) return '정보 없음';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const calculateTotalAmount = (allOrders) => {
    return allOrders.reduce((acc, order) => {
      return acc + order.products.reduce((sum, product) => sum + product.totalPrice, 0);
    }, 0);
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
          <N.StyledForm onSubmit={(e) => e.preventDefault()}>
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
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <React.Fragment key={order.id}>
                {order.products.map((product, productIndex) => (
                  <TableRow
                    onClick={() => navigate(`/ordermanager/${order.id}`)}
                    className={`order-${order.id} ${productIndex === 0 ? 'highlight-row' : ''}`}
                    key={product.id}
                  >
                    {productIndex === 0 && (
                      <TableCell rowSpan={order.products.length}>
                        {index + 1 + (currentPage - 1) * size}
                      </TableCell>
                    )}
                    <TableCell>
                      <p>{product.productName}</p>
                    </TableCell>
                    <TableCell>{product.selectOption || 'N/A'}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{`${product.productPrice}원`}</TableCell>
                    <TableCell>{`${product.totalPrice}원 (${product.point || 0}원)`}</TableCell>
                    {productIndex === 0 && (
                      <>
                        <TableCell rowSpan={order.products.length}>{formatDate(order.createdAt)}</TableCell>
                        <TableCell
                          onClick={(e) => e.stopPropagation()}
                          rowSpan={order.products.length}
                        >
                          <div>
                            <span>{order.orderStatus}</span>
                            {order.orderStatus === "ORDER_COMPLETED" && (
                              <>
                                <br />
                                <CancelButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelRequest(order.id, order.impUid, '고객 요청', {
                                      holder: '예금주 이름',
                                      bankCode: '은행 코드',
                                      account: '환불 계좌 번호',
                                    });
                                  }}
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
            ))
          ) : (
            <tr>
              <TableCell colSpan={8}>주문 데이터가 없습니다.</TableCell>
            </tr>
          )}
        </tbody>
      </OrderTable>
      <R.TotalAmount>
        총 주문 금액: ₩{calculateTotalAmount(allOrders).toLocaleString()}
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
