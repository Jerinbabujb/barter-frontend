import { useContext } from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/homePage'
import Profile from './pages/profile'
import AddProduct from './pages/addProduct'
import LoginPage from './pages/loginPage'
import { AuthContext } from '../context/userContext'
import ChatPage from './pages/chatPage'

function App() {
 
 
  const {authUser}=useContext(AuthContext);
return(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
    <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
    <Route path='/new-product' element={authUser?<AddProduct/>:<Navigate to='/login'/>}/>
    <Route path='/chat' element={<ChatPage/>}/>
    <Route path='/login' element={!authUser?<LoginPage/> :<Navigate to="/"/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App
