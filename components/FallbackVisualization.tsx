import React from 'react';

interface FallbackVisualizationProps {
  error?: string;
  visualizationType?: string;
  onRetry?: () => void;
}

export const FallbackVisualization: React.FC<FallbackVisualizationProps> = ({
  error,
  visualizationType = 'visualization',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 p-8">
      <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-200">
        <i className="fa-solid fa-chart-simple text-white text-2xl"></i>
      </div>
      <h2 className="text-xl font-bold text-amber-700 mb-2">Visualization Unavailable</h2>
      <p className="text-amber-600 text-sm mb-6 text-center max-w-md">
        {error || `The ${visualizationType} visualization could not be rendered. This may be due to invalid data or a temporary issue.`}
      </p>
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-200"
          >
            Try Again
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-white text-amber-700 border-2 border-amber-300 rounded-xl text-sm font-bold hover:bg-amber-50 transition-all"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message = 'Loading visualization...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <h2 className="text-xl font-bold text-blue-700 mb-2">Loading</h2>
      <p className="text-blue-600 text-sm text-center max-w-md">{message}</p>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  message = 'There is no data to visualize at this time.',
  icon = 'fa-database',
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-slate-50 to-gray-50 rounded-3xl border-2 border-slate-200 p-8">
      <div className="w-16 h-16 bg-slate-300 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-slate-200">
        <i className={`fa-solid ${icon} text-white text-2xl`}></i>
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">{title}</h2>
      <p className="text-slate-600 text-sm mb-6 text-center max-w-md">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-slate-700 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default FallbackVisualization;
