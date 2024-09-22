import React from 'react';
import styled from 'styled-components';

const TableColumn = styled.td`
  padding: 1.2% 1%;
  font-size: 1.4rem;
  @media(max-width: 800px){
    font-size: 1.1rem;
    padding: 2.2% 1%;
  }
`;

const CommonTableColumn = ({ children }) => {
  return <TableColumn>{children}</TableColumn>;
};

export default CommonTableColumn;