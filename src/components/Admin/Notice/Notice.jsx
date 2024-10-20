import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as N from './NoticeStyle';
import editpost from '/src/assets/icon/Admin/editpost.svg';
import Pagination from '../../Pagination/Pagination';
import * as P from '../ProductList/ProductStyle';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFile } from 'react-icons/fa';

const AdminNotice = ({ page = 0, size = 10 }) => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredNotice, setFilteredNotice] = useState([]); 

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/notices', {
          params: { page, size },
        });
  
        console.log('API Response:', response); 
  
        if (response.status === 200) {
          const sortedNotices = response.data.data.notices.sort((a, b) => {
            return new Date(b.noticeCreateDate) - new Date(a.noticeCreateDate);
          });
          setNotice(sortedNotices);
          setFilteredNotice(sortedNotices); // 여기서 초기값 설정
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);
      }
    };
  
    fetchNotices();
  }, [page, size]);
  


  if (error) {
    return <div>{error}</div>;  // 에러 표시
  }

  // noticeFileName 값이 있는 경우 파일 확장자에 따라 아이콘을 반환하는 함수
  const getFileIcon = (filename) => {
    if (!filename) {
      return <FaFile />; // 파일 이름이 없을 때 기본 파일 아이콘 반환
    }
  
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage />;
      case 'doc':
      case 'docx':
        return <FaFileWord />;
      case 'xlsx':
        return <FaFileExcel />;
      default:
        return <FaFile />; // 기본 파일 아이콘
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      const filtered = notice.filter((item) => 
        item.noticeTitle.toLowerCase().includes(searchValue.toLowerCase()) // 대소문자 구분 없이 필터링
      );
      setFilteredNotice(filtered);  // 검색 결과로 상태 업데이트
    } else {
      setFilteredNotice(notice);  // 검색어가 없으면 전체 리스트로 설정
    }
  };

  const items = filteredNotice.map((notice) => (
    <CommonTableRow key={notice.id}>
      <CommonTableColumn>{notice.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/admin/adminnoticedetail/${notice.id}`}>{notice.noticeTitle}</Link>
      </CommonTableColumn>
      <CommonTableColumn>
        {getFileIcon(notice.noticeFileName)}
      </CommonTableColumn>
      <CommonTableColumn>{notice.noticeAuthor}</CommonTableColumn>
      <CommonTableColumn>{new Date(notice.noticeCreateDate).toLocaleDateString()}</CommonTableColumn>
      <CommonTableColumn>{notice.viewCount}</CommonTableColumn>
    </CommonTableRow>
  ));
  
  return (
    <>
    <N.MainWrapper>
      <N.Section2 style={{marginTop: '3%'}}>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <div style={{textAlign: 'right'}}> 총 게시물 수 : {filteredNotice.length}  현재 페이지 : 1 / 6</div>
        <N.BoardSearchArea>
          <N.SearchWindow marginLeft>
            <N.SearchWrap>
            <N.StyledForm onSubmit={handleSearch}>
                <Form.Control
                  type="text"
                  placeholder="게시글 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              <N.StyledButton type="submit" variant="none"><FaSearch size={15} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
          </N.SearchWindow>
        </N.BoardSearchArea>
        <div>
          <CommonTable headersName={['No', '제목', '첨부', '작성자', '등록일', '조회수']}>{items}</CommonTable>
        </div>      
      </N.Section2>
      <N.Add onClick={() => navigate('/admin/noticecreate')} src={editpost} />
    </N.MainWrapper>
    <P.Pagediv>
      <Pagination />
    </P.Pagediv>
    </>
  );
};

export default AdminNotice;
