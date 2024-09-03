import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as N from './NoticeStyle';

const Notice = () => {
  const [notice, setNotice] = useState([
    { id: 1, title: "공지사항 1", created_at: "2023-01-01", view_count: 150 },
    { id: 2, title: "공지사항 2", created_at: "2023-01-02", view_count: 80 },
    { id: 3, title: "공지사항 3", created_at: "2023-01-01", view_count: 150 },
    { id: 4, title: "공지사항 4", created_at: "2023-01-02", view_count: 80 },
    { id: 5, title: "공지사항 5", created_at: "2023-01-03", view_count: 90 }
  ]);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      // 검색 기능을 여기서 구현하거나 검색 조건을 적용할 수 있습니다.
      console.log("검색어:", searchValue);
      setSearchValue('');
  };

  const items = notice.map((notice) => (
    <CommonTableRow key={notice.id}>
      <CommonTableColumn>{notice.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`./${notice.id}`}>{notice.title}</Link>
      </CommonTableColumn>
      <CommonTableColumn>{new Date(notice.created_at).toLocaleDateString()}</CommonTableColumn>
      <CommonTableColumn>{notice.view_count}</CommonTableColumn>
    </CommonTableRow>
  ));

  return (
    <N.MainWrapper>
      <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <N.BoardSearchArea>
          <N.SearchWindow>
            <N.SearchWrap>
              <N.StyledForm onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="게시글 검색" size="lg" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
                <N.StyledButton type="submit" variant="none"><FaSearch size={20} /></N.StyledButton>
              </N.StyledForm>
            </N.SearchWrap>
          </N.SearchWindow>
        </N.BoardSearchArea>
        <div><hr/>
          <CommonTable headersName={['No', '제목', '등록일', '조회수']}>{items}</CommonTable><hr/>
        </div>
      </N.Section>
    </N.MainWrapper>
  );
};

export default Notice;