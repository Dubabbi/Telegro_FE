import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as N from '../Notice/NoticeStyle';

const InquiryForm = () => {
  const [inquiry, setInquiry] = useState([
    { id: 1, title: "제안문의 1", created_at: "2023-01-01", view_count: 150, author: "Admin", attachment: "File.pdf" },
    { id: 2, title: "제안문의 2", created_at: "2023-01-02", view_count: 80, author: "Manager", attachment: "Image.jpg" },
    { id: 3, title: "제안문의 3", created_at: "2023-01-01", view_count: 150, author: "Admin", attachment: "Document.docx" },
    { id: 4, title: "제안문의 4", created_at: "2023-01-02", view_count: 80, author: "Staff", attachment: "No File" },
    { id: 5, title: "제안문의 5", created_at: "2023-01-03", view_count: 90, author: "Coordinator", attachment: "Chart.xlsx" }
  ]);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("검색어:", searchValue);
      setSearchValue('');
  };

  const items = inquiry.map((inquiry) => (
    <CommonTableRow key={inquiry.id}>
      <CommonTableColumn>{inquiry.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/Inquirydetail`}>{inquiry.title}</Link>
      </CommonTableColumn>
      <CommonTableColumn>{inquiry.attachment}</CommonTableColumn>
      <CommonTableColumn>{inquiry.author}</CommonTableColumn>
      <CommonTableColumn>{new Date(inquiry.created_at).toLocaleDateString()}</CommonTableColumn>
      <CommonTableColumn>{inquiry.view_count}</CommonTableColumn>
    </CommonTableRow>
  ));

  return (
    <N.MainWrapper>
      <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>제안문의</N.TitleText>
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
        <div><hr/>
          <CommonTable headersName={['No', '제목', '첨부', '작성자', '등록일', '조회수']}>{items}</CommonTable><hr/>
        </div>
      </N.Section>
    </N.MainWrapper>
  );
};

export default InquiryForm;
