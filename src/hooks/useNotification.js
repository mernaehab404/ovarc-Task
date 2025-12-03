import { useState, useCallback } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({ show: false, message: "", type: "success" });
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};

