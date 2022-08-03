import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './layout/Header/Header';
import Main from'./layout/Main/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <Main />
  </>
);

