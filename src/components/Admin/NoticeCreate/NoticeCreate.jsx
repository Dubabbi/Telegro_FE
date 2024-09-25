import React from 'react';
import * as N from '../Notice/NoticeStyle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle';

// 공지사항 작성 스타일
const FormWrapper = styled.div`
  width: 70%;
  margin-left: 4%;
  margin-top: 3%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  @media(max-width: 780px){
    width: 100%;
    margin-left: 0px;
    
  }
`;

const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; /* 회색 배경 */
  padding: 1%;
  @media(max-width: 780px){
    padding: 2%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: bold;
  h2{
    font-size: 2.3rem;
  }
  @media(max-width: 780px){
    font-size: 1.9rem;
    h2{
      font-size: 1.5rem;
    }
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  box-sizing: border-box;
  resize: none;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4D44B5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #3b3a9d;
  }
`;

const NoticeCreate = () => {
  return (
    <>
    <N.MainWrapper>
      <SectionTitle style={{ marginLeft: '4.5%', marginTop: '4%', }}>공지사항</SectionTitle>
      <FormWrapper>
      <SectionTitleWrapper>
        <SectionTitle><h2>게시글 작성</h2></SectionTitle>
        </SectionTitleWrapper>
        <div style={{  padding: '2%'}}>
        <Label htmlFor="title">제목 *</Label>
        <Input type="text" id="title" placeholder="제목을 입력해 주세요." />

        <Label htmlFor="author">작성자 *</Label>
        <Input type="email" id="author" placeholder="user@email.com" />

        <Label htmlFor="content">내용 *</Label>
        <Textarea id="content" placeholder="내용을 입력해 주세요." />

        <Label htmlFor="attachment">첨부</Label>
        <FileInput type="file" id="attachment" />
        </div>
      </FormWrapper>
    </N.MainWrapper>
    <D.BtWrap style={{ width: '70%', marginLeft: '21%', marginBottom: '2%'}}>
      <D.BtLink as={Link} to="/admin/adminnotice">
              취소
            </D.BtLink>
            <D.BtLink as={Link} to="">
              등록
            </D.BtLink>
          </D.BtWrap>
          
    </>
  );
};

export default NoticeCreate;
