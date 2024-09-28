import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as M from './MypageStyle';
import axios from 'axios';
import Avatar from 'react-avatar'; // Import the Avatar component

const Mypage = () => {
  // Example user data - you might fetch this from an API instead
  const [userInfo, setUserInfo] = useState({
    id: 'Justin Hope',
    phone: '010-1234-5678',
    email: 'example@email.com',
    name: 'Justin Hope' // Assuming you might use the name for the avatar
  });

  return (
    <M.Container>
      <M.ProfileCard>
        <Avatar name={userInfo.name} size="100" round={true} /> {/* Use the Avatar component with props */}
        <M.UserInfo>
          <M.UserId>ID {userInfo.id}</M.UserId>
          <M.UserDetail>
            <M.IconPhone />
            {userInfo.phone}
          </M.UserDetail>
          <M.UserDetail>
            <M.IconEmail />
            {userInfo.email}
          </M.UserDetail>
        </M.UserInfo>
      </M.ProfileCard>
    </M.Container>
  );
};

export default Mypage;
