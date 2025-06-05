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

export const formatVbankDate = (rawDate) => {
  if (!rawDate) return '날짜 정보 없음';

  const parsed = new Date(rawDate);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // 수동 파싱 (예: "Fri Jun 06 14:59:59 UTC 2025")
  const parts = rawDate.split(' ');
  if (parts.length >= 6) {
    // Jun 06, 2025 14:59
    return `${parts[1]} ${parts[2]}, ${parts[5]} ${parts[3].slice(0, 5)}`;
  }

  return '날짜 형식 오류';
};
