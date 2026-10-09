import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6 bg-red-50/50 rounded-2xl border border-red-200 m-4">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              ⚠️
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {this.props.title || 'Something went wrong rendering this view'}
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-mono break-all">
              {this.state.error?.message || 'Unexpected application error'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#112A1F] transition-all cursor-pointer shadow-xs"
            >
              Try Again / Refresh View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
