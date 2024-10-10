import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 

const MainWrapper = styled.div`
  width: 78%; 
  margin-left: 22%;
  padding: 20px;
`;


const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; 
  padding: 1%;
`;

const SectionTitle = styled.h3`
  font-size: 2.3rem;
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


const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-column-gap: 20px;
  margin-bottom: 10px;
`;


const NameRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-column-gap: 20px;
  margin-bottom: 10px;
`;


const RightColumn = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;


const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; 
  grid-gap: 20px;
`;

const ProductCreate = () => {
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

  const editorRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleEditorChange = () => {
    const data = editorRef.current.getInstance().getHTML(); // 에디터 내용을 HTML 형태로 저장
    setProduct({ ...product, content: data }); // content 필드에 저장
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
        </RowContainer>

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

          {/* Toast UI Editor */}
          <div>
            <div style={{marginBottom: '10px'}}><Label  htmlFor="content">상품 설명 *</Label></div>
            <Editor
              ref={editorRef}
              initialValue="상품 설명을 입력하세요."
              previewStyle="vertical"
              height="500px"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'link', 'image']
              ]}
              onChange={handleEditorChange}
            />
          </div>

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

export default ProductCreate;
