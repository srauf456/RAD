import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Content from './components/Content'
import { useDashboardContext } from './context/DashboardContext'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'

function App() {
 const {isLoggedIn, theme} = useDashboardContext();


  return (
  <div className={`flex min-h-screen w-full overflow-x-hidden ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
 
<Sidebar/>
 <main className='flex-1 md:ml-64'>
<Header /> 

      <Routes>
      <Route path='/dashboard' element={<ProtectedRoute><Content><Dashboard/></Content></ProtectedRoute>}/>
     <Route path='/analytics' element={<ProtectedRoute><Content ><Analytics/></Content></ProtectedRoute>}/>
      <Route path='/login' element={isLoggedIn? <Navigate to="/dashboard"/> : <Content><Login/></Content>}/>
       <Route path='/settings' element={<ProtectedRoute><Content><Settings/></Content></ProtectedRoute>}/>
        <Route path='/users' element={<ProtectedRoute allowedRoles={['admin']}><Content><Users/></Content></ProtectedRoute>}/>
    </Routes>
</main> 
    </div>
    
   
  )
}

export default App;
