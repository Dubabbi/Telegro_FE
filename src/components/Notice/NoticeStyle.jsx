// NoticeStyle.jsx
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const MainWrapper = styled.div`
  color: black;
  max-width: 1000px;
  margin: 0px auto;
  min-height: 100vh;
  padding-top: 3%;
`;

export const Section = styled.section`
  text-align: left;
  h1 {
    font-size: 2.5rem;
    color: #2F327D;
    text-align: center;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
  }
  @media (max-width: 768px) {
    margin-top: 4%;
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.7rem;
    }
  }
`;



export const BoardSearchArea = styled.div`
  justify-content: flex-end;
  margin: 15px 0;
  max-height: 3%;
`

export const SearchWindow = styled.div`
  justify-content: flex-end;
  padding: 15px 0;
  background-color: #eee;

`


export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  width: 100%;
  max-width: 350px;
  align-items: center;

  @media (max-width: 780px) {
    justify-content: center; 
    margin-left: 0;
    width: 90%;
  }
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  height: 30px;
  width: 30px;
  font-size: 1rem;
  background-color: #fefefe;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #F8F9FA;
    transition: 0.5s;
  }

  @media (max-width: 780px) {
    height: 25px;
    width: 25px;
    font-size: 0.8rem;
  }
`;

export const BoardTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  font-size: 1.2rem;

  th, td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f8f8f8;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }

  @media (max-width: 780px) {
    font-size: 1rem;
    th, td {
      padding: 10px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const NoticeTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2F327D;
`;

export const NoticeWrapper = styled.div`
    color: black;
    width: 80%;
    margin-left: 10%;
`
export const PageTitle = styled.div`
  margin-bottom: 30px;
  white-space: nowrap;
  h2{
    font-size: 2.3rem;
    font-weight: bold;
    @media(max-width: 780px){
      font-size: 1.9rem;
    }
  }
  p{
    font-size: 1.4rem;
    @media(max-width: 780px){
      font-size: 1.2rem;
    }
  }
  `

export const TitleText = styled.h3`
  margin-top: 15px;  
  margin-left: 10px;
  color: #333333;
  font-weight: bold; 
  font-size: 2.3rem;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`



export const SearchButton = styled.button`
  position: absolute;
  right: 10px; 
  height: 40px;
  width: 100px;
  padding: 0;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 30px;
  transition: all 0.3s;

  &.btn-dark {
    background: #555;
    color: #fff;

    &:hover,
    &:focus {
      background: #373737;
      border-color: #373737;
      color: #fff;
    }
  }
`

export const SearchInput = styled.input`
  height: 40px;
  font-size: 14px;
  padding: 7px 14px;
  border: 2px solid #111;
  flex: 1;
  border-radius: 15px;
  background: #fff;

  &:focus {
    border-color: #111;
    outline: 0;
    border-width: 1px;
    border-radius: 15px;
  }
  }`

  
export const BoardListArea = styled.div`

`


export const BoardLink = styled.a`
  color: inherit;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`



export const Search_Container=styled.div`
    margin: 50px;
    display: flex;
    justify-content: center;
`
export const StyledForm = styled(Form)`
  width: 300px;
  height: 37px; 
  font-size: 16px; 
  border-radius: 7px;
  border: 1.5px solid #777;
  display: flex;
  align-items: center;
  position: relative;

  .form-control {
    margin-left: 10px;
    height: 35px; 
    font-size: 1.5rem; 
    border-radius: 5px;
    padding-right: 80px; 
    padding-left: 10px;
  }

  @media (max-width: 780px) {
    width: 100%;
    .form-control {
      font-size: 1rem; 
      padding-right: 50px; 
      padding-left: 10px;
    }
  }
`;

export const CommentSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  margin-right: 10px;
`;

export const SubmitButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
`;

export const CommentList = styled.div`
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;
`;

export const CommentContent = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const CommentHeader = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const CommentText = styled.p`
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const ListButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const DeleteButton = styled(ListButton)`
  color: red;
  border-color: red;

  &:hover {
    background-color: #f8d7da;
  }
`;

export const DeleteBtLink = styled.a`
  color: red;
  display: inline-block;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 2px;
  font-size: 1.4rem;

  &:first-child {
    margin-left: 0;
  }

  &.on {
    background: #000;
    color: #fff;
  }
  &:hover {
    background: #f8d7da;
  }
`;

export const Div = styled.div`
  width: 100%;
  min-height: 160px;
  border: none;
  @media (max-width: 780px) {
    max-height: 2vh;
    min-height: 2vh;
  }
`;

export const Table = styled.table`
  width: 95%;
  margin: 0 auto;
  text-align: center;
  border-spacing: 0;
`;

export const TableHeaderColumn = styled.th`
  border-bottom: 1px solid #e8e8e8;
  font-size: 1.3rem;
  font-family: inter;
  padding: 1% 1%;
  font-weight: bold;
  border-right: 1px solid #ccc;
  width: ${props => props.width};  
  &:last-child {
    border-right: none;
  }
`;

export const TableColumn = styled.td`
  padding: 1.7% 1.7%;
  font-family: inter;
  font-size: 1.3rem;
  border-right: 1px solid #ccc;
  &:last-child {
    border-right: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:nth-child(odd) {
    background-color: #FCFCFD; 
    &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:nth-child(even) {
    background-color: #FFFFFF; 
        &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;