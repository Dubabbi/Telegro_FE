import { getPaymentInfo } from './iamport';

export const verifyPayment = async (imp_uid) => {
  try {
    const paymentData = await getPaymentInfo(imp_uid);

    const {
      vbank_name,
      vbank_num,
      vbank_holder,
      vbank_date,
      buyer_name,
    } = paymentData;

    return {
      vbank_name,
      vbank_num,
      vbank_holder,
      buyer_name,
      vbank_date,
    };
  } catch (error) {
    console.error('결제 정보 조회 실패:', error);
    return null;
  }
};
