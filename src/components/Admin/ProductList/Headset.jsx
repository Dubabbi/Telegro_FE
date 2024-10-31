import React, {useState, useEffect} from 'react';
import image from './image.svg';
import { useNavigate } from 'react-router-dom';
import * as N from '../Notice/NoticeStyle';
import editpost from '/src/assets/icon/Admin/editpost.svg';
import Pagination from '../../Pagination/Pagination';
import * as P from './ProductStyle';
import axios from 'axios';


const Headset = ({ category = 'HEADSET', initialPage = 1, size = 12 }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/products', {
          params: { category, page: currentPage - 1, size },
        });
  
        console.log('API Response:', response);
  
        const productsData = response.data.data.products;
        const productsArray = Array.isArray(productsData) ? productsData : Object.values(productsData);
        const sortedProducts = productsArray.sort((a, b) => b.id - a.id);
  
        console.log('Sorted Products before setting state:', sortedProducts);
  
        setProducts(sortedProducts);
  
        setTimeout(() => {
          console.log('Products after state update:', products);
        }, 0);
  
        setTotalPages(response.data.data.totalPage); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);
      }
    };
  
    fetchProducts();
  }, [category, currentPage, size]);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  if (error) {
    return <div>{error}</div>;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
}

  return (
    <>
    <P.PageContainer>
    <P.Inline style={{marginLeft: '4%', width: '88%', marginBottom: '2%', border: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
      <h1>헤드셋</h1>
      <N.Add  onClick={() => navigate('/admin/productcreate')} src={editpost} />
      </P.Inline>
      <P.GalleryGrid>
        {products.map((product) => (
          <P.GalleryItem key={product.id} onClick={() => navigate(`/admin/adminproductdetail/${product.id}`)}>
            <P.ProductImage src={product.coverImage || image} alt={product.name} />
            <P.ProductInfo>
            <h3>{product.productName}</h3>
            <p>{product.productModel}</p>
            <strong>{formatPrice(product.price)}</strong>
            </P.ProductInfo>
          </P.GalleryItem>
        ))}
      </P.GalleryGrid>
    </P.PageContainer>
    <P.Pagediv>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </P.Pagediv>
    </>
  );
};

export default Headset;
