import styled from 'styled-components';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export const Container = styled.div`
  padding: 20px;
  margin-top: 10%;
  display: flex;
  justify-content: center;
`;

export const ProfileCard = styled.div`
  width: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  margin-top: 20px;
`;

export const UserId = styled.div`
  font-size: 20px;
  color: #333;
`;

export const UserDetail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
  color: #666;
`;

export const IconPhone = styled(FaPhone)`
  margin-right: 10px;
`;

export const IconEmail = styled(FaEnvelope)`
  margin-right: 10px;
`;
