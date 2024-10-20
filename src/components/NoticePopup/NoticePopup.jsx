import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Img from '/src/assets/image/Landing/logo.svg'; // 로고 이미지

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45); /* 45% 불투명도 */
  z-index: 999;
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  max-height: 600px;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px ) {
    max-width: 400px;
    max-height: 500px;
  }
  @media (max-width: 700px) {
    max-width: 350px;
    max-height: 450px;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 400px;
  }
`;

const Header = styled.div`
  background-color: #F6F8FA;
  color: #092139;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative; /* Close 버튼을 별도로 배치하기 위해 필요 */
`;

const Logo = styled.img`
  width: 37px;
  height: auto;
  align-items: center;
  margin-right: 10px;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  @media(max-width: 800px){
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  color: #30313D;
  text-align: left;
  line-height: 1.8;
  h2{
    font-size: 1.6rem;
    font-weight: bold;
    margin-left: 1%;
    @media(max-width: 800px){
      font-size: 1.3rem;
      margin-left: 2%;
    }
  }
  p{
    font-size: 1.2rem;
    margin-left: 1%;
    @media(max-width: 800px){
      font-size: 1.2rem;
      margin-left: 2%;
    }
  }
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 2px solid #D5DBE1;
  margin: 20px 0;
  line-height: 1.7;
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  font-size: 2.5rem;
  position: absolute;
  right: 6%;
  &:hover{
    color: #5351af;
  }
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  gap: 2%;
  justify-content: center;
  border-top: 1px solid #D5DBE1;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #F6F8FA;
  color: #30313D;
  width: 90%;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #E9EEF3;
    color: #5351af;
  }
  @media(max-width: 780px){
    font-size: 1.3rem;
  }
`;

const NoticePopup = () => {
  const [visible, setVisible] = useState(true);
  const [notice, setNotice] = useState(null);  // 공지사항 데이터 상태 관리
  const [error, setError] = useState('');

  // 팝업 설정된 공지사항 ID 가져오기 및 공지사항 세부 정보 가져오기
  const fetchPopupNotice = async () => {
    try {
      // 팝업 설정된 공지사항 ID 가져오기
      const popupResponse = await axios.get('https://api.telegro.kr/notices/popup');
      if (popupResponse.status === 200) {
        const noticeId = popupResponse.data.data.id; // 팝업 설정된 공지사항 ID

        // 해당 공지사항의 세부 정보 가져오기
        const noticeResponse = await axios.get(`https://api.telegro.kr/notices/${noticeId}`);
        if (noticeResponse.status === 200) {
          setNotice(noticeResponse.data.data);  // 서버에서 받은 데이터로 상태 업데이트
        }
      }
    } catch (error) {
      console.error('Failed to fetch popup notice details:', error);
      setError('공지사항 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchPopupNotice();

    // 팝업 표시 여부를 로컬 스토리지에서 확인
    const hidePopupDate = localStorage.getItem('hidePopupDate');
    const todayDate = new Date().toISOString().split('T')[0];
    if (hidePopupDate === todayDate) {
      setVisible(false);
    }
  }, []);

  const handleClose = (forToday) => {
    if (forToday) {
      const todayDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('hidePopupDate', todayDate);
    }
    setVisible(false);
  };

  if (!visible || !notice) {
    return null;
  }

  return (
    <>
      <Overlay onClick={() => handleClose(false)} />
      <PopupWrapper>
        <Header>
          <HeaderTitle>
            <Logo src={Img} alt="Telegro Logo" />
            Telegro
          </HeaderTitle>
          <CloseButton onClick={() => handleClose(false)} />
        </Header>
        <Content>
          <HorizontalRule />
          <h2>{notice.noticeTitle}</h2>
          <HorizontalRule />
          <p dangerouslySetInnerHTML={{ __html: notice.noticeContent }} /> {/* 공지사항 내용 */}
        </Content>
        <Footer>
          <ConfirmButton onClick={() => handleClose(true)}>오늘 하루 보지 않기</ConfirmButton>
          <ConfirmButton onClick={() => handleClose(false)}>닫기</ConfirmButton>
        </Footer>
      </PopupWrapper>
    </>
  );
};

export default NoticePopup;
