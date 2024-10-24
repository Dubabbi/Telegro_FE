import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from './image.svg';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductStyle';
import axios from 'axios';

const Headset = ({ category = 'HEADSET', page = 0, size = 12 }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/products', {
          params: { category, page, size },
        });

        console.log('API Response:', response);

        const productsData = response.data.data.products || [];

        if (Array.isArray(productsData)) {
          const sortedProducts = productsData.sort((a, b) => b.id - a.id);
          setProducts(sortedProducts);
        } else {
          throw new Error('Invalid data format: expected an array inside products');
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
      <P.Div />
      <P.Inline>
        <h1>헤드셋</h1>
        {/*<p>sorted</p>*/}
      </P.Inline>
      <P.GalleryGrid>
        {products.map((product) => (
          <P.GalleryItem key={product.id} onClick={() => navigate(`/productdetail/${product.id}`)}>
            <img src={product.coverImage || image} alt={product.name} />
            <h3>{product.productName}</h3>
            <p>{product.productModel}</p>
            <strong>{product.price}</strong>
          </P.GalleryItem>
        ))}
      </P.GalleryGrid>
      <Pagination currentPage={page} />
    </>
  );
};

export default Headset;
