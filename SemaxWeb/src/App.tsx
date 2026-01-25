import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './view/page/HomePage'


function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
    </Router>
  )
}

export default App
