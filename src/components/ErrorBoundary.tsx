import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0E0D0D] p-4">
          <div className="max-w-md w-full bg-[#242424] border border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <div className="text-sm text-gray-300 mb-4">
              <p className="mb-2">An error occurred while loading the application:</p>
              <pre className="bg-[#0E0D0D] p-3 rounded text-red-300 text-xs overflow-auto">
                {this.state.error?.message || 'Unknown error'}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 bg-[#C9FF3B] text-black rounded-lg hover:bg-[#B3E237] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 