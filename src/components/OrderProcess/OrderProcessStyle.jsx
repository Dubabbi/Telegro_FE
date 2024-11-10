import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  min-height: 160px;
  border: none;
  @media (max-width: 780px) {
    max-height: 4vh;
    min-height: 6vh;
  }
`;

export const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 77%;
  margin: 2% auto;

  @media (max-width: 780px) {
    flex-direction: column;
    width: 90%;
  }
`;

export const LeftSection = styled.div`
  width: 50%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const DeliveryInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const RightSection = styled.div`
  width: 45%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h4 {
    font-size: 1.2rem;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 5px 0;
  }
`;

export const FormInput = styled.input`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const AddressInput = styled.input`
  width: 68%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const AddressSearchRow = styled(FormRow)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  flex-direction: row;
`;

export const AddressButton = styled.button`
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  width: 30%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 100px;
`;
export const PriceDetailsWrapper = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  gpa: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  input{
    width: 72%;
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button{
    padding: 9px 20px;
    background-color: #000;
    color: #fff;
    width: 100px;
    border-radius: 5px;
    text-align: center;
  }
  p{
    white-space: nowrap;
    margin: 1%;
    text-align: center;
  }
`;


export const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
`;

export const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;



export const PaymentTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Checkbox = styled.input`
  margin-right: 6px;
  margin-top: 6px;
  width: 23px;
  border: 1px solid #ddd;
  height: 23px;
  border-radius: 8px;
  &:checked {
    background-color: #bbb;
  }
  @media (max-width: 800px) {
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }
`;

export const Select = styled.select`
  width: 50%;
  border: 1px solid #ddd;
  max-height: 30px;
  min-height: 30px;
  border-radius: 5px;
  font-size: 1rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 1rem;
`;

export const BoxSection = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const CompleteOrderWrapper = styled.div`
  width: 77%;
  margin: 2% auto;
  text-align: center;
  padding-top: 150px;

  @media (max-width: 780px) {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const OrderInfo = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;

  span {
    color: #4D44B5;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  font-size: 1rem;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    vertical-align: middle; 
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    text-align: left;
  }

  img {
    width: 50px;
    height: 50px;
    vertical-align: middle; 
  }
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  div {
    width: 48%;
    text-align: left;

    h4 {
      margin-top: 15px;
      font-size: 1.2rem;
      font-weight: bold;
      color: #4D44B5;
    }

    p {
      margin-bottom: 10px;
      margin-top: 10px;
    }

    span {
      font-weight: bold;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;

    div {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

export const Button = styled.button`
  padding: 10px 30px;
  background-color: rgba(77, 68, 181, 0.3);
  color: #4D44B5;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: rgba(77, 68, 181, 0.6);  
    color: #fff;    
  }
`;
