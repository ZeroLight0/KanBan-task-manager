import { useState, useEffect } from "react";

function ErrorNotification({
  message,
  type = "error",
  onClose,
  duration = 5000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-blue-500";
  const icon = type === "error" ? "❌" : type === "success" ? "✅" : "ℹ️";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md z-50 animate-slide-in`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-semibold">
          {type === "error" ? "Error" : type === "success" ? "Success" : "Info"}
        </p>
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-4 text-white hover:opacity-80 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorNotification;
