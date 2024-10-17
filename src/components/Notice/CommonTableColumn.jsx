import React from 'react';
import styled from 'styled-components';


export const TableColumn = styled.td`
  padding: 1.7% 1.7%;
  font-family: inter;
  font-size: 1.3rem;
  border-right: 1px solid #ccc;
  &:last-child {
    border-right: none;
  }
`;

const CommonTableColumn = ({ children }) => {
  return <TableColumn>{children}</TableColumn>;
};

export default CommonTableColumn;