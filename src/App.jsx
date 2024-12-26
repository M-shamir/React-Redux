import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../src/Pages/Home/Home'
import Login from '../src/Pages/Login/Login'
import Signup from '../src/Pages/Signup/Signup'
import Admin from '../src/Pages/Admin-login/Admin_login'
import Admin_home from '../src/Pages/Admin-Home/Admin_home'
import EditUser from '../src/Pages/UserEdit/EditUser'


function App() {


  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/admin-login' element={<Admin/>}/>
      <Route path='/admin-home' element={<Admin_home/>}/>
      <Route path="/admin/users/edit/:userId" element={<EditUser />} />

      </Routes>
      
    </Router>
    </>
  )
}

export default App
