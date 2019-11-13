import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div style={{color: 'red', fontWeight: 'bolder'}}>Something went wrong: {this.state.error.message}</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
