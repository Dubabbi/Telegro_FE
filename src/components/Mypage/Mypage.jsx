import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import * as M from './MypageStyle';
import Avvvatars from 'avvvatars-react';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: 'Justin Hope',
    phone: '010-1234-5678',
    email: 'example@email.com',
    name: '홍길동',
  });

  const [addressList, setAddressList] = useState([
    { name: '우리 집', address: '서울시 도봉구 창일로 14길 33(쌍문동)' },
    { name: '우리 학교', address: '서울시 도봉구 창일로 14길 33(쌍문동)' },
    { name: '배송지1', address: '서울시 도봉구 창일로 14길 33(쌍문동)' },
    { name: '배송지 2', address: '서울시 도봉구 창일로 14길 33(쌍문동)' },
  ]);

  return (
    <div style={{marginTop: '12%'}}>
    <M.Container>
      <M.ProfileWrapper>
        <M.TopBackground />
        <M.BottomBackground>
          <M.ProfileImage>
            <Avvvatars value={userInfo.username} style="Shapes" size="150" round={true} />
          </M.ProfileImage>
          <M.Name>{userInfo.name}</M.Name>
          <M.UserInfoWrapper>
            <M.UserDetail>
              <M.UserLabel>ID</M.UserLabel>
              <M.UserInfo>
                <FaUser style={{ marginRight: '10px' }} />
                {userInfo.id}
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
        </M.BottomBackground>
      </M.ProfileWrapper>

      <M.AddressListWrapper>
        <M.AddressTitle>배송지 목록</M.AddressTitle>
        {addressList.map((address, index) => (
          <M.AddressCard key={index}>
            <M.AddressName>{address.name}</M.AddressName>
            <M.AddressDetail>
              <FaMapMarkerAlt style={{ marginRight: '5px' }} />
              {address.address}
            </M.AddressDetail>
            <M.AddressActions>
              <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} />
              <FaTrash style={{ cursor: 'pointer' }} />
            </M.AddressActions>
          </M.AddressCard>
        ))}
        <M.ViewMoreButton>View More</M.ViewMoreButton>
      </M.AddressListWrapper>
    </M.Container>
    </div>
  );
};

export default Mypage;
