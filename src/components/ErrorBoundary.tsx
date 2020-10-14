import React from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";

const PageHeader = loadable(() => import("./PageHeader"));

interface IState {
  hasError?: boolean;
}

interface Props {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state["hasError"]) {
      // You can render any custom fallback UI
      return (
        <>
          <PageHeader title="エラー" />
          <div>
            <h1 className="err-title">エラーです</h1>
            <p className="err-text">お手数ですが、最初からやり直してください</p>
            <Link to="/" className="btn-em">
              トップへ戻る
            </Link>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
