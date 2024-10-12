import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import axios from 'axios';
import * as C from './ProductCreateStyle';
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

const ProductCreate = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [product, setProduct] = useState({
    productModel: '',
    productName: '',
    options: [],
    category: '',
    content: '',
    priceBussiness: '',
    priceBest: '',
    priceDealer: '',
    priceCustomer: '',
    pictures: [],
    previewImage: '' 
  });
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();

      console.log(editorInstance.getHTML()); 
    }
  }, []);
  const handleChange = e => {
    const { name, value, files } = e.target;
  
    if (name === 'options') {
      // optionsArray는 이제 options 조건문 안에서만 존재하지 않고, 전체 함수 범위에서 사용됩니다.
      const optionsArray = value.split(',').map(item => item.trim());
      setProduct(prev => ({
        ...prev,
        options: optionsArray
      }));
    } else if (name === 'photo' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct(prev => ({
          ...prev,
          previewImage: reader.result // 프리뷰 이미지 상태 업데이트
        }));
      };
      reader.readAsDataURL(file);
    } else if (name === 'category') {
      setProduct(prev => ({
        ...prev,
        category: value 
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
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct(prev => ({
          ...prev,
          previewImage: reader.result 
        }));
      };
      reader.readAsDataURL(file); 
      
      try {
        // 백엔드에서 presigned URL 가져오기
        const presignedUrlResponse = await axios.post('/proxy/api/file?prefix=product', {
          metadata: {
            description: '이미지 설명',
            tags: ['태그1', '태그2']
          }
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        const presignedUrl = presignedUrlResponse.data.data.url;
        
        // presigned URL로 이미지 업로드 (PUT)
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type
          }
        });

        // 업로드된 이미지의 URL을 product에 추가
        const imageUrl = presignedUrl.split('?')[0]; // URL에서 쿼리스트링 제거
        setProduct(prev => ({
          ...prev,
          pictures: [...prev.pictures, imageUrl]
        }));
        
        alert('이미지 업로드에 성공했습니다.');
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생했습니다:', error);
        alert(`이미지 업로드 중 오류가 발생했습니다: ${error.message}`);
      }
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
      const response = await axios.post(`/proxy/api/file?prefix=product`, {
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
  
  
 

  const handleCreateProduct = async () => {
    const formData = {
      productModel: product.productModel,  
      productName: product.productName,  
      options: product.options,           
      category: product.category,         
      content: product.content,          
      priceBussiness: product.priceBussiness,
      priceBest: product.priceBest,    
      priceDealer: product.priceDealer,   
      priceCustomer: product.priceCustomer,
      pictures: product.pictures        
    };
  
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.post('/proxy/api/products', formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      if (response.status === 200) {
        alert('Product registered successfully.');
        navigate('/admin/adminproductlist');  // 상품 등록 후 이동할 페이지
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
              <C.Label htmlFor="category">상품 카테고리 *</C.Label>
              <C.Input
                type="text"
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <C.Label htmlFor="options">옵션 *</C.Label>
              <C.Select
                name="options"
                id="options"
                value={product.options.join(', ')}
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
                <C.Label htmlFor="priceBussiness">Business *</C.Label>
                <C.Input
                  type="number"
                  name="priceBussiness"
                  id="priceBussiness"
                  placeholder="숫자만 입력해 주세요."
                  value={product.priceBussiness}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="priceBest">Best *</C.Label>
                <C.Input
                  type="number"
                  name="priceBest"
                  id="priceBest"
                  placeholder="숫자만 입력해 주세요."
                  value={product.priceBest}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="priceDealer">Dealer *</C.Label>
                <C.Input
                  type="number"
                  name="priceDealer"
                  id="priceDealer"
                  placeholder="숫자만 입력해 주세요."
                  value={product.priceDealer}
                  onChange={handleChange}
                />
              </div>

              <div>
                <C.Label htmlFor="priceCustomer">Customer *</C.Label>
                <C.Input
                  type="number"
                  name="priceCustomer"
                  id="priceCustomer"
                  placeholder="숫자만 입력해 주세요."
                  value={product.priceCustomer}
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
                onChange={handleAddImage}
              />
                {product.previewImage && (
                <img 
                  src={product.previewImage} 
                  alt="Preview" 
                  style={{ width: '100%', height: 'auto' }} 
                />
              )}
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
                plugins={[color]}
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

