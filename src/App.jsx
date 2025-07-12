import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage'
import Profile from './pages/profile'
import AddProduct from './pages/addProduct'

function App() {
return(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/new-product' element={<AddProduct/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App
