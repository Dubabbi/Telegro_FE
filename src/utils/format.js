export const formatNumber = (value) =>
  value !== undefined && value !== null
    ? Number(value).toLocaleString()
    : '0';

export const formatDate = (input) => {
  if (!input) return '정보 없음';

  const date = new Date(input);
  if (isNaN(date.getTime())) return '유효하지 않은 날짜';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

export const toKoreanTime = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  return utcDate.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const raw = 'Fri Jun 06 14:59:59 UTC 2025';
console.log(toKoreanTime(raw));
// 출력: 2025년 6월 6일 금요일 오후 11:59:59

