import React, { useEffect, useState } from 'react';
import * as D from './NoticeDetailStyle'; 
import * as N from '../Notice/NoticeStyle'; 
import edit from '/src/assets/icon/Admin/editpost.svg';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const NoticeDetail = () => {
  const { noticeId } = useParams();  // URL에서 공지사항 ID 추출
  const [notice, setNotice] = useState(null);  // 공지사항 데이터 상태 관리
  const [isPopup, setIsPopup] = useState(false); // 팝업 설정 여부 상태 관리
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/notices/${noticeId}`);
        if (response.status === 200) {
          setNotice(response.data.data);  // 서버에서 받은 데이터로 상태 업데이트
        }
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
      }
    };

    const fetchPopupSetting = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/notices/popup'); // 팝업 설정된 게시글 ID 가져오기
        if (response.status === 200 && response.data.data.id === parseInt(noticeId)) {
          setIsPopup(true); 
        } else {
          setIsPopup(false); 
        }
      } catch (error) {
        console.error('Failed to fetch popup settings:', error);
      }
    };

    fetchNoticeDetail();
    fetchPopupSetting();
  }, [noticeId]);

  const handlePopup = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://api.telegro.kr/api/notices/${noticeId}/popup`,
        { isPopup: !isPopup },  
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('팝업 설정이 성공적으로 변경되었습니다.');
      } else {
        throw new Error('팝업 설정 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while updating popup setting:', error);
      alert('팝업 설정 변경 중 오류가 발생했습니다.');
    }
  };

  const handleCheckboxChange = () => {
    setIsPopup(!isPopup); 
    handlePopup();  // 팝업 설정 상태 전송
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 이 공지를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://api.telegro.kr/api/notices/${noticeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  // 토큰 필요
          }
        });

        if (response.status === 200 && response.data.code === 20000) {
          alert('공지사항이 성공적으로 삭제되었습니다.');
          navigate('/admin/adminnotice');  // 목록 페이지로 이동
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('관리자 계정으로 로그인되지 않았습니다.');
        } else {
          setError('공지사항을 삭제하는 동안 오류가 발생했습니다.');
        }
      }
    }
  };

  if (!notice) {
    return <div>Loading...</div>;  // 공지사항 데이터가 아직 로드되지 않았을 경우 로딩 표시
  }

  return (
    <>
    <N.MainWrapper>
      <N.Section2 style={{ width: '90%', minHeight: '2.6vh', border: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <N.PageTitle>
            <N.TitleText>공지사항</N.TitleText>
          </N.PageTitle>
          <D.EditImg src={edit} onClick={() => navigate(`/admin/adminnoticeedit/${notice.id}`)} />
        </div>

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

            <D.Cont dangerouslySetInnerHTML={{ __html: notice.noticeContent }} />
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
      </N.Section2>
    </N.MainWrapper>
      <D.BtWrap>
        <D.BtLink as={Link} to="/admin/adminnotice">
          목록
        </D.BtLink>
        <D.DeleteBtLink as={Link} onClick={handleDelete}>
          삭제
        </D.DeleteBtLink>
      </D.BtWrap>
    </>
  );
}

export default NoticeDetail;
