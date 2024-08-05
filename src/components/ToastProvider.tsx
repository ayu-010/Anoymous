// components/ToastProvider.tsx
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right" // Adjust position as needed
      reverseOrder={false}
      toastOptions={{
        // Customize default options
        duration: 5000,
        style: {
          fontSize: '14px',
        },
      }}
    />
  );
};

export default ToastProvider;
