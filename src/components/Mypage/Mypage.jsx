import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import * as M from './MypageStyle';
import Avvvatars from 'avvvatars-react';
import { useNavigate } from 'react-router-dom';
import add from '/src/assets/icon/mypage/addaddress.svg';
import AddressModal from './AddressModal'; 
import EditAddressModal from './EditAddressModal';
const Mypage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: 'Justin Hope',
    phone: '010-1234-5678',
    email: 'example@email.com',
    name: '홍길동',
  });

  const [addressList, setAddressList] = useState([
    { name: '우리 집', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: true },
    { name: '우리 학교', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지1', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지 2', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지 3', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지 4', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지 5', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
    { name: '배송지 6', address: '서울시 도봉구 창일로 14길 33(쌍문동)', detail: '상세 주소', code: '우편번호', isDefault: false },
  ]);

  const [currentVisible, setCurrentVisible] = useState(4); // 초기에는 4개만 보임
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 편집 모달 열림 상태 관리


  const handleViewMore = () => {
    setCurrentVisible((prevVisible) => prevVisible + 4); // 버튼 클릭 시 4개 더 보임
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen); 
  };
  return (
    <div style={{ backgroundColor: '#eee' }}>
      <M.Container style={{ paddingTop: '160px', paddingBottom: '4%' }}>
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
            <div style={{textAlign: 'left'}}>
            <M.OrderButton onClick={() => navigate('/ordermanager')}>주문 확인</M.OrderButton>
            </div>
          </M.BottomBackground>
        </M.ProfileWrapper>

        <M.AddressListWrapper>
          <M.AddressWrapper>
            <M.AddressTitle>배송지 목록</M.AddressTitle>
            <img src={add} alt="Add Address" onClick={toggleModal} />
          </M.AddressWrapper>
          {addressList.slice(0, currentVisible).map((address, index) => (
          <M.AddressCard key={index}>
            <M.AddressBar isDefault={address.isDefault} /> {/* 기본 배송지 여부를 props로 전달 */}
            <M.AddressContent>
              <M.AddressName>{address.name}</M.AddressName>
              <M.AddressDetail>
                <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                {address.address} ({address.code})
              </M.AddressDetail>
              <M.AddressDetail>
                <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                {address.detail}
              </M.AddressDetail>
            </M.AddressContent>
            <M.AddressActions>
              <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={toggleEditModal} />
              <FaTrash style={{ cursor: 'pointer' }} />
            </M.AddressActions>
          </M.AddressCard>
        ))}
          {currentVisible < addressList.length && (
            <M.ViewMoreButton onClick={handleViewMore}>View More</M.ViewMoreButton>
          )}
        </M.AddressListWrapper>
      </M.Container>
      <AddressModal isOpen={isModalOpen} toggleModal={toggleModal} />
      <EditAddressModal isOpen={isEditModalOpen} toggleEditModal={toggleEditModal} /> 
    </div>
  );
};

export default Mypage;
