import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import AddClient from '/src/assets/icon/Admin/addclient.svg';
import * as N from './Notice/NoticeStyle';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductList/ProductStyle';
const roleColors = {
  MEMBER: { background: '#D8EBFF', color: '#007BFF' }, // 파란색 배경, 파란 텍스트
  DEALER: { background: '#E8F5E9', color: '#4CAF50' }, // 초록색 배경, 초록 텍스트
  BEST: { background: '#FFF3E0', color: '#FB8C00' }, // 주황색 배경, 주황 텍스트
  BUSINESS: { background: '#FFEBEE', color: '#D32F2F' }, // 빨간색 배경, 빨간 텍스트
  ADMIN: { background: '#EDE7F6', color: '#7E57C2' } // 보라색 배경, 보라 텍스트
};
const RoleTag = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ role }) => roleColors[role]?.background || '#F0F0F0'};
  color: ${({ role }) => roleColors[role]?.color || '#333'};
  padding: 0.2rem 0.6rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
`;

// 작은 원 아이콘
const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: ${({ role }) => roleColors[role]?.color || '#333'};
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const MainWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 3vh;
  padding: 2%;
  @media(max-width: 780px) {
    margin-left: 0px;
    margin-top: 7vh;
  }
`;

const Div = styled.div`
  margin-left: 270px;
  @media(max-width: 780px) {
    margin-left: 0px;
    margin-top: 7vh;
  }
`;

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
  &:nth-child(even) {
    background-color: #FCFCFD;
  }
  &:hover {
    background-color: #ececec;
    cursor: pointer;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  @media(max-width: 780px) {
    &:nth-child(4), &:nth-child(6), &:nth-child(7) {
      display: none;
    }
  }
`;

const TableData = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  @media(max-width: 780px) {
    &:nth-child(4), &:nth-child(6), &:nth-child(7) {
      display: none;
    }
  }
`;

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

const ClientManagement = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]); // 사용자 데이터
  const [roleFilter, setRoleFilter] = useState(''); // role 필터링용 상태
  const [filteredClients, setFilteredClients] = useState([]); // 필터링된 사용자 데이터
  const pageSize = 20; // 페이지 크기
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); 
  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const params = {
          page: currentPage - 1,
          size: pageSize,
        };

        const response = await axios.get('https://api.telegro.kr/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: params,
        });

        if (response.status === 200) {
          setClients(response.data.data.users); // 전체 사용자 데이터 저장
        } else {
          alert('사용자 데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        alert('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchClients();
  }, [currentPage]);

  // role 필터링 처리
  useEffect(() => {
    if (roleFilter) {
      // roleFilter 값이 있을 경우 필터링
      const filtered = clients.filter(client => client.role === roleFilter);
      setFilteredClients(filtered);
    } else {
      // roleFilter 값이 없을 경우 전체 사용자 데이터 표시
      setFilteredClients(clients);
    }
  }, [roleFilter, clients]);
  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 변경 시 상태 업데이트
  };
  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1); 
  };

  const handleDelete = async (clientId) => {
    const confirmDelete = window.confirm('정말 이 회원을 삭제하시겠습니까?'); 
    if (!confirmDelete) {
      return;
    }
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      const response = await axios.delete(`https://api.telegro.kr/api/users/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert('회원이 성공적으로 삭제되었습니다.');
        // 삭제 후 목록에서 제거
        setClients(clients.filter(client => client.id !== clientId));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert('유저 인증 실패: 다시 로그인해 주세요.');
          navigate('/admin');
        } else if (error.response.status === 404) {
          alert('해당 리소스를 찾을 수 없습니다.');
        } else {
          alert('서버 오류가 발생했습니다.');
        }
      } else {
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <Div>
        <MainWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <N.PageTitle>
              <h2>고객 관리</h2>
            </N.PageTitle>
            <div>
              {/* Role 필터링을 위한 Select Box */}
              <select value={roleFilter} onChange={handleRoleChange}>
                <option value="">전체</option>
                <option value="MEMBER">MEMBER</option>
                <option value="DEALER">DEALER</option>
                <option value="BEST">BEST</option>
                <option value="BUSINESS">BUSINESS</option>
              </select>
            </div>
          </div>
          <Add onClick={() => navigate('/admin/addclient')} src={AddClient} />
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
              {filteredClients.length > 0 ? (
                filteredClients.map((client, index) => (
                  <TableRow key={client.id}>
                    <TableData>{index + 1}</TableData>
                    <TableData>
                      <RoleTag role={client.role}>
                        <Dot role={client.role} />
                        {client.role}
                      </RoleTag>
                    </TableData>
                    <TableData onClick={() => navigate(`/admin/ClientDetail/${client.id}`)}>{client.userName}</TableData>
                    <TableData>{client.phone}</TableData>
                    <TableData>{client.email}</TableData>
                    <TableData>{client.userId}</TableData>
                    <TableData>{new Date(client.createdDate).toLocaleDateString()}</TableData>
                    <TableData>{`\₩${client.totalPrice.toLocaleString()} (\₩${Math.floor(client.totalPrice * 0.1).toLocaleString()})`}</TableData>
                    <TableData>
                      <IconButton onClick={() => navigate(`/admin/ClientEdit/${client.id}`)}><FaPencilAlt /></IconButton>
                    </TableData>
                    <TableData>
                      <IconButton onClick={() => handleDelete(client.id)}><FaTrash /></IconButton>
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan="10">고객 데이터가 없습니다.</TableData>
                </TableRow>
              )}
            </tbody>
          </Table>
        </MainWrapper>
      </Div>
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

export default ClientManagement;
