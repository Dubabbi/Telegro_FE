import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 90%;
    margin-left: 5%;
  }
`;

export const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 1rem;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 780px) {
    th, td {
      padding: 8px;
    }
  }
`;

export const TableHead = styled.thead`
  font-weight: bold;
`;

export const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #FCFCFD;
    &:hover {
      background-color: #eceaea;
      cursor: pointer;
    }
  }
  &:hover {
    background-color: #eceaea;
    cursor: pointer;
  }
`;

export const TotalAmount = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

export const CancelButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #ff4d4d;
  }
`;