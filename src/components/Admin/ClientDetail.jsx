import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import * as M from '../Mypage/MypageStyle';
import Avvvatars from 'avvvatars-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ClientDetail = () => {
  const navigate = useNavigate();
  const { clientId } = useParams(); 
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/api/users/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            });
        
        if (response.data.code === 20000) {
          setUserInfo(response.data.data); 
        } else {
          throw new Error(response.data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError(`Failed to load user details: ${error.message}`);
      }
    };

    fetchUserDetails();
  }, [clientId]);

  if (!userInfo) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 메시지
  }

  const isDealer = !!userInfo.companyName; // 공급업체 여부를 companyName 존재 여부로 판단

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <M.AdminContainer>
        <M.AdminProfileWrapper>
          <M.TopBackground />
          <M.BottomBackground>
            <M.ProfileImage>
              <Avvvatars value={userInfo.username} style="Shapes" size="150" round={true} />
            </M.ProfileImage>
            <M.Name>{userInfo.username}</M.Name>
            <M.UserInfoWrapper>
              <M.UserDetail>
                <M.UserLabel>ID</M.UserLabel>
                <M.UserInfo>
                  <FaUser style={{ marginRight: '10px' }} />
                  {userInfo.userid}
                </M.UserInfo>
              </M.UserDetail>
              <M.UserDetail>
                <M.UserLabel>Phone</M.UserLabel>
                <M.UserInfo>
                  <FaPhone style={{ marginRight: '10px' }} />
                  {userInfo.phone}
                </M.UserInfo>
              </M.UserDetail>
              <M.UserDetail>
                <M.UserLabel>Email</M.UserLabel>
                <M.UserInfo>
                  <FaEnvelope style={{ marginRight: '10px' }} />
                  {userInfo.email}
                </M.UserInfo>
              </M.UserDetail>
            </M.UserInfoWrapper>
            <div style={{ textAlign: 'left' }}>
              <M.OrderButton onClick={() => navigate('/ordermanager')}>주문 확인</M.OrderButton>
            </div>
          </M.BottomBackground>
        </M.AdminProfileWrapper>

        <div style={{ height: '20px' }} />

        {/* 회사 정보는 공급업체(DEALER)일 때만 보여줌 */}
        {isDealer && (
          <M.AdminProfileWrapper>
            <M.BottomBackground>
              <M.UserInfoWrapper>
                <M.UserDetail>
                  <M.UserLabel>Manager Phone</M.UserLabel>
                  <M.UserInfo>
                    <FaPhone style={{ marginRight: '10px' }} />
                    {userInfo.managerPhone}
                  </M.UserInfo>
                </M.UserDetail>
                <M.UserDetail>
                  <M.UserLabel>Manager Name</M.UserLabel>
                  <M.UserInfo>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    {userInfo.managerName}
                  </M.UserInfo>
                </M.UserDetail>
                <M.UserDetail>
                  <M.UserLabel>Company Number</M.UserLabel>
                  <M.UserInfo>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    {userInfo.companyNumber}
                  </M.UserInfo>
                </M.UserDetail>
              </M.UserInfoWrapper>
              <M.UserInfoWrapper>
                <M.UserDetail>
                  <M.UserLabel>Company Type</M.UserLabel>
                  <M.UserInfo>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    {userInfo.companyType}
                  </M.UserInfo>
                </M.UserDetail>
                <M.UserDetail>
                  <M.UserLabel>Company Item</M.UserLabel>
                  <M.UserInfo>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    {userInfo.companyItem}
                  </M.UserInfo>
                </M.UserDetail>
                <M.UserDetail>
                  <M.UserLabel>Role</M.UserLabel>
                  <M.UserInfo>
                    <FaEnvelope style={{ marginRight: '10px' }} />
                    {userInfo.role}
                  </M.UserInfo>
                </M.UserDetail>
              </M.UserInfoWrapper>
            </M.BottomBackground>
          </M.AdminProfileWrapper>
        )}
      </M.AdminContainer>
    </div>
  );
};

export default ClientDetail;
