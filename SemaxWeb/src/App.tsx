import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import HomePage from './view/page/HomePage'
import Header from './view/components/header/Header'
import Footer from './view/components/footer/Footer'
import classes from './App.module.css'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className={classes.skipLink} href='#main'>Skip to content</a>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* old links point at /home; unknown urls get the homepage instead of an empty page */}
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
      <Footer />
    </MotionConfig>
  )
}

export default App
