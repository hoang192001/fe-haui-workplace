import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import { BrowserRouter } from 'react-router-dom'
import { store } from '~/store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import { ContextProvider } from './context/videoContext'

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
      <ToastContainer />
    </BrowserRouter>
  </Provider>,
)
