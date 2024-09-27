import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import AddClient from '/src/assets/icon/Admin/addclient.svg';
import * as N from './Notice/NoticeStyle';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductList/ProductStyle';

// 메인 컨테이너
const MainWrapper = styled.div`
  width: 70%;
  margin-left: 23%;
  margin-top: 3vh;
  padding: 2%;
  @media(max-width: 780px) {
    margin-left: 0px;
    margin-top: 7vh;
  }
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
  white-space: nowrap;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  @media(max-width: 780px) {
    &:nth-child(4), &:nth-child(6), &:nth-child(7) { // 전화번호, 아이디, 가입일 숨기기
      display: none;
    }
  }
`;

const TableData = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  @media(max-width: 780px) {
    &:nth-child(4), &:nth-child(6), &:nth-child(7) { // 전화번호, 아이디, 가입일 숨기기
      display: none;
    }
  }
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

const Add = styled.img`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  position: fixed;
  right: 35px;
  bottom: 20px;
  @media(max-width: 780px){
    max-width: 4.5rem;
    max-height: 4.5rem;
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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <MainWrapper>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <N.PageTitle>
            <h2>고객 관리</h2>
          </N.PageTitle>
        </div>
        <Add onClick={() => navigate('/admin/addclient')} src={AddClient} />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>No</TableHeader>
              <TableHeader>단가</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>전화번호</TableHeader> {/* 모바일에서 숨길 열 */}
              <TableHeader>이메일</TableHeader>
              <TableHeader>아이디</TableHeader> {/* 모바일에서 숨길 열 */}
              <TableHeader>가입일</TableHeader> {/* 모바일에서 숨길 열 */}
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
                <TableData>{client.phone}</TableData> {/* 모바일에서 숨길 열 */}
                <TableData>{client.email}</TableData>
                <TableData>{client.id}</TableData> {/* 모바일에서 숨길 열 */}
                <TableData>{client.date}</TableData> {/* 모바일에서 숨길 열 */}
                <TableData>{`\₩${client.total.toLocaleString()} (\₩${client.points.toLocaleString()})`}</TableData>
                <TableData>
                  <IconButton onClick={() => navigate('/admin/clientedit')}><FaPencilAlt /></IconButton>
                </TableData>
                <TableData>
                  <IconButton><FaTrash /></IconButton>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </MainWrapper>
      <P.Pagediv>
        <Pagination />
      </P.Pagediv>
    </>
  );
};

export default ClientManagement;
