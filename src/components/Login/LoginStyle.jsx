//LoginStyle.jsx
import styled from 'styled-components';
export const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;  // 적절한 크기로 설정
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;  // 오류 메시지가 왼쪽 정렬이 되도록 설정
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6% 0;
  margin: 0;
  background-color: #ccc;
  width: 100%; /* 화면 너비에 맞춰 배경이 줄어들도록 설정 */
  min-height: 100vh; /* 화면 높이에 맞춰 Wrapper가 줄어들도록 설정 */
`;

export const LoginSection = styled.section`
  width: 38%;
  max-width: 558px;
  height: auto;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 5% 6%;
  border-radius: 10px;
  position: relative;
  border-radius: 1rem;
  z-index: 2;
    @media (max-width: 768px) {
    width: 80%; /* 화면 크기가 768px 이하일 때 너비를 80%로 조정 */
    padding: 40px 30px; /* 작은 화면에서는 패딩을 줄여 공간 확보 */
  }

  @media (max-width: 480px) {
    width: 90%; /* 모바일 화면에서는 너비를 90%로 조정 */
    padding: 30px 20px; /* 패딩을 더 줄여 모바일에서 더 깔끔하게 표시 */
  }
`;

export const Title = styled.h3`
  font-size: 2.2vw;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Text = styled.p`
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 9px;
  white-space: nowrap;
  color: #777;
  text-decoration : underline;
`;

export const Account = styled.div`
  margin-bottom: 17px;
  border-radius: 0.7rem;
  color: white;
  padding: 3% 4%;
  display: inline-block;
  white-space: nowrap;
`;

export const Span = styled.span`
  background-color: ${props => props.color};
  font-size: 13px;
  white-space: nowrap;
  padding: 2px 5px;
  border-radius: 4px;
  margin-right: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const InputBox = styled.div`
  margin-bottom: 14px;
  white-space: nowrap;
  label {
    display: block;
    font-size: 1.1vw;
    margin-bottom: 6px;
  }
  input {
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    font-size: 1.1vw;
    border-radius: 4px;
    &:focus {
      outline: 2.5px solid #94A3D8;
      border: none;
    }
    &::placeholder {
      color: #B4B4B4;
     font-size: 1.1vw;
    }
  }
`;


export const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 14px;
  background-color: ${props => props.primary ? '#94A3D8' : '#FFFFFF'};
  color: ${props => props.primary ? '#FFFFFF' : '#000000'};
  border: ${props => props.primary ? 'none' : '1px solid #E0E0E0'};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  white-space: nowrap;
`;

export const CheckboxLabel = styled.label`
  font-size: 1.1vw;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #94A3D8;
  }
`;

export const Link = styled.a`
  margin-top: -35px;
  color: #94A3D8;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;


export const SearchInput = styled.input`
  padding: 10px;
  width: 68%;
  border: 1px solid #ccc;
  margin-bottom: 14px;
  border-radius: 4px;
  height: 48px;
  border: 1px solid #E0E0E0;
  padding: 12px 20px;
  border-radius: 4px;
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.1vw;
    }
`;
export const SearchButton = styled.div`
  border: none;
  background-color: #94A3D8;
  height: 48px;
  border: 1px solid #E0E0E0;
  padding: 12px 20px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;


export const AddressBox = styled.div`
  margin-bottom: 14px;
  white-space: nowrap;
  label {
    display: block;
    font-size: 1.1vw;
    margin-bottom: 6px;
  }
  input {
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 1.1vw;
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.1vw;
    }
  }
`;

export const AddressInput = styled.div`
  margin-bottom: 14px;
  white-space: nowrap;
  label {
    display: block;
    font-size: 1.1vw;
    margin-bottom: 6px;
  }
  input {
    font-size: 1.1vw;
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    border-radius: 4px;
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.1vw;
    }
  }
    &:focus {
      outline: 2px solid #94A3D8;
      border: none;
    }
  }
`;