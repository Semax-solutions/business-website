import { Routes, Route } from 'react-router-dom'
import HomePage from './view/page/HomePage'
import Header from './view/components/header/Header'
import Footer from './view/components/footer/Footer'
import TestPage from './view/page/TestPage'
import TriangleTest from './view/page/TriangleTest'


function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/triangle' element={<TriangleTest />} />
        </Routes>
      <Footer/>
    </>
  ) 
}

export default App
