import styled from 'styled-components';

export const Container = styled.div`
  display: flex; 
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

export const ProfileWrapper = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TopBackground = styled.div`
  height: 150px;
  background-color: #d8d8d8;
`;

export const BottomBackground = styled.div`
  padding: 20px;
  text-align: center;
`;

export const ProfileImage = styled.div`
  margin-top: -75px;
`;

export const Name = styled.h2`
  margin: 10px 0;
  font-size: 24px;
  color: #333;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

export const UserDetail = styled.div`
  text-align: center;
`;

export const UserLabel = styled.h4`
  font-size: 16px;
  color: #777;
`;

export const UserInfo = styled.p`
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

// 우측 배송지 목록 스타일
export const AddressListWrapper = styled.div`
  width: 35%;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const AddressTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

export const AddressCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddressName = styled.h4`
  font-size: 16px;
  color: #333;
`;

export const AddressDetail = styled.p`
  font-size: 14px;
  color: #777;
  display: flex;
  align-items: center;
`;

export const AddressActions = styled.div`
  display: flex;
  align-items: center;
`;

export const ViewMoreButton = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background-color: #6200ea;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3700b3;
  }
`;
