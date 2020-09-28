import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hasError: false};
    }
  
    componentDidCatch() {
      // Display fallback UI
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
          console.log("rendered");
        // You can render any custom fallback UI
        return <p style={{"color": "#000", "fontSize": "10rem"}}>エラーです</p>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;