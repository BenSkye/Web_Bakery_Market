import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css'

const theme = {
  token: {
    colorPrimary: '#2D2828',
    colorText: 'black',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
)
