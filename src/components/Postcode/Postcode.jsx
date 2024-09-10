import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const Postcode = ({ onComplete }) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    const fullAddress = data.roadAddress;
    const zonecode = data.zonecode;

    onComplete({ fullAddress, zonecode }); // 우편번호와 주소를 부모 컴포넌트로 전달
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" onClick={handleClick}>
      주소 검색
    </button>
  );
};
