import styled from 'styled-components';


export const MainWrapper = styled.div`
  width: 78%; 
  margin-left: 280px;
  padding: 20px;
`;


export const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

export const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; 
  padding: 1%;
`;

export const SectionTitle = styled.h3`
  font-size: 2.3rem;
  font-weight: bold;
`;


export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  margin-top: 3%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  border: 1px solid #ddd;
  margin-top: 3%;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  margin-top: 3%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;


export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-column-gap: 20px;
  margin-bottom: 10px;
`;


export const NameRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-column-gap: 20px;
  margin-bottom: 10px;
`;


export const RightColumn = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;


export const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; 
  grid-gap: 20px;
`;