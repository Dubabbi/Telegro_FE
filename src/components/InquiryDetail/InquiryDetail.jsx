import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle'; 
import * as N from '../Notice/NoticeStyle'; 

const InquiryDetail = () => {
  const inquiry = {
    id: 1,
    title: "문의 드립니다.",
    created_at: "2023-01-01",
    view_count: 150,
    content: "제안 문의의 내용입니다. 여기에 자세한 설명이 포함됩니다."
  };

  const [comments, setComments] = useState([
    { id: 1, author: '관리자', text: '답변했습니다.' },
  ]);
  const [newComment, setNewComment] = useState('');
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: '관리자', text: newComment }]);
      setNewComment('');
    }
  };



  return (
    <N.MainWrapper>
      <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
      <N.Section>
        <N.PageTitle>
          <N.TitleText style={{fontSize: '1.5vw'}}>제안 문의</N.TitleText>
        </N.PageTitle>
        <D.BoardViewWrap>
          <D.BoardView>
            <D.Title>{inquiry.title}</D.Title>
            <D.Info>
              <D.InfoItem>
                <D.InfoItemText>{inquiry.id}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>작성일</D.InfoItemText>
                <D.InfoItemText>: {new Date(inquiry.created_at).toLocaleDateString()}</D.InfoItemText>
              </D.InfoItem>
              <D.InfoItem>
                <D.InfoItemText>조회</D.InfoItemText>
                <D.InfoItemText>{inquiry.view_count}</D.InfoItemText>
              </D.InfoItem>
            </D.Info>
            <D.Cont>
              {inquiry.content.split('\n').map((content, index) => (
                <React.Fragment key={index}>
                  {content}
                  <br />
                </React.Fragment>
              ))}
            </D.Cont>
          </D.BoardView>
          </D.BoardViewWrap>
      {/* 댓글 입력 및 목록 */}
        <N.CommentSection>
        <N.CommentForm onSubmit={handleCommentSubmit}>
          <N.CommentInput
            type="text"
            placeholder="댓글을 입력해 주세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <N.SubmitButton type="submit">➤</N.SubmitButton>
        </N.CommentForm>

        <N.CommentList>
          {comments.map((comment) => (
            <N.CommentItem key={comment.id}>
              <N.Avatar />
              <N.CommentContent>
                <N.CommentHeader>{comment.author}</N.CommentHeader>
                <N.CommentText>{comment.text}</N.CommentText>
              </N.CommentContent>
            </N.CommentItem>
          ))}
        </N.CommentList>
      </N.CommentSection>
          <D.BtWrap>
            <D.BtLink as={Link} to="/inquiryform">
              목록
            </D.BtLink>
            <D.DeleteBtLink as={Link} to="">삭제</D.DeleteBtLink>
          </D.BtWrap>
      </N.Section>
    </N.MainWrapper>
  );
}

export default InquiryDetail;
