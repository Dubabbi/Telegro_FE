import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as N from './NoticeStyle';
import Pagination from '../Pagination/Pagination';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFile } from 'react-icons/fa';

const Notice = () => {
  const [notice, setNotice] = useState([
    { id: 1, title: "공지사항 1", created_at: "2023-01-01", view_count: 150, author: "Admin", attachment: "File.pdf" },
    { id: 2, title: "공지사항 2", created_at: "2023-01-02", view_count: 80, author: "Manager", attachment: "Image.jpg" },
    { id: 3, title: "공지사항 3", created_at: "2023-01-01", view_count: 150, author: "Admin", attachment: "Document.docx" },
    { id: 4, title: "공지사항 4", created_at: "2023-01-02", view_count: 80, author: "Staff", attachment: "No File" },
    { id: 5, title: "공지사항 5", created_at: "2023-01-03", view_count: 90, author: "Coordinator", attachment: "Chart.xlsx" }
  ]);

  {/*
    useEffect(() => {
    axios.get('')
      .then(response => {
        if (response.data.isSuccess) {
          const sortedData = response.data.data.sort((a, b) => {
            // 날짜를 Date 객체로 변환하여 비교
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setNotices(sortedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Failed to load word sets: ${error.message}`);
      });
  }, []);
  */}

  const getFileIcon = (filename) => {
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


  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };

  const items = notice.map((notice) => (
    <CommonTableRow key={notice.id}>
      <CommonTableColumn>{notice.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/noticedetail`}>{notice.title}</Link>
      </CommonTableColumn>
      <CommonTableColumn>
        {getFileIcon(notice.attachment)}
      </CommonTableColumn>
      <CommonTableColumn>{notice.author}</CommonTableColumn>
      <CommonTableColumn>{new Date(notice.created_at).toLocaleDateString()}</CommonTableColumn>
      <CommonTableColumn>{notice.view_count}</CommonTableColumn>
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
        <div style={{textAlign: 'right'}}> 총 게시물 수 : 58  현재 페이지 : 1 / 6</div>
        <N.BoardSearchArea>
          <N.SearchWindow>
            <N.SearchWrap>
            <N.StyledForm onSubmit={handleSubmit}>
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
    <Pagination />
    </>
  );
};

export default Notice;
