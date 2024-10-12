import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img from '../../Check/image.svg'; 
import * as P from '../ProductList/ProductStyle';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  width: 70%;
  margin-left: 23%;
  margin-top: 3vh;
  padding: 2%;
  margin-bottom: 4%;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2%;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const ProductInfoWrapper = styled.div`
  display: flex; /* 가로로 배치 */
  align-items: center;
  flex: 2;
`;

const ProductImage = styled.img`
  width: 250px;
  height: auto;
  margin-right: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  white-space: nowrap;
  color: #303972;
  margin-bottom: 10px;
  margin-left: 6%;
`;

const ProductSubtitle = styled.h3`
  font-weight: bold;
  font-size: 1.6rem;
  color: #6B6B6B;
  margin-bottom: 35%;
  margin-left: 8%;
`;

const BuyButton = styled.button`
  padding: 10px 25px;
  background-color: #4D44B5;
  color: white;
  font-size: 1rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 5%;
  margin-bottom: 20px;
  h1{
    font-size: 1.4rem;
  }
`;

const PriceTag = styled.span`
  padding: 5px 15px;
  background: rgba(77, 68, 181, 0.2);
  border-radius: 1rem;
  align-items: center;
  color: #444;
  font-weight: semibold;
  font-size: 1.3rem;
`;

const AdditionalImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 5px;  /* 위아래 간격을 5px로 설정 */
  column-gap: 10px;  /* 좌우 간격 */
  padding-left: 20px;
  align-items: center;
  justify-items: center;
  height: 29.5vh;
  margin: 5% 0;
`;

const AdditionalImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  `;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 좌우로 배치 */
  justify-content: space-between; /* 좌우 정렬 */
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  padding-bottom: 5%;
  padding-top: 3%;
`;

const DescriptionWrapper = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const DescriptionTitle = styled.h4`
  font-size: 1.6rem;
  color: #303972;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  margin-top: 2%;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1.7;
  color: #444;
`;

const DescriptionItem = styled.li`
  margin-bottom: 5px;
`;

const RequestInputWrapper = styled.div`
  flex: 1;
`;

const RequestInputLabel = styled.label`
  font-size: 1.6rem;
  color: #444;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const RequestInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #777;
  border-radius: 10px;
  resize: none;
    &::placeholder {
      color: #444;
    }
    &:focus {
      outline: 2px solid #94A3D8;
      border: none;
    }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin-top: 5%;
  margin-left: 15%;
  margin-bottom: 2%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.5vw;
    font-weight: bold;
  }
  

`;
// 메인 컨테이너
const MainWrapper = styled.div`
  width: 70%;
  margin-left: 23%;
  margin-top: 3vh;
  padding: 2%;
`;
const AdminProductDetail = () => {
  const navigate = useNavigate();
  //const { productId } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const productId = 3;
  useEffect(() => {
    const productId = 3;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/proxy/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('상품 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchProduct();
  }, [3]); 

  if (!product) {
    return <div>로딩 중...</div>; 
  }

  return (
    <>
      <MainWrapper>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <N.PageTitle>
            <h2 style={{ marginLeft: '1%', fontSize: '1.5vw', fontWeight: 'bold', whiteSpace: 'nowrap' }}>제품 상세</h2>
          </N.PageTitle>
          <D.BtLink style={{ padding: '1%', textAlign: 'center', alignItems: 'center', maxHeight: '6vh' }} as={Link} to={`/admin/adminproductedit/${productId}`}>
            수정
          </D.BtLink>
        </div>
      </MainWrapper>
      <ProductPageWrapper>
        <ProductDetails>
          <ProductInfoWrapper>
            <ProductImage src={product.pictures[0] || img} alt="Main Product" /> {/* 메인 이미지 표시 */}
            <ProductInfo>
              <ProductTitle>{product.productName}</ProductTitle> {/* 상품명 */}
              <ProductSubtitle>{product.productModel}</ProductSubtitle> {/* 모델명 */}
            </ProductInfo>
          </ProductInfoWrapper>
          <AdditionalImagesWrapper>
            {product.pictures.slice(1).map((picture, index) => (
              <AdditionalImage key={index} src={picture} alt={`Additional Image ${index + 1}`} />
            ))}
          </AdditionalImagesWrapper>
        </ProductDetails>
        <PriceWrapper>
          <DescriptionTitle style={{ marginBottom: '0px', alignItems: 'center' }}>가격</DescriptionTitle>
          <PriceTag>Biz: ₩{product.priceBusiness}</PriceTag>
          <PriceTag>B: ₩{product.priceBest}</PriceTag>
          <PriceTag>D: ₩{product.priceDealer}</PriceTag>
          <PriceTag>C: ₩{product.priceCustomer}</PriceTag>
        </PriceWrapper>
        <ContentWrapper>
            <DescriptionTitle>상품 설명</DescriptionTitle>
            <DescriptionList> <DescriptionItem dangerouslySetInnerHTML={{ __html: product.content }} /> {/* 상품 설명 */}
            </DescriptionList>

        </ContentWrapper>
      </ProductPageWrapper>
    </>
  );
};

export default AdminProductDetail;
