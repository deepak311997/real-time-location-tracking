import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import App from './app/app-component';
import './app/app.scss';
import ErrorBoundary from './app/error/error-boundary';

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
