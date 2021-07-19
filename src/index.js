import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import ErrorBoundary from "./ErrorBoundary"

import App from './App'
//import * as serviceWorker from './serviceWorker'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

//serviceWorker.unregister()