import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/shantanu-bico/bico-staking-ethereum',
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider value={client}>
          <App />
      </Provider>
  </React.StrictMode>
)
