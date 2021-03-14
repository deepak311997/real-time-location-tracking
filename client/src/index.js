import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import App from './app/app-component';
import './app/app.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
