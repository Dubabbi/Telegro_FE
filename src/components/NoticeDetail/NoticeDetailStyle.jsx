import styled from 'styled-components';

export const BoardWrap = styled.div`
  width: 1200px;
  margin: 100px auto;
  @media (max-width: 1000px) {
    width: 100%;
    min-width: 320px;
    padding: 0 30px;
    box-sizing: border-box;
  }
`;

export const BoardTitle = styled.div`
  margin-bottom: 30px;
`;

export const BoardViewWrap = styled.div`
  width: 100%;
  border-top: 2px solid #000;
`;

export const BoardView = styled.div`
  width: 100%;
`;


export const Titlde = styled.div`
  position: relative; // 선을 위한 상대 위치 지정
  padding-right:30px;
  margin-right: 30px; // 선과 내용 사이의 간격
  border-bottom: 1px dashed #ddd;
    padding: 20px 15px;
    font-size: 2rem;
  &::after {
    content: ""; // 선을 만들기 위한 가상 요소
    position: absolute; // 선의 위치를 제목 요소 기준으로 설정
    top: 0; // 선의 상단 위치
    right: 0; // 선의 오른쪽 위치
    display: block; // 선을 블록 요소로 표시
    width: 1px; // 선의 두께
    height: 100%; // 선의 높이를 제목의 높이와 동일하게 설정
    background: #ddd; // 선의 색상
  }
`;

export const Title = styled.div`
  position: relative; // 선을 위한 상대 위치 지정
  padding-right: 30px; // 제목과 선 사이의 간격
  margin-right: 30px; // 선과 내용 사이의 추가 간격
  font-size: 2rem; // 제목의 글자 크기
  padding: 20px 15px; // 상하, 좌우 패딩
  display: flex; // Flexbox 레이아웃 적용
  align-items: center; // 중앙 정렬
  border-bottom: 1px dashed #ddd;
  &::after {
    content: ""; // 선을 만들기 위한 가상 요소
    position: absolute; // 선의 위치를 제목 요소 기준으로 설정
    top: 0; // 선의 상단 위치
    right: -30px; // 오른쪽 여백을 고려한 위치 조정
    bottom: 0; // 하단 위치 조정
    width: 1px; // 선의 두께
    background: #ddd; // 선의 색상
  }
`;

export const Info = styled.div`
  padding: 15px;
  border-bottom: 1px solid #999;
  font-size: 0;
`;

export const InfoItem = styled.dl`
  position: relative;
  display: inline-block;
  padding: 0 20px;
  &:first-child {
    padding-left: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 0;
    display: block;
    width: 1px;
    height: 13px;
    background: #ddd;
  }

  &:first-child::before {
    display: none;
  }
`;

export const InfoItemText = styled.div`
  display: inline-block;
  font-size: 1.4rem;
`;

export const Cont = styled.div`
  padding: 15px;
  border-bottom: 1px solid #000;
  line-height: 2;
  font-size: 1.3rem;
`;

export const BtWrap = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 0;
`;

export const BtLink = styled.a`
  display: inline-block;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #000;
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
    background: #141414ae;
    color: #ccc;
  }
`;


export const SubmitButton = styled.button`
  border: none;
  cursor: pointer;
  line-height: 1;
  font-size: 20px;
  background: #bbb;
  width: 20%;
  margin-left: 40%;
  color: #0d0d0d;
  border-radius: 5px;
  font-weight: bold;
  padding: 18px 32px;
  &:hover {
    background: #141414ae;
    border-radius: 5px;
    color: #ccc;
  }
`;