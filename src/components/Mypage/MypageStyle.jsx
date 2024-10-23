import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  padding-top: 160px;
  padding-bottom: 4%;
  flex-grow: 1;
  flex-direction: row;
  @media(max-width: 780px){
    flex-direction: column;
    padding-top: 60px;
  }
`;

export const AdminContainer = styled.div`
  display: flex;
  width: 95%;
  min-height: 100vh;
  margin: 0 auto;
  padding-left: 260px;
  padding-top: 4%;
  padding-bottom: 4%;
  flex-grow: 1;
  flex-direction: column;
  text-align: left;
  @media(max-width: 780px){
    flex-direction: column;
    padding-top: 60px;
    padding-left: 0px;
  }
`;

export const AdminProfileWrapper = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 90vh;
  margin: 0 auto;
`;

export const ProfileWrapper = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 90vh;
  @media(max-width: 780px){
    width: 90%;
    margin: 0 auto;
  }
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
  margin-top: -105px;
`;

export const Name = styled.h2`
  margin: 30px 0;
  padding-left: 20px;
  font-size: 2.3rem;
  color: #333;
  text-align: left;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 2rem;
    margin: 20px 0;
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 20px 0;
  flex-direction: row;
  @media(max-width: 780px){
    flex-direction: column;
  }
`;
export const ClientInfoWrapper = styled.div`
  display: grid;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: 1.5fr 1.5fr 1fr;
  gap: 20px; /* 열 간격 */
  padding: 0 20px;
  margin: 20px 0;
  align-items: start; /* 열 안의 내용이 상단에 정렬되도록 설정 */
  @media(max-width: 780px){
    grid-template-columns: 1fr; /* 화면이 좁아질 때 단일 열로 변경 */
  }
`;



export const UserDetail = styled.div`
  text-align: left;
`;

export const UserLabel = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  color: #777;
  @media(max-width: 780px){
    margin-bottom: 0px;
    display: flex;
    font-size: 14px;
  }
`;

export const UserInfo = styled.p`
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media(max-width: 780px){
    justify-content: flex-start;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 15px;
  }
`;

export const AddressListWrapper = styled.div`
  width: 35%;
  padding: 10px;
  img{
    cursor: pointer;
  }
  @media(max-width: 780px){
    width: 100%;
    margin: 0 auto;
  }
`;

export const AddressTitle = styled.h3`
  font-size: 18px;
  color: #333;
`;

export const AddressCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 13px;
  padding: 15px;
  position: relative;
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 4%;
  justify-content: space-between;
  position: relative;
  align-items: center;
`;

export const AddressBar = styled.div`
  background-color: ${({ isDefault }) => (isDefault ? '#4D44B5' : '#697077')}; /* 기본 배송지 여부에 따라 색상 변경 */
  width: 10px;
  height: 100%;
  border-radius: 8px 0 0 8px;
  position: absolute;
  left: 0;
  top: 0;
`;

export const AddressContent = styled.div`
  padding-left: 20px;
  flex-grow: 1;
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
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(77, 68, 181, 0.6);  /* 호버 시 배경을 진한 보라색으로 */
    color: #fff;    
  }
`;


export const OrderButton = styled.button`
  margin-top: 30px;
  margin-left: 7px;
  width: 30%;
  padding: 10px;
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(77, 68, 181, 0.6);  /* 호버 시 배경을 진한 보라색으로 */
    color: #fff;    
  }
  @media(max-width: 780px){
    margin-top: 3px;
  }
`;
