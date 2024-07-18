import Detailpage from './components/detailpage.jsx'
import Homepage from './components/homepage.jsx'
import './App.css'
import Listpage from './components/listpage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Homepage/>}></Route>
            <Route path='/list' element={<Listpage/>}></Route>
            <Route path='/detail/:id' element={<Detailpage/>}></Route>
          </Routes>
        </div >
      </Router>
  )
}

export default App
