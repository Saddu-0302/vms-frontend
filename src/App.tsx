import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserManagment from './components/UserManagment'
import Dashboard from './components/Dashboard'
import CreateVisitor from './components/CreateVisitor'
import AllVisitor from './components/AllVisitor'
import PendingVisitor from './components/PendingVisitor'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/create-visitor' element={<CreateVisitor />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/user-managment' element={<UserManagment />} />
          <Route path='/visitors' element={<AllVisitor />} />
          <Route path='/pending' element={<PendingVisitor />} />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
