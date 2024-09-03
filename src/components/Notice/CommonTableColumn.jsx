import React from 'react';
import styled from 'styled-components';

const TableColumn = styled.td`
  padding: 1.2% 1%;
  font-size: 1.4rem;
`;

const CommonTableColumn = ({ children }) => {
  return <TableColumn>{children}</TableColumn>;
};

export default CommonTableColumn;