import styled from 'styled-components';

export const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
padding-top: 6.5%;
height: 100vh;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
@media(max-width: 780px){
  padding-top: 3%;
}
`;

export const ModalContent = styled.div`
position: relative;
min-width: 400px;
min-height: 400px;
background: white;
border-radius: 10px;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
@media(max-width: 1024px){
  height: 40vh;
}
`;

export const CloseButton = styled.button`
position: absolute;
cursor: pointer;
top: 7%;
right: 5%;
img {
  width: 25px;
  height: 25px;
}
`;

export const Title = styled.h1`
font-size: 1.7rem;
color: #333333;
font-weight: bold;
`;

export const InputField = styled.input`
width: 90%;
padding: 10px;
height: 40px;
border: 1.5px solid #cccccc;
border-radius: 5px;

&:focus {
  border: 1.5px solid #777777;
}
`;

export const Button = styled.button`
padding: 10px 20px;
margin: 5px;
border-radius: 20px;
border: none;
background-color: #ACAACC;
color: white;
cursor: pointer;
width: 110px;

&:hover {
   background-color: hsl(240, 8%, 70%);
}
`;

export const SearchButton = styled.div`
padding: 10px;
height: 40px;
border: 1.5px solid #cccccc;
border-radius: 5px;
background-color: #ACAACC;
color: white;
cursor: pointer;
width: 25%;
&:hover {
   background-color: hsl(240, 8%, 70%);
}
`;

export const CheckboxContainer = styled.div`
display: flex;
align-items: center;
white-space: nowrap;
`;

export const CheckboxLabel = styled.label`
font-size: 1.5rem;
cursor: pointer;
  @media(max-width: 800px){
    font-size: 1.1rem;
  }
`;

export const Checkbox = styled.input`
margin-right: 6px;
margin-top: 6px;
width: 23px;
border: 1px solid #ddd;
height: 23px;
border-radius: 8px;
&:checked {
  background-color: #ACAACC;
}
@media(max-width: 800px){
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
`;
