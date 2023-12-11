import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import MainPage from './pages/MainPage'
function App() {
  return (
    <Router>
      <Routes>        
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/mainAtm" element={<MainPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
