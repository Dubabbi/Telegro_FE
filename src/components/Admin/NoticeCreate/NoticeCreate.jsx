import React, {useEffect, useRef, useState} from 'react';
import * as N from '../Notice/NoticeStyle';
import * as C from '../Product/ProductCreateStyle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';


export const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; /* 회색 배경 */
  padding: 1%;
  @media(max-width: 780px){
    padding: 2%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2.3rem;
  font-weight: bold;
  h1{
    margin-left: 10%;
    margin-top: 8%;
  }
  h2{
    font-size: 2rem;
  }
  @media(max-width: 780px){
    font-size: 1.9rem;
    h2{
      font-size: 1.5rem;
    }
    h1{
      margin-left: 2%;
      margin-top: 5%;
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


const NoticeCreate = () => {
  const editorRef = useRef();
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();

      console.log(editorInstance.getHTML()); 
    }
  }, []);
  const handleEditorChange = () => {
    const editorRef = useRef();
    if (editorRef.current) {
      const htmlContent = editorRef.current.getInstance().getHTML();
      
    } else {
      console.error('Editor not initialized');
    }
  };
  return (
    <>
    <N.MainWrapper>
    <C.SectionTitle style={{margin: '1%', marginBottom: '4%', marginTop: '3%'}}>공지사항</C.SectionTitle>
      <FormWrapper>
      <SectionTitleWrapper>
        <SectionTitle><h2>게시글 작성</h2></SectionTitle>
        </SectionTitleWrapper>
        <div style={{  padding: '2%'}}>
        <Label htmlFor="title">제목 *</Label>
        <Input type="text" id="title" placeholder="제목을 입력해 주세요." />

        <Label htmlFor="author">작성자 *</Label>
        <Input type="email" id="author" placeholder="user@email.com" />
        <Label htmlFor="attachment">첨부</Label>
        <FileInput type="file" id="attachment" />

        <Label htmlFor="content">내용 *</Label>
        <div>
              <Editor
                ref={editorRef}
                initialValue=" "
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                /*
                hooks={{
                  addImageBlobHook: addImageBlobHook
                }} 
                  */
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'link', 'image']
                ]}
                plugins={[color]}
                onChange={handleEditorChange}
            />

            </div>

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
