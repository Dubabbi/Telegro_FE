import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaBuilding, FaBriefcase ,FaUserTie, FaBox  } from 'react-icons/fa';
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
            <M.ClientInfoWrapper>
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
            </M.ClientInfoWrapper>
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
              <M.ClientInfoWrapper>
              <M.UserDetail>
              <M.UserLabel>Manager Phone</M.UserLabel>
              <M.UserInfo>
                <FaPhone style={{ marginRight: '10px' }} /> {/* 전화 관련 정보이므로 FaPhone 아이콘 적합 */}
                {userInfo.managerPhone}
              </M.UserInfo>
            </M.UserDetail>
            <M.UserDetail>
              <M.UserLabel>Manager Name</M.UserLabel>
              <M.UserInfo>
                <FaUser style={{ marginRight: '10px' }} /> {/* 사용자/관리자 이름이므로 FaUser 아이콘 적합 */}
                {userInfo.managerName}
              </M.UserInfo>
            </M.UserDetail>
            <M.UserDetail>
              <M.UserLabel>Company Number</M.UserLabel>
              <M.UserInfo>
                <FaBuilding style={{ marginRight: '10px' }} /> {/* 회사 번호 관련 정보이므로 FaBuilding 아이콘 적합 */}
                {userInfo.companyNumber}
              </M.UserInfo>
            </M.UserDetail>
            </M.ClientInfoWrapper>
            <M.ClientInfoWrapper>
            <M.UserDetail>
              <M.UserLabel>Company Type</M.UserLabel>
              <M.UserInfo>
                <FaBriefcase style={{ marginRight: '10px' }} /> {/* 회사 유형이므로 FaBriefcase 아이콘 적합 */}
                {userInfo.companyType}
              </M.UserInfo>
            </M.UserDetail>
            <M.UserDetail>
              <M.UserLabel>Company Item</M.UserLabel>
              <M.UserInfo>
                <FaBox style={{ marginRight: '10px' }} /> {/* 회사가 제공하는 품목이므로 FaBox 아이콘 적합 */}
                {userInfo.companyItem}
              </M.UserInfo>
            </M.UserDetail>
            <M.UserDetail>
              <M.UserLabel>Role</M.UserLabel>
              <M.UserInfo>
                <FaUserTie style={{ marginRight: '10px' }} /> {/* 사용자의 역할이므로 FaUserTie 아이콘 적합 */}
                {userInfo.role}
              </M.UserInfo>
            </M.UserDetail>
            </M.ClientInfoWrapper>
            </M.BottomBackground>
            </M.AdminProfileWrapper>
        )}
      </M.AdminContainer>
    </div>
  );
};

export default ClientDetail;
