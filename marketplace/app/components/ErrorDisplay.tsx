import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-700 text-white p-6 rounded-lg flex flex-col items-center justify-center space-y-4">
      <FiAlertTriangle size={48} className="text-red-500" />
      <div className="text-center">
        <h3 className="font-bold text-xl mb-2">Error</h3>
        <p>{message}</p>
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2"
        >
          <FiRefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay; 