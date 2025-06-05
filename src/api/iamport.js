import axios from 'axios';

export const getPaymentInfo = async (impUid) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('토큰이 존재하지 않습니다');
  }

  const { data } = await axios.post(
    `https://api.telegro.kr/api/payments/${impUid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data.data;
};
