import { Routes, Route } from 'react-router-dom'
import HomePage from './view/page/HomePage'
import Header from './view/components/header/Header'


function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
    </>
  ) 
}

export default App
