import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

// 메인 컨테이너
const MainWrapper = styled.div`
  width: 70%;
  margin-left: 23%;
  margin-top: 3vh;
  padding: 2%;
`;

// 표 테이블 스타일
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  margin-top: 3%;
`;

const TableHead = styled.thead`
  background-color: #f9f9f9;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

// 버튼 스타일
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #4d44b5;

  &:hover {
    color: #3b3a9d;
  }
`;

// 페이지네이션 스타일
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;

const PageButton = styled.button`
  background: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #4D44B5;
    color: white;
    border: none;
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }
`;

// 더미 데이터
const clientsData = [
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 },
  { no: 20, name: '홍길동', phone: '010-1234-5678', email: 'example@email.com', id: 'example', date: '2024-09-08', total: 800000, points: 8000 }
  // 여기에 추가 데이터 넣을 수 있음
];

const ClientManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MainWrapper>
      <h2 style={{fontSize: '1.5vw', fontWeight: 'bold'}}>회원관리</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>단가</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>전화번호</TableHeader>
            <TableHeader>이메일</TableHeader>
            <TableHeader>아이디</TableHeader>
            <TableHeader>가입일</TableHeader>
            <TableHeader>총 주문액(적립금)</TableHeader>
            <TableHeader>수정</TableHeader>
            <TableHeader>삭제</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {clientsData.map((client) => (
            <TableRow key={client.no}>
              <TableData>{client.no}</TableData>
              <TableData>{client.no % 2 === 0 ? 'B' : 'A'}</TableData>
              <TableData>{client.name}</TableData>
              <TableData>{client.phone}</TableData>
              <TableData>{client.email}</TableData>
              <TableData>{client.id}</TableData>
              <TableData>{client.date}</TableData>
              <TableData>{`\₩${client.total.toLocaleString()} (\₩${client.points.toLocaleString()})`}</TableData>
              <TableData>
                <IconButton><FaPencilAlt /></IconButton>
              </TableData>
              <TableData>
                <IconButton><FaTrash /></IconButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </PageButton>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </PageButton>
      </PaginationWrapper>
    </MainWrapper>
  );
};

export default ClientManagement;
