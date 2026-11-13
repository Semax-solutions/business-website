import { Routes, Route } from 'react-router-dom'
import HomePage from './view/page/HomePage'
import ProductsPage from './view/page/ProductsPage'
import Header from './view/components/header/Header'
import Footer from './view/components/footer/Footer'


function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
