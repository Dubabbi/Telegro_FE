import styled from 'styled-components';
export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);  
  gap: 20px;  
  margin: 0 auto;
  padding: 2%;
  max-width: 98%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }
`;

export const GalleryItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 7%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);  
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;  
    border-bottom: 2px solid #94A3D8;
  }

  h3 {
    padding: 15px;
    font-size: 1.6rem;
    color: #333;
    text-align: center;
  }

  p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 10px;
  }

  strong {
    font-size: 1.1rem;
    color: #000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열 */
  gap: 20px; /* 각 제품 박스 간격 */
  margin-top: 50px;
  @media(max-width: 780px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ProductBox = styled.div`
  background-color: #f5f5f5;
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media(max-width: 780px){
    padding: 10px;
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const ProductInfo = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 10px;
  }

  strong {
    font-size: 1.1rem;
    color: #000;
  }
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3%;
  h1 {
    font-size: 2.6rem;
    font-weight: bold;
  }
  p {
    font-size: 1.35rem;
    color: #777;
  }
  @media(max-width: 780px){
    h1{font-size: 1.9rem;}
      margin-top: 9%;
    }
    max-width: 100%;
    width: 100%;
  }
`;

export const PageContainer = styled.div`
  margin-left: 20%; /* 좌측 네비게이션 바와의 간격 */
  padding: 2%;
  margin-top: 1%;
  width: 78%; /* 전체 화면의 78% 차지 */
  @media(max-width: 780px){
    padding: 1%;
    margin-left: 8%;
  }
`;

export const Pagediv = styled.div`

  @media(max-width: 780px){
    text-align: center;
    margin-left: 10%;
  }
`;

