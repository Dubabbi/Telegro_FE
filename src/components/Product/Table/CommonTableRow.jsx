import React from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`
  &:hover {
    background-color: #eceaea;
    cursor: pointer;
  }
`;

const CommonTableRow = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

export default CommonTableRow;