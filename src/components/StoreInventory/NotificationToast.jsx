import React from "react";

const NotificationToast = ({ notification, onClose }) => {
  if (!notification.show) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
        notification.type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      } animate-slide-in`}
    >
      <span className="font-medium">{notification.message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75">
        ×
      </button>
    </div>
  );
};

export default NotificationToast;
