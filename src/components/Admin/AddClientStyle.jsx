import styled from 'styled-components';

export const Container = styled.div`
  width: 65%; 
  margin-left: 25%;
  margin-top: 4%;
  @media(max-width: 780px){
    width: 100%; 
    margin-left: 0px;
    margin-top: 10%;
  }
`;

export const SearchButton = styled.button`
  border: none;
  background-color: #f2f2f2;
  height: auto;
  border: 1px solid #E0E0E0;
  padding: 1.7% 2%;
  margin-top: 1.1%;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 1%;
`;

export const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; 
  padding: 1%;
  @media(max-width: 780px){
    padding: 3%;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 1.3rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  margin-left: 1%;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`;

export const FormWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 20px;
`;

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: semi-bold;
  margin-bottom: 1%;
  @media(max-width: 780px){
    font-size: 1.4rem;
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1.3px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 1%;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1.3px solid #ddd;
  margin-top: 1%;
  border-radius: 5px;
  font-size: 1rem;
`;

export const Button = styled.button`
  grid-column: span 2; /* 버튼을 2열 차지하도록 설정 */
  padding: 10px;
  background-color: #4D44B5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #3b3a9d;
  }
`;

export const InlineFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 그리드 레이아웃 */
  gap: 20px;
  grid-column: span 2; /* 2열을 차지하도록 설정 */
`;

export const ContactFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.97fr 0.97fr 2fr; /* 1:1:2 비율로 배치 */
  gap: 2%;
  max-width: 100%;
  grid-column: span 2; /* 전체 열을 차지 */
`;