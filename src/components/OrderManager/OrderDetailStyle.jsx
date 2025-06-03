import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 10px;
  margin-top: 4px;
  font-weight: bold;
  color: #555;
`;

export const OrderInfo = styled.div`
  margin-bottom: 10px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  background: #ccc;
  border-radius: 5px;
`;

export const ItemDetails = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const ItemOption = styled.div`
  color: #555;
  margin: 5px 0;
`;

export const ItemPrice = styled.div`
  color: #333;
`;

export const ItemStatus = styled.div`
  text-align: right;
  margin-top: 5px;
  padding: 5px 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

export const Details = styled.div`
  margin-top: 10px;
`;

export const DetailItem = styled.div`
  margin-bottom: 5px;
`;

export const MainWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
  padding: 20px;
  user-select: text;
  @media (max-width: 780px) {
    width: 90%;
    margin-left: 5%;
  }
`;
export const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-top: 160px;
  padding-bottom: 10px;
  @media(max-width: 780px){
    font-size: 1.9rem;
    padding-top: 5px;
    margin-top: 10%;
  }
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

export const ReceiptButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #28a745; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: #218838; 
  }
`;

export const CashReceiptButton = styled.button`
  margin-top: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.5rem;
`;

export const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: red;
  font-size: 1.2rem;
`;
