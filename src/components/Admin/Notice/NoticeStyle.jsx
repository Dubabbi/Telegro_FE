// NoticeStyle.jsx
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const NoticeWrapper = styled.div`
    color: black;
    width: 80%;
    margin-left: 0px;
`
export const MainWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  padding-left: 270px;
  amrgin: 0 auto;
  @media(max-width: 780px){
    margin: 0 auto;
    max-width: 100%;
    padding-top: 40px;
    padding-left: 0;
    width: 100%;
  }
`;



export const MainWrapper2 = styled.div`
    color: black;
    max-width: 100%;
    margin: 0px auto;
    margin-left: 7%;
    margin-top: 6%;
    @media(max-width: 780px){
      max-width: 100%;
      min-width: 100%;
      margin: 3% 5%;
    }
`;

export const Section = styled.section`
  padding: 20px 0;
  min-width: 90%;
  margin-left: 15%;
  border: none;
  @media(max-width: 780px){
    max-width: 99%;
    margin-left: 0px;
    padding: 50px 10px;
  }
`
export const Section2 = styled.section`
  padding: 20px 0;
  min-width: 95%;
  width: 95%;
  min-height: 2.6vh;
  border: none;
  @media(max-width: 780px){
    max-width: 99%;
    margin-left: 0px;
    padding: 50px 10px;
  }
`



export const PageTitle = styled.div`
  margin-bottom: 30px;
  font-size: 100px;
    h2 { 
    font-size: 2.3rem;
    margin-left: 1%;
    white-space: nowrap;
    font-weight: bold;
    @media(max-width: 780px){
      font-size: 1.9rem;
      margin-top: 3%;
    }
  }
  
`

export const TitleText = styled.h3`
  margin-top: 15px;  
  margin-left: 10px;
  font-size: 2.3rem;
  color: #333333;
  font-weight: bold; 
  @media(max-width: 780px){
    font-size: 1.9rem;
    margin-top: 25px;  
  }
`

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
    justify-content: center; /* 작은 화면에서 가운데 정렬 */
    margin-left: 0;
    width: 90%; /* 더 작은 화면에서 검색창을 적절히 줄임 */
  }
`;

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
}

 `

  
export const BoardListArea = styled.div`

`

export const BoardTable = styled.table`
  font-size: 13px;
  max-width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border: 2px solid #111;
`

export const TableHead = styled.thead`
  text-align: center;
  font-weight: bold;
`

export const TableBody = styled.tbody`
  text-align: center;
`

export const TableRow = styled.tr`
  height: 60px;
  font-size: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  text-align: center;
`

export const ThNum = styled.th`
  width: 150px;
  text-align: center;
`

export const ThTitle = styled.th`
  flex: 1;
`

export const ThDate = styled.th`
  width: 150px;
  text-align: center;
`

export const ThViews = styled.th`
  width: 150px;
  text-align: center;
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


export const Add = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  cursor: pointer;
  position: fixed;
  right: 35px;
  bottom: 20px;

`;        



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
    width: 100%; /* 검색창의 너비를 100%로 */
    .form-control {
      font-size: 1.1rem; /* 폰트 크기를 줄여 화면에 맞춤 */
      padding-right: 50px; /* 여백 조정 */
      padding-left: 10px;
    }
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