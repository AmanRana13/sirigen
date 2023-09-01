import React, {Component} from 'react';
import Box from '@mui/material/Box';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  {hasError: boolean}
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    // eslint-disable-next-line no-console
    console.log('errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          minHeight={320}
          height='100%'
          display='flex'
          justifyContent='center'
          justifyItems='center'
          alignItems='center'>
          <h1>Something went wrong.</h1>
        </Box>
      );
    }

    return this.props.children;
  }
}

export {ErrorBoundary};
