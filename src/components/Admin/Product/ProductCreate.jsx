import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import axios from 'axios';
import * as C from './ProductCreateStyle';

const ProductCreate = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [product, setProduct] = useState({
    productModel: '',
    productName: '',
    options: [],
    category: '',
    content: '',
    priceBusiness: '',
    priceBest: '',
    priceDealer: '',
    priceCustomer: '',
    pictures: []
  });
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      // Now you can safely use editorInstance
      console.log(editorInstance.getHTML()); // Example usage
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct(prev => ({
        ...prev,
        category: value 
      }));
    } else if (name === 'options') {
      // Assuming options should be stored as an array of strings
      const optionsArray = value.split(',').map(item => item.trim());
      setProduct(prev => ({
          ...prev,
          options: optionsArray
      }));

    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getInstance().getHTML();
      setProduct(prev => ({ ...prev, content: htmlContent }));
    } else {
      console.error('Editor not initialized');
    }
  };

  const addImageBlobHook = async (blob, callback) => {
    const formData = new FormData();
    formData.append('image', blob);
    
    const token = localStorage.getItem('token'); // 토큰 가져오기
    if (!token) {
      alert('로그인이 필요합니다.');
      return; 
    }
    
    try {
      const response = await axios.post(`/proxy/api/file?prefix=product`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        }
      });
    
      const imageUrl = response.data.data.url;
      setProduct(prev => ({
        ...prev,
        pictures: [...prev.pictures, imageUrl]
      }));
    
      callback(imageUrl, 'Image');
      

      updateImageMetadata(imageUrl, {
        description: "새로운 이미지 설명",
        tags: ["태그1", "태그2"]
      });
      
    } catch (error) {
      console.error('Image upload failed:', error.response.data.message); 
      alert('이미지 업로드 실패: ' + error.response.data.message);
    }
  };
  
  const updateImageMetadata = async (imageUrl, metadata) => {
    try {
      const response = await axios.put(`https://thingproxy.freeboard.io/fetch/${imageUrl}`, metadata);
      console.log('Metadata updated successfully:', response);
    } catch (error) {
      console.error('Failed to update metadata:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleCreateProduct = async () => {
    const formData = {
      ...product,
      pictures: product.pictures
    };

    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.post('/proxy/api/products', formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (response.status === 200) {
        alert('Product registered successfully.');
        navigate('/adminproductlist');
      }
    } catch (error) {
      console.error('Error while registering product:', error);
      alert('Failed to register product');
    }
  };

  return (
    <C.MainWrapper>
      <C.SectionTitle style={{margin: '1%', marginBottom: '4%', marginTop: '3%'}}>상품 등록</C.SectionTitle>
      <C.FormWrapper>
      <C.SectionTitleWrapper>
        <C.SectionTitle style={{fontSize: '1.5vw'}}>상품 등록</C.SectionTitle>
        </C.SectionTitleWrapper>
        <div style={{padding: '2%'}}>
        {/* 모델명 & 상품명 한 줄로 배치 */}
        <C.NameRowContainer>
            <div>
              <C.Label htmlFor="productModel">모델명 *</C.Label>
              <C.Input
                type="text"
                name="productModel"
                id="modelName"
                value={product.productModel}
                onChange={handleChange}
              />
            </div>
            <div>
              <C.Label htmlFor="productName">상품명 *</C.Label>
              <C.Input
                type="text"
                name="productName"
                id="productName"
                placeholder="상품명"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
          </C.NameRowContainer>
          <C.RowContainer>
            <div>
              <C.Label htmlFor="options">상품 카테고리 *</C.Label>
              <C.Input
                type="text"
                name="options"
                id="options"
                value={product.options.join(', ')}
                onChange={handleChange}
              />
            </div>
            <div>
              <C.Label htmlFor="category">옵션 *</C.Label>
              <C.Select
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">옵션 선택</option>
                <option value="Noise Cancelling">Noise Cancelling</option>
                <option value="Bluetooth 5.0">Bluetooth 5.0</option>
                <option value="Built-in Microphone">Built-in Microphone</option>
              </C.Select>
            </div>
            </C.RowContainer>
            <C.RightColumn>
              <div>
                <C.Label htmlFor="businessPrice">Business *</C.Label>
                <C.Input
                  type="number"
                  name="businessPrice"
                  id="businessPrice"
                  placeholder="숫자만 입력해 주세요."
                  value={product.businessPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="bestPrice">Best *</C.Label>
                <C.Input
                  type="number"
                  name="bestPrice"
                  id="bestPrice"
                  placeholder="숫자만 입력해 주세요."
                  value={product.bestPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="dealerPrice">Dealer *</C.Label>
                <C.Input
                  type="number"
                  name="dealerPrice"
                  id="dealerPrice"
                  placeholder="숫자만 입력해 주세요."
                  value={product.dealerPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="customerPrice">Customer *</C.Label>
                <C.Input
                  type="number"
                  name="customerPrice"
                  id="customerPrice"
                  placeholder="숫자만 입력해 주세요."
                  value={product.customerPrice}
                  onChange={handleChange}
                />
              </div>
            </C.RightColumn>
            <C.RightColumn>
            <div>
              <C.Label htmlFor="photo">Photo *</C.Label> {/* 이미지 순서 변경 로직 필요 */}
              <C.FileInput
                type="file"
                name="photo"
                id="photo"
                onChange={handleChange}
              />
            </div>
            </C.RightColumn>
            {/* Toast UI Editor */}
            <div>
              <div style={{marginBottom: '10px'}}><C.Label  htmlFor="content">상품 설명 *</C.Label></div>
              <Editor
                ref={editorRef}
                initialValue="상품 설명을 입력하세요."
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
                onChange={handleEditorChange}
            />

            </div>

            </div>
            </C.FormWrapper>
            <N.Section style={{margin: '0'}}>
            <D.BtWrap>
              <D.BtLink as={Link} to="">
                취소
              </D.BtLink>
              <D.BtLink onClick={handleCreateProduct}>
                등록
              </D.BtLink>
            </D.BtWrap>
            </N.Section>
            </C.MainWrapper>
            );
};

export default ProductCreate;

