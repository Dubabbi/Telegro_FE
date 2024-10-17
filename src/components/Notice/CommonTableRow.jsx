import React from 'react';
import styled from 'styled-components';


export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:nth-child(odd) {
    background-color: #FCFCFD; 
    &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:nth-child(even) {
    background-color: #FFFFFF; 
        &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;
const CommonTableRow = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

export default CommonTableRow;