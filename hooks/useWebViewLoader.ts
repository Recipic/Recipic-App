import { useState } from 'react';

export default function useWebViewLoader() {
  const [loading, setLoading] = useState(true); // 초기 로딩 상태는 true로 설정

  const handleLoadStart = () => setLoading(true);
  const handleLoadEnd = () => setLoading(false);

  return {
    loading,
    handleLoadStart,
    handleLoadEnd,
  };
}
