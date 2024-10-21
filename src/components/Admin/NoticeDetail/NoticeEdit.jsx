import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as N from '../Notice/NoticeStyle';
import * as C from '../Product/ProductCreateStyle';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import styled from 'styled-components';
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
  font-size: 1.8rem;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 1.5rem;
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

const NoticeEdit = () => {
  const { noticeId } = useParams();
  const editorRef = useRef();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // 공지사항 내용 저장
  const [files, setFiles] = useState([]);
  const [noticeFiles, setNoticeFiles] = useState([]);
  const [originalNotice, setOriginalNotice] = useState(null);  // 기존 공지사항 상태 저장
  const [error, setError] = useState('');

  // 기존 공지사항 불러오기
  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/notices/${noticeId}`);
        if (response.status === 200) {
          const notice = response.data.data;
          setTitle(notice.noticeTitle);  // 기존 제목 불러오기
          setContent(notice.noticeContent);  // 기존 내용을 Editor에 반영
          setNoticeFiles(notice.noticeFiles);  // 기존 파일 불러오기
          setOriginalNotice(notice);  // 원본 데이터를 저장
        }
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

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

      setNoticeFiles((prev) => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다:', error);
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
    const contentValue = editorRef.current.getInstance().getHTML();

    // 변경된 필드만 전송하기 위해 원본과 비교
    const noticeData = {};
    if (title !== originalNotice.noticeTitle) {
      noticeData.title = title;
    }
    if (contentValue !== originalNotice.noticeContent) {
      noticeData.context = contentValue;
    }
    if (noticeFiles !== originalNotice.noticeFiles) {
      noticeData.noticeFiles = noticeFiles;
    }

    try {
      const response = await axios.patch(`https://api.telegro.kr/api/notices/${noticeId}`, noticeData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        navigate('/admin/adminnotice');
      }
    } catch (error) {
      console.error('공지사항 수정 중 오류가 발생했습니다:', error);
      if (error.response && error.response.status === 403) {
        setError('관리자 계정으로 로그인하십시오.');
      } else {
        setError('공지사항을 수정하는 동안 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <N.MainWrapper>
        <C.SectionTitle>공지사항 수정</C.SectionTitle>
        <FormWrapper>
          <SectionTitleWrapper>
            <SectionTitle>게시글 수정</SectionTitle>
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
                initialValue={content}  // 기존 내용을 Editor에 반영
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
      <D.BtWrap>
        <D.BtLink as={Link} to="/admin/adminnotice">취소</D.BtLink>
        <D.BtLink onClick={handleSubmit}>수정</D.BtLink>
      </D.BtWrap>
    </>
  );
};

export default NoticeEdit;
