import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

export const getCategoryBackground = (category) => {
    switch (category) {
      case 'electronics':
        return '#EAEDF7';
      case 'clothing':
        return '#F0F8E2';
      case 'furniture':
        return '#E6F0F8';
      default:
        return '#F3F3F3';
    }
  };

  export const ProductPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    padding: 2%;
    margin-bottom: 2%;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-radius: 15px;
    @media (max-width: 780px) {
      width: 90%;
      margin: 0 auto;
    }
  `;
  
  export const StickyBarWrapper = styled.div`
    position: sticky;
    top: 180px; 
    max-width: 250px;
    justify-content: center;
    width: 250px;
    margin-left: 20px;
    padding: 2%;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    overflow: auto;
    border-radius: 15px;
    @media (max-width: 780px) {
      max-width: 90%;
      width: 90%;
      margin: 0 auto;
      position: static;
    }
  `;
  
  export const ProductDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 40px;
    @media (max-width: 780px) {
      flex-direction: column;
    }
  `;
  
  export const ProductInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
  `;
  
  export const ModalImage = styled.img`
    width: 80%;
    height: auto;
    max-height: 70vh;
    height: 70vh;
    cursor: pointer;
    object-fit: contain;
    margin-top: 125px;
    @media(max-width: 780px){
      margin: auto;
    }
`;

  export const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 2rem;
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  `;
  
  export const LeftArrow = styled(ArrowButton)`
    left: 5%;
  `;
  
  export const RightArrow = styled(ArrowButton)`
    right: 5%;
  `;
  
  export const ProductImage = styled.img`
    width: 250px;
    height: auto;
    margin-right: 30px;
    @media (max-width: 780px) {
      width: 100px;
    }
  `;
  
  export const ProductTitle = styled.h2`
    font-weight: bold;
    font-size: 2rem;
    color: #303972;
    margin-bottom: 10px;
  `;
  
  export const ProductSubtitle = styled.h3`
    font-weight: bold;
    font-size: 1.6rem;
    color: #6B6B6B;
    margin-bottom: 35%;
  `;
  
  export const OptionSelectWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
  
  export const Select = styled.select`
    padding: 10px;
    width: 200px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
  `;
  
  export const QuantityInput = styled.input`
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 5px;
    width: 200px;
    text-align: left;
    border: 1px solid #d3d3d3;
  `;
  
  export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2%;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  `;
  
  export const BuyButton = styled.button`
    padding: 7px 17px;
    background-color: rgba(77, 68, 181, 0.3);
    color: #4D44B5;
    white-space: nowrap;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: bold;
    width: 100px;
    margin-bottom: 10px;
    &:hover {
      background-color: rgba(77, 68, 181, 0.6);
      color: #fff;
    }
  `;
  
  export const AdditionalImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 5px;
    column-gap: 10px;
    padding-left: 20px;
    align-items: center;
    justify-items: center;
    height: 29.5vh;
    margin: 5% 0;
    @media (max-width: 780px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `;
  
  export const AdditionalImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #d3d3d3;
    object-fit: cover; 
  `;
  
  export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 5%;
    padding-top: 5%;
  `;
  
  export const DescriptionTitle = styled.h4`
    font-size: 1.6rem;
    color: #303972;
    font-weight: bold;
    margin-bottom: 10px;
    white-space: nowrap;
  `;
  
  export const DescriptionList = styled.ul`
    list-style-type: none;
    margin-top: 2%;
    padding: 0;
    font-size: 1.4rem;
    line-height: 1.7;
    color: #444;
    position: relative;
  `;
  
  export const DescriptionItem = styled.li`
    margin-bottom: 5px;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    img {
      width: 100%;
      margin: 0 auto;
      height: auto;
      object-fit: contain;
    }
  `;
  
  export const CategoryTag = styled.div`
    background-color: ${(props) => getCategoryBackground(props.category)};
    max-width: 170px;
    border-radius: 5px;
    padding: 2px 8px;
    margin-top: 5px;
    margin-left: 12px;
    white-space: nowrap;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #303972;
  `;
  
  export const Div = styled.div`
    height: 10px;
    @media(max-width: 780px){
      height: 100px;
    }
  `;
  
  export const MainWrapper = styled.div`
    display: flex;
    padding-top: 160px;
    justify-content: space-around;
    align-items: flex-start;
    width: 90%;
    margin-left: 10%;
    @media (max-width: 780px) {
      flex-direction: column;
      margin: 0 auto;
      gap: 15px;
      padding-top: 10%;
    }
  `;
  
  export const PriceTag = styled.span`
    padding: 5px 15px;
    background: rgba(77, 68, 181, 0.2);
    border-radius: 1rem;
    color: #444;
    font-weight: semibold;
    font-size: 1.3rem;
  `;
  
  export const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? '#4D44B5' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#4D44B5')};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-bottom: ${({ isActive }) => (isActive ? '3px solid #4D44B5' : 'none')};
  &:hover {
    color: #4D44B5;
    background: ${({ isActive }) => (isActive ? '#4D44B5' : '#f0f0f0')};
  }
`;

export const ShippingTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const ShippingRow = styled.div`
  display: table-row;
`;

export const ShippingCell = styled.div`
  display: table-cell;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 1rem;
  text-align: left;
  vertical-align: top;
  &:first-child {
    background-color: #f9f9f9;
    font-weight: bold;
    width: 40%;
  }
`;

export const OrderPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 780px) {
    flex-direction: column;
    width: 90%;
  }
`;

export const NoticeBox = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 0px 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  width: 100%;

  & h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  & p {
    margin: 5px 0;
  }

  & span.highlight {
    font-weight: bold;
    color: #333;
  }

  & div.highlight-box {
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
`;

export const LeftSection = styled.div`
  width: 40%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;


export const RightSection = styled.div`
  width: 60%;
  padding: 20px;
  @media (max-width: 780px) {
    width: 100%;
  }
`;