//LoginStyle.jsx
import styled from 'styled-components';
export const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem; 
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left; 
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5% 0px;
  margin: 0;
  background-color: #ccc;
  width: 100%; 
  min-height: 100vh;
`;

export const LoginSection = styled.section`
  width: 36%;
  max-width: 558px;
  height: auto;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 4% 4%;
  border-radius: 10px;
  position: relative;
  border-radius: 1rem;
  z-index: 2;
  @media (max-width: 1000px) {
    width: 60%; 
    padding: 5% 4%;
  }
  @media (max-width: 780px) {
    width: 70%; 
    padding: 5% 6%;
  }

`;

export const Title = styled.h3`
  font-size: 2.6rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 2rem;
  }
`;

export const Text = styled.p`
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 9px;
  white-space: nowrap;
  color: #777;
  text-decoration : underline;
  @media(max-width: 800px){
    font-size: 1.1rem;
  }
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
    font-size: 1.5rem;
    font-weight: semi-bold;
    margin-bottom: 6px;
    margin-bottom: 2%;
    @media(max-width: 800px){
      font-size: 1.1rem;
    }
  }
  input {
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    font-size: 1.5rem;
    border-radius: 4px;
    &:focus {
      outline: 2.5px solid #94A3D8;
      border: none;
    }
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.5rem;
       @media(max-width: 800px){
        font-size: 0.95rem;
      }
    }
  }
`;


export const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 14px;
  background-color: #FFFFFF;
  color: #000000;
  border: 1px solid #E0E0E0;

  &:hover {
    background-color: #F0F0F0; 
    color: #333333; 
  }
`;

export const Button2 = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 14px;
  background-color: #94A3D8;
  color: #FFFFFF;
  border: none;

  &:hover {
    background-color: #7F89C0; 
    color: #E0E0E0; 
  }
`;


export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  white-space: nowrap;
`;

export const CheckboxLabel = styled.label`
  font-size: 1.5rem;
  cursor: pointer;
    @media(max-width: 800px){
      font-size: 1.1rem;
    }
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
 @media(max-width: 800px){
    width: 20px;
    height: 20px;
    border-radius: 5px;
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
      font-size: 1.1rem;
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
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
  input {
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 1.4rem;
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.5rem;
    }
  }
  @media(max-width: 780px){
    label{
      font-size: 1.1rem;
    }
    input {
      font-size: 1.0rem;
    }
  }
`;

export const AddressInput = styled.div`
  margin-bottom: 14px;
  white-space: nowrap;
  label {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
  input {
    font-size: 1.5rem;
    display: block;
    width: 100%;
    height: 48px;
    border: 1px solid #E0E0E0;
    padding: 12px 20px;
    border-radius: 4px;
    &::placeholder {
      color: #B4B4B4;
      font-size: 1.5rem;
    }
      
  }
    &:focus {
      outline: 2px solid #94A3D8;
      border: none;
    }
  }
  @media(max-width: 780px){
    label {
      font-size: 1.2rem;
      margin-bottom: 6px;
    }
    input {
      font-size: 1.2rem;
      display: block;
      width: 100%;
      height: 48px;
      border: 1px solid #E0E0E0;
      padding: 12px 20px;
      border-radius: 4px;
      &::placeholder {
        color: #B4B4B4;
        font-size: 1.2rem;
      }
        
    }
      &:focus {
        outline: 2px solid #94A3D8;
        border: none;
      }
    }
  }
`;