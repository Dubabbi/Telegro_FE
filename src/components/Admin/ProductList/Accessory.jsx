import React, {useState, useEffect} from 'react';
import image from './image.svg';
import { useNavigate } from 'react-router-dom';
import * as N from '../Notice/NoticeStyle';
import editpost from '/src/assets/icon/Admin/editpost.svg';
import Pagination from '../../Pagination/Pagination';
import * as P from './ProductStyle';
import axios from 'axios';


const Accessory = ({ category = 'ACCESSORY', page = 0, size = 12 }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/products', {
          params: { category, page, size },
        });
  
        console.log('API Response:', response); // 응답 데이터 확인
  
        if (response.status===200) {
          setProducts(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);
      }
    };
  
    fetchProducts();
  }, [category, page, size]);
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <P.PageContainer>
    <P.Inline style={{marginLeft: '4%', width: '88%', marginBottom: '2%', border: 'none'}}>
      <h1>헤드셋</h1>
      <p>Sort by: Most Popular</p>
      </P.Inline>
      <P.GalleryGrid>
        {products.map((product) => (
          <P.GalleryItem key={product.id} onClick={() => navigate(`/admin/adminproductdetail/${product.id}`)}>
            <P.ProductImage src={product.coverImage || image} alt={product.name} />
            <P.ProductInfo>
            <h3>{product.productName}</h3>
            <p>{product.productModel}</p>
            <strong>{product.price}</strong>
            </P.ProductInfo>
          </P.GalleryItem>
        ))}
      </P.GalleryGrid>
      <N.Add  onClick={() => navigate('/admin/productcreate')} src={editpost} />
    </P.PageContainer>
    <P.Pagediv>
      <Pagination currentPage={page} />
      </P.Pagediv>
    </>
  );
};

export default Accessory;
