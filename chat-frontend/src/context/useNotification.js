// src/context/useNotification.js
import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

/**
 * useNotification
 * - NotificationContext의 값을 쉽게 사용하기 위한 커스텀 훅
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification은 NotificationProvider 내부에서만 사용해야 합니다."
    );
  }
  return context;
};
