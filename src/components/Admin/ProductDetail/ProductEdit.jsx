import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';

// Main container for the entire form
const MainWrapper = styled.div`
  width: 78%; 
  margin-left: 22%;
  padding: 20px;
`;

// Form container with a gray background for the section title
const FormWrapper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; /* 회색 배경 */
  padding: 1%;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`;


const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  margin-top: 3%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  border: 1px solid #ddd;
  margin-top: 3%;
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
  margin-bottom: 10%;
  margin-top: 3%;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  margin-top: 3%;
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

// Row container for fields that should be on the same line
const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열로 나누어서 배치 */
  grid-column-gap: 20px;
  margin-bottom: 20px;
`;

// New container for 모델명 & 상품명을 한 줄로 배치
const NameRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 모델명과 상품명을 한 줄로 배치 */
  grid-column-gap: 20px;
  margin-bottom: 20px;
`;

// Content & Photo Section Container (좌측)
const LeftColumn = styled.div`
  grid-column: 1 / 2; /* 첫 번째 열 차지 */
`;

// Price Section Container (우측)
const RightColumn = styled.div`
  grid-column: 2 / 3; /* 두 번째 열 차지 */
`;

// Container for splitting left and right areas
const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* 좌측 2/3, 우측 1/3 비율로 나눔 */
  grid-gap: 20px;
`;

const ProductEdit = () => {
  const [product, setProduct] = useState({
    modelName: '',
    productName: '',
    option: '',
    stock: '',
    category: '',
    subCategory: '',
    content: '',
    businessPrice: '',
    bestPrice: '',
    dealerPrice: '',
    customerPrice: '',
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <MainWrapper>
      <SectionTitle style={{margin: '1%', marginBottom: '4%', marginTop: '3%'}}>상품 등록</SectionTitle>
      <FormWrapper>
        <SectionTitleWrapper>
        <SectionTitle style={{fontSize: '1.5vw'}}>상품 등록</SectionTitle>
        </SectionTitleWrapper>
        <div style={{padding: '2%'}}>
        {/* 모델명 & 상품명 한 줄로 배치 */}
        <NameRowContainer>
          <div>
            <Label htmlFor="modelName">모델명 *</Label>
            <Input
              type="text"
              name="modelName"
              id="modelName"
              placeholder="모델명"
              value={product.modelName}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="productName">상품명 *</Label>
            <Input
              type="text"
              name="productName"
              id="productName"
              placeholder="상품명"
              value={product.productName}
              onChange={handleChange}
            />
          </div>
        </NameRowContainer>

        {/* 옵션, 재고 보유, 상품 카테고리 한 줄로 배치 */}
        <RowContainer>
          <div>
            <Label htmlFor="option">옵션 *</Label>
            <Input
              type="text"
              name="option"
              id="option"
              placeholder="구분자"
              value={product.option}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="stock">재고 보유 *</Label>
            <Select
              name="stock"
              id="stock"
              value={product.stock}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value="many">많음</option>
              <option value="few">적음</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">상품 카테고리 *</Label>
            <Select
              name="category"
              id="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">대분류명</option>
              <option value="category1">카테고리1</option>
              <option value="category2">카테고리2</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="subCategory">상품 세부 카테고리 *</Label>
            <Select
              name="subCategory"
              id="subCategory"
              value={product.subCategory}
              onChange={handleChange}
            >
              <option value="">상품 카테고리</option>
              <option value="subCategory1">세부 카테고리1</option>
              <option value="subCategory2">세부 카테고리2</option>
            </Select>
          </div>
        </RowContainer>

        {/* SplitContainer for 내용, 포토 & 가격 */}
        <SplitContainer>
          {/* Left Column: 내용 & 포토 */}
          <LeftColumn>
            <div>
              <Label htmlFor="content">내용 *</Label>
              <Textarea
                name="content"
                id="content"
                placeholder="내용을 입력해 주세요."
                value={product.content}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="photo">Photo *</Label>
              <FileInput
                type="file"
                name="photo"
                id="photo"
                onChange={handleChange}
              />
            </div>
          </LeftColumn>

          {/* Right Column: 가격 */}
          <RightColumn>
            <div>
              <Label htmlFor="businessPrice">Business *</Label>
              <Input
                type="number"
                name="businessPrice"
                id="businessPrice"
                placeholder="숫자만 입력해 주세요."
                value={product.businessPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="bestPrice">Best *</Label>
              <Input
                type="number"
                name="bestPrice"
                id="bestPrice"
                placeholder="숫자만 입력해 주세요."
                value={product.bestPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="dealerPrice">Dealer *</Label>
              <Input
                type="number"
                name="dealerPrice"
                id="dealerPrice"
                placeholder="숫자만 입력해 주세요."
                value={product.dealerPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="customerPrice">Customer *</Label>
              <Input
                type="number"
                name="customerPrice"
                id="customerPrice"
                placeholder="숫자만 입력해 주세요."
                value={product.customerPrice}
                onChange={handleChange}
              />
            </div>
          </RightColumn>
        </SplitContainer>
        </div>
      </FormWrapper>
      <N.Section style={{margin: '0'}}>
      <D.BtWrap>
            <D.BtLink as={Link} to="">
              취소
            </D.BtLink>
            <D.BtLink as={Link} to="">
              등록
            </D.BtLink>
          </D.BtWrap>
          </N.Section>
    </MainWrapper>
  );
};

export default ProductEdit;
