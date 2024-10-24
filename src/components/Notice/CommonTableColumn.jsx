import React from 'react';
import * as N from './NoticeStyle';

const CommonTableColumn = ({ children }) => {
  return <N.TableColumn>{children}</N.TableColumn>;
};

export default CommonTableColumn;
