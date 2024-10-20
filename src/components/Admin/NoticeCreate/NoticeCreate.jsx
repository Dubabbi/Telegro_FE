import React, { useRef, useState } from 'react';
import axios from 'axios';
import * as N from '../Notice/NoticeStyle';
import * as C from '../Product/ProductCreateStyle';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
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
  background-color: #f2f2f2;
  padding: 1%;
  @media(max-width: 780px){
    padding: 2%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2.3rem;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 1.9rem;
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
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [noticeFiles, setNoticeFiles] = useState([]);
  const [error, setError] = useState('');

  const handleAddFile = async (event) => {
    const selectedFiles = Array.from(event.target.files);
  
    try {
      const uploadedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);

          // presigned URL 가져오기
          const presignedUrlResponse = await axios.post(
            'https://api.telegro.kr/api/file?prefix=notice',
            {
              metadata: {
                description: '파일 설명',
                tags: ['notice', 'attachment'],
              },
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          const presignedUrl = presignedUrlResponse.data.data.url;

          // presigned URL로 파일 업로드
          await axios.put(presignedUrl, file, {
            headers: {
              'Content-Type': file.type,
            },
          });
  
          const fileUrl = presignedUrl.split('?')[0]; // 쿼리 파라미터 제거

          // 파일의 이름과 URL 저장
          return {
            fileName: file.name,
            fileUrl: fileUrl
          };
        })
      );

      // noticeFiles 상태 업데이트
      setNoticeFiles((prev) => [...prev, ...uploadedFiles]);

      console.log('파일 업로드에 성공했습니다.');
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다:', error);
      alert(`파일 업로드 중 오류가 발생했습니다: ${error.message}`);
    }
  };
  
  const addImageBlobHook = async (blob, callback) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      // 백엔드에서 프리사인 URL 가져오기
      const response = await axios.post(`https://api.telegro.kr/api/file?prefix=notice`, {
        metadata: {
          description: "새로운 이미지 설명",
          tags: ["태그1", "태그2"]
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
  
      const presignedUrl = response.data.data.url;
  
      // 이미지 업로드
      await axios.put(presignedUrl, blob, {
        headers: {
          'Content-Type': blob.type,
        }
      });
  
      // 업로드 완료 후 콜백 호출
      callback(presignedUrl.split('?')[0], 'Image');
    } catch (error) {
      console.error('Image upload failed:', error.response ? error.response.data : error.message);
      alert('이미지 업로드 실패: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current.getInstance().getHTML();

    const noticeData = {
      title,
      context: content,
      noticeFiles, // 업로드된 파일들의 정보 포함
    };

    try {
      const response = await axios.post('https://api.telegro.kr/api/notices', noticeData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        navigate('/admin/adminnotice');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('관리자 계정으로 로그인하십시오.');
      } else {
        setError('공지사항을 게시하는 동안 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <N.MainWrapper>
        <C.SectionTitle>공지사항</C.SectionTitle>
        <FormWrapper>
          <SectionTitleWrapper>
            <SectionTitle>게시글 작성</SectionTitle>
          </SectionTitleWrapper>
          <div style={{ padding: '2%' }}>
            <Label htmlFor="title">제목 *</Label>
            <Input
              type="text"
              id="title"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label htmlFor="attachment">첨부</Label>
            <FileInput
              type="file"
              multiple
              onChange={handleAddFile}
            />

            <Label htmlFor="content">내용 *</Label>
            <div>
              <Editor
                ref={editorRef}
                initialValue=" "
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                hooks={{
                  addImageBlobHook: addImageBlobHook
                }}
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'link', 'image']
                ]}
                plugins={[color]}
              />
            </div>
          </div>
        </FormWrapper>
      </N.MainWrapper>
      <D.BtWrap style={{ width: '70%', marginLeft: '21%', marginBottom: '2%' }}>
        <D.BtLink as={Link} to="/admin/adminnotice">취소</D.BtLink>
        <D.BtLink onClick={handleSubmit}>등록</D.BtLink>
      </D.BtWrap>
    </>
  );
};

export default NoticeCreate;
