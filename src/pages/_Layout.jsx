import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

// custom css
import "./custom.css";

function Layout({ children }) {

  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout