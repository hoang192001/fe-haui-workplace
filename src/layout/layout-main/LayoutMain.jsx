import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/containers/footer/Footer'
import Header from '~/containers/header/Header'
import './main.scss'
import PostProvider from '~/context/postContext'

const LayoutMain = () => {
  return (
    <PostProvider>
      <div className="main">
        <Header />
        <div className="pt-[60px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </PostProvider>
  )
}

export default LayoutMain
