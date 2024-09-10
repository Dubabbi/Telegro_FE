// NoticeStyle.jsx
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const NoticeWrapper = styled.div`
    color: black;
    width: 80%;
    margin-left: 10%;
`
export const MainWrapper = styled.div`
    color: black;
    max-width: 1200px;
    margin: 0px auto;
`;

export const Section = styled.section`
  padding: 50px 0;
`

export const PageTitle = styled.div`
  margin-bottom: 30px;
  font-size: 100px;
`

export const TitleText = styled.h3`
  margin-top: 15px;  
  margin-left: 10px;
  font-size: 25px;
  color: #333333;
  font-weight: bold; 
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
  margin-left: 600px;
  width: 100%;
  max-width: 350px;
  align-items: center;
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

export const BoardTable = styled.table`
  font-size: 13px;
  width: 100%;
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
`;
//

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