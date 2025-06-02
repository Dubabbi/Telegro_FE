import axios from 'axios';

const IMP_BASE_URL = 'https://thingproxy.freeboard.io/fetch/https://api.iamport.kr';

/**
 * 아임포트 액세스 토큰 발급
 */
export const getIamportToken = async () => {
  const { data } = await axios.post(`${IMP_BASE_URL}/users/getToken`, {
    imp_key: import.meta.env.VITE_IAMPORT_API_KEY,
    imp_secret: import.meta.env.VITE_IAMPORT_API_SECRET,
  });

  return data.response.access_token;
};

/**
 * imp_uid로 결제 정보 조회
 */
export const getPaymentInfo = async (impUid) => {
  const accessToken = await getIamportToken();

  const { data } = await axios.get(`${IMP_BASE_URL}/payments/${impUid}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return data.response;
};
