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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.telegro.kr/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data.data);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, previewImage: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.getInstance().getHTML();
      setProduct((prev) => ({ ...prev, content: htmlContent }));
    }
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = {
      productName: product.productName,
      priceCustomer: product.priceCustomer,
      category: product.category,
      options: product.options,
    };

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

  return (
    <C.MainWrapper>
      <C.SectionTitle style={{margin: '1%', marginBottom: '4%', marginTop: '3%'}}>상품 수정</C.SectionTitle>
      <C.FormWrapper>
        <C.SectionTitleWrapper>
        <C.SectionTitle style={{fontSize: '1.8rem'}}>상품 수정</C.SectionTitle>
        </C.SectionTitleWrapper>
        <div style={{padding: '2%'}}>
        {/* 모델명 & 상품명 한 줄로 배치 */}
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
        <C.RowContainer  style={{padding: '2%'}}>
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
            <C.Select
              name="options"
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
