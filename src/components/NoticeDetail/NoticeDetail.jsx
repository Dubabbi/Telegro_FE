import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as D from './NoticeDetailStyle'; // 스타일 파일을 가져옵니다.
import * as N from '../Notice/NoticeStyle'; // 스타일 파일을 가져옵니다.

const NoticeDetail = () => {
  const { noticeId } = useParams();  // URL에서 noticeId 추출
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/notices/${noticeId}`);
        if (response.status === 200) {
          setNotice(response.data.data);  
        }
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  if (!notice) {
    // 공지사항 데이터가 로드되지 않았을 때 로딩 상태 표시
    return <div>Loading...</div>;
  }

  return (
    <N.MainWrapper style={{textAlign: 'left'}}>
      <N.Div></N.Div>
      <N.Section style={{textAlign: 'left'}}>
        <N.PageTitle>
          <N.TitleText>공지사항</N.TitleText>
        </N.PageTitle>
        <D.BoardViewWrap>
          <D.BoardView>
            <D.Title>제목 
            <span style={{ display: 'inline-block', marginLeft: '20px', marginRight: '20px', color: '#aaa', fontSize: '1.6rem' }}>
              |
            </span> 
            {notice.noticeTitle}
          </D.Title>
            <D.Info>
              <D.InfoItem>
              <D.InfoItemText>No</D.InfoItemText>
                <D.InfoItemText>: {notice.id}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>작성일</D.InfoItemText>
                <D.InfoItemText>: {new Date(notice.noticeCreateDate).toLocaleDateString()}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>작성자</D.InfoItemText>
                <D.InfoItemText>: {notice.noticeAuthor}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>조회</D.InfoItemText>
                <D.InfoItemText>: {notice.viewCount}</D.InfoItemText>
              </D.InfoItem>
            </D.Info>
            <div style={{textAlign: 'left !important'}}>
            <D.Cont dangerouslySetInnerHTML={{ __html: notice.noticeContent }} />
            </div>
            <div style={{ marginTop: '20px' }}>
            <h4>첨부 파일</h4>
            <ul>
              {notice.noticeFiles.map(file => (
                <li key={file.id}>
                  <a href={file.fileUrl} download={file.fileName} target="_blank" rel="noopener noreferrer">
                    {file.fileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
            <hr style={{ margin: '20px 0', border: '1.3px solid #000' }} />
          </D.BoardView>
          <D.BtWrap>
            <D.BtLink as={Link} to="/notice">
              목록
            </D.BtLink>
          </D.BtWrap>
        </D.BoardViewWrap>
      </N.Section>
      <div style={{height: '50px'}}></div>
    </N.MainWrapper>
  );
}

export default NoticeDetail;
