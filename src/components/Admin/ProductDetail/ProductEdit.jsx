import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as D from '../NoticeDetail/NoticeDetailStyle';
import * as N from '../Notice/NoticeStyle';
import { Editor } from '@toast-ui/react-editor'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import axios from 'axios';
import color from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import * as C from '../Product/ProductCreateStyle';

const ProductEdit = () => {
  const { productId } = useParams();
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
    previewImage: '',
    coverImage: ''
  });

  const [originalProduct, setOriginalProduct] = useState(null); // 원본 데이터를 저장
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // 삭제 버튼 표시할 이미지
  const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 수

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data.data);
          setOriginalProduct(response.data.data); // 원본 데이터를 상태에 저장
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('상품 정보를 가져오는 데 실패했습니다.');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'options') {
      const optionsArray = value.split(',').map((item) => item.trim());
      setProduct((prev) => ({ ...prev, options: optionsArray }));
    } else if (name === 'photo' && files.length > 0) {
      handleAddImage(e);
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Editor 변경 사항을 상태에 반영
  const handleEditorChange = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getInstance().getHTML();
      setProduct((prev) => ({ ...prev, content: htmlContent }));
    }
  };

  const handleAddImage = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length + product.pictures.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          const reader = new FileReader();
          const imageDataUrl = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });

          // presigned URL 가져오기
          const presignedUrlResponse = await axios.post(
            'https://api.telegro.kr/api/file?prefix=product',
            {
              metadata: {
                description: '이미지 설명',
                tags: ['태그1', '태그2'],
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

          // presigned URL로 이미지 업로드 (PUT)
          await axios.put(presignedUrl, file, {
            headers: {
              'Content-Type': file.type,
            },
          });

          const imageUrl = presignedUrl.split('?')[0]; 
          return imageUrl;
        })
      );

      // 새로 업로드된 이미지를 상태에 추가
      setProduct((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...newImages],
        coverImage: prev.coverImage || newImages[0] 
      }));

      console.log('이미지 업로드에 성공했습니다.');
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다:', error);
      alert(`이미지 업로드 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  // 대표 이미지 선택
  const handleCoverImageSelect = (image) => {
    setProduct((prev) => ({
      ...prev,
      coverImage: image,
    }));
  };

  // 이미지 삭제 함수
  const handleRemoveImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
    setSelectedImageIndex(null); 
  };

  const handleUpdateProduct = async () => {
    // 수정된 필드만 포함된 객체를 생성
    const updatedProduct = {};
    if (product.productName !== originalProduct.productName) {
      updatedProduct.productName = product.productName;
    }
    if (product.priceCustomer !== originalProduct.priceCustomer) {
      updatedProduct.priceCustomer = product.priceCustomer;
    }
    if (product.category !== originalProduct.category) {
      updatedProduct.category = product.category;
    }
    if (product.options.join(',') !== originalProduct.options.join(',')) {
      updatedProduct.options = product.options;
    }
    if (product.content !== originalProduct.content) {
      updatedProduct.content = product.content; // 상품 설명 추가
    }
    if (product.pictures !== originalProduct.pictures) {
      updatedProduct.pictures = product.pictures; // 이미지 업데이트
    }
    if (product.coverImage !== originalProduct.coverImage) {
      updatedProduct.coverImage = product.coverImage; // 대표 이미지 업데이트
    }
    // 만약 수정된 부분이 없다면 업데이트하지 않음
    if (Object.keys(updatedProduct).length === 0) {
      alert('수정된 내용이 없습니다.');
      return;
    }
    try {
      const response = await axios.patch(
        `https://api.telegro.kr/api/products/${productId}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      if (response.status === 200) {
        alert('상품이 성공적으로 수정되었습니다.');
        navigate(`/admin/headset`);
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const addImageBlobHook = async (blob, callback) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      // 백엔드에서 프리사인 URL 가져오기
      const response = await axios.post(`https://api.telegro.kr/api/file?prefix=product`, {
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
  return (
    <C.MainWrapper>
      <C.SectionTitle style={{margin: '1%', marginBottom: '4%', marginTop: '3%'}}>상품 수정</C.SectionTitle>
      <C.FormWrapper>
        <C.SectionTitleWrapper>
          <C.SectionTitle style={{fontSize: '1.8rem'}}>상품 수정</C.SectionTitle>
        </C.SectionTitleWrapper>
        <div style={{padding: '2%'}}>
          <C.NameRowContainer>
            <div>
              <C.Label htmlFor="productModel">모델명 *</C.Label>
              <C.Input
                type="text"
                name="productModel"
                value={product.productModel}
                onChange={handleChange}
              />
            </div>
            <div>
              <C.Label htmlFor="productName">상품명 *</C.Label>
              <C.Input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
          </C.NameRowContainer>
        </div>
        <C.RowContainer style={{padding: '2%'}}>
          <div >
            <C.Label htmlFor="category">상품 카테고리 *</C.Label>
            <C.Input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <C.Label htmlFor="options">옵션 *</C.Label>
            <C.Input
              type="text"
              name="options"
              value={product.options.join(', ')}
              onChange={handleChange}
            >
            </C.Input>
          </div>
        </C.RowContainer>
        <C.RightColumn>
          <div>
            <C.Label htmlFor="photo">사진 업로드 (최대 4개) *</C.Label>
            <C.FileInput
              type="file"
              name="photo"
              id="photo"
              multiple
              onChange={handleAddImage}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {product.pictures.map((image, index) => (
                <div key={index} className="image-preview" style={{ position: 'relative' }}>
                  <img
                    src={image}
                    alt={`preview-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: product.coverImage === image ? '2px solid green' : 'none',
                    }}
                    onClick={() => setSelectedImageIndex(index)} // 클릭 시 이미지를 선택 상태로 만듦
                  />

                  <button
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: product.coverImage === image ? 'green' : 'white',
                      color: product.coverImage === image ? 'white' : 'black',
                      border: '1px solid black',
                      borderRadius: '50%',
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 버블링 방지
                      handleCoverImageSelect(image); // 대표 이미지 선택
                    }}
                  >
                    {product.coverImage === image ? '✔' : '☆'}
                  </button>

                  <button
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      background: '#ddd',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '3px',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 버블링 방지
                      handleRemoveImage(index); // 이미지 삭제
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </C.RightColumn>
        <C.RightColumn style={{padding: '2%'}}>
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

        <div style={{padding: '2%'}}>
          <C.Label style={{marginBottom: '20px'}} htmlFor="content">상품 설명 *</C.Label>
          <Editor
            ref={editorRef}
            initialValue={product.content}
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut
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


      </C.FormWrapper>

      <N.Section style={{ margin: '0' }}>
        <D.BtWrap>
          <D.BtLink as={Link} to={`/admin/headset`}>
            취소
          </D.BtLink>
          <D.BtLink onClick={handleUpdateProduct}>수정</D.BtLink>
        </D.BtWrap>
      </N.Section>
    </C.MainWrapper>
  );
};

export default ProductEdit;