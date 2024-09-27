import React from 'react';
import { Link } from 'react-router-dom';
import * as D from './NoticeDetailStyle'; // 스타일 파일을 가져옵니다.
import * as N from '../Notice/NoticeStyle'; // 스타일 파일을 가져옵니다.

const NoticeDetail = () => {
  const notice = {
    id: 1,
    title: "공지사항 제목",
    created_at: "2023-01-01",
    creator: "홍길동",
    view_count: 150,
    content: "공지사항의 내용입니다. 여기에 자세한 설명이 포함됩니다."
  };


  return (
    <N.MainWrapper>
      <N.Div></N.Div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <D.BoardViewWrap>
          <D.BoardView>
            <D.Title>제목 <span style={{marginLeft:'1%', marginRight: '1%', color: '#aaa', fontSize: '1.6rem'}}>|</span> {notice.title}</D.Title>
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
          </D.BoardView>
          <D.BtWrap>
            <D.BtLink as={Link} to="/notice">
              목록
            </D.BtLink>
          </D.BtWrap>
        </D.BoardViewWrap>
      </N.Section>
    </N.MainWrapper>
  );
}

export default NoticeDetail;
