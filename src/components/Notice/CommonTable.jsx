import React from 'react';
import * as N from './NoticeStyle';

const CommonTable = ({ headersName, children }) => {
  return (
    <N.Table>
      <thead>
        <tr>
          {headersName.map((item, index) => (
            <N.TableHeaderColumn key={index}>{item}</N.TableHeaderColumn>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </N.Table>
  );
};

export default CommonTable;

