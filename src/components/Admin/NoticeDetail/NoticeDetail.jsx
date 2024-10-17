import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as D from './NoticeDetailStyle'; 
import * as N from '../Notice/NoticeStyle'; 
import edit from '/src/assets/icon/Admin/editpost.svg';

const NoticeDetail = () => {
  const notice = {
    id: 1,
    title: "공지사항 제목",
    created_at: "2023-01-01",
    creator: "홍길동",
    view_count: 150,
    content: "공지사항의 내용입니다. 여기에 자세한 설명이 포함됩니다."
  };
  const [isPopup, setIsPopup] = useState(false); // 팝업 설정 여부 상태 관리



  const handleCheckboxChange = () => {
    setIsPopup(!isPopup); 
  };
  const navigate = useNavigate('');

  return (
    <N.MainWrapper2>
      <N.Section style={{width: '90%', minHeight: '2.6vh', border: 'none'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <D.EditImg src={edit} onClick={e=>navigate("/admin/adminnoticeedit")}/>
        </div>
        <D.BoardViewWrap>
          <D.BoardView>
          <D.Title>제목 
            <span style={{ display: 'inline-block', marginLeft: '20px', marginRight: '20px', color: '#aaa', fontSize: '1.6rem' }}>
              |
            </span> 
            {notice.title}
          </D.Title>
            <D.Info>
              <D.InfoItem>
              <D.InfoItemText>No</D.InfoItemText>
                <D.InfoItemText>: {notice.id}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>작성일</D.InfoItemText>
                <D.InfoItemText>: {new Date(notice.created_at).toLocaleDateString()}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>작성자</D.InfoItemText>
                <D.InfoItemText>: {notice.creator}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>조회</D.InfoItemText>
                <D.InfoItemText>: {notice.view_count}</D.InfoItemText>
              </D.InfoItem>
            </D.Info>
            <D.Cont>
              {notice.content.split('\n').map((content, index) => (
                <React.Fragment key={index}>
                  {content}
                  <br />
                </React.Fragment>
              ))}
            </D.Cont>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <D.Checkbox
                type="checkbox"
                id="popupCheckbox"
                checked={isPopup}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="popupCheckbox" style={{ marginLeft: '8px', fontSize: '1.2rem' }}>
                팝업으로 설정
              </label>
            </div>
            <hr style={{ margin: '20px 0', border: '1.3px solid #000' }} />

          </D.BoardView>
        </D.BoardViewWrap>
      <D.BtWrap>
            <D.BtLink as={Link} to="/admin/adminnotice">
              목록
            </D.BtLink>
            <D.DeleteBtLink as={Link} to="">
              삭제
            </D.DeleteBtLink>
          </D.BtWrap>
      </N.Section>
    </N.MainWrapper2>
  );
}

export default NoticeDetail;
