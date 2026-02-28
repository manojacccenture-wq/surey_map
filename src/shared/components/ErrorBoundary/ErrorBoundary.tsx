import React, { ErrorInfo, ReactNode } from "react";

interface LogService {
  captureException?: (
    error: Error,
    context?: {
      contexts?: {
        react?: {
          componentStack?: string;
        };
      };
    }
  ) => void;
}

interface FallbackProps {
  error: Error | null;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  logService?: LogService;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.logError(error, errorInfo);
  }

  logError = (error: Error, errorInfo: ErrorInfo) => {
    const logService = this.props.logService;

    if (logService && typeof logService.captureException === "function") {
      logService.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  };

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleNavigateDashboard = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      const CustomFallback = this.props.fallback;

      if (CustomFallback) {
        return (
          <CustomFallback
            error={this.state.error}
            resetError={this.handleReset}
          />
        );
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Something Went Wrong
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                We encountered an unexpected error. Please try again or navigate
                back to the dashboard.
              </p>

              {process.env.NODE_ENV === "development" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 mb-8 text-left">
                  <p className="text-sm font-semibold text-red-900 mb-2">
                    Error Details (Development Only)
                  </p>
                  <p className="text-xs text-red-700 font-mono break-words">
                    {this.state.error?.toString()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>

              <button
                onClick={this.handleNavigateDashboard}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
