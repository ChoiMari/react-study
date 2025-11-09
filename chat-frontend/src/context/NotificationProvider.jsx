// src/context/NotificationProvider.jsx
import { useState, useCallback } from "react";
import { NotificationContext } from "./NotificationContext";

/**
 * NotificationProvider
 * - 알림 상태와 제어 함수를 전역으로 제공하는 Provider 컴포넌트
 */
export const NotificationProvider = ({ children }) => {
  const [notifyCount, setNotifyCount] = useState(0);

  // 알림 개수 증가
  const increase = useCallback(() => setNotifyCount((prev) => prev + 1), []);

  // 알림 개수 감소 (0 이하로는 내려가지 않게)
  const decrease = useCallback(
    () => setNotifyCount((prev) => Math.max(0, prev - 1)),
    []
  );

  // 알림 개수 초기화
  const reset = useCallback(() => setNotifyCount(0), []);

  // 외부에서 특정 값으로 강제 설정
  const setCount = useCallback((count) => setNotifyCount(count), []);

  return (
    <NotificationContext.Provider
      value={{ notifyCount, increase, decrease, reset, setCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
