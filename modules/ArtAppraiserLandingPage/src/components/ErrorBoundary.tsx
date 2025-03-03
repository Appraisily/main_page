import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center p-6">
            <p className="text-gray-600">
              Something went wrong loading this section. Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}