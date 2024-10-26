import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as N from './NoticeStyle';
import Pagination from '../Pagination/Pagination';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFile } from 'react-icons/fa';

const Notice = ({ size = 10 }) => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredNotice, setFilteredNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/notices', {
          params: { page: currentPage - 1, size },
        });
  
        console.log('API Response:', response); 
  
        if (response.status === 200) {
          const sortedNotices = response.data.data.notices.sort((a, b) => {
            return new Date(b.noticeCreateDate) - new Date(a.noticeCreateDate);
          });
          setNotice(sortedNotices);
          setFilteredNotice(sortedNotices); 
          setTotalPages(response.data.data.totalPage); 
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);
      }
    };
  
    fetchNotices();
  }, [currentPage, size]); 

  if (error) {
    return <div>{error}</div>;  
  }

  const getFileIcon = (filename) => {
    if (!filename) {
      return <FaFile />; 
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
        return <FaFile />; 
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      const filtered = notice.filter((item) => 
        item.noticeTitle.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredNotice(filtered);  
    } else {
      setFilteredNotice(notice); 
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const items = filteredNotice.map((notice, index) => (
    <CommonTableRow key={notice.id}>
      <CommonTableColumn>{filteredNotice.length - index}</CommonTableColumn> 
      <CommonTableColumn>
        <Link to={`/noticedetail/${notice.id}`}>{notice.noticeTitle}</Link>
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
    <N.Div></N.Div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <div style={{textAlign: 'right'}}> 총 게시물 수 : {filteredNotice.length} </div>
        <N.BoardSearchArea>
          <N.SearchWindow>
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
      </N.Section>
    </N.MainWrapper>
    <Pagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      onPageChange={handlePageChange} 
    />
    </>
  );
};

export default Notice;