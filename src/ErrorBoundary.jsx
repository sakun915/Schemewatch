import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-medium text-red-800">Something went wrong</h2>
          <p className="text-red-600">{this.state.error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;