import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Notes from './pages/Notes'
import Login from './pages/Login'
import FetchNotes from './pages/FetchNotes'
import Dashboard from './pages/Dashboard'
import NoteDetails from './pages/NoteDetails'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Notes' element={<Notes />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/FetchNotes' element={<FetchNotes />} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/NoteDetails' element={ <NoteDetails />} />
       </Routes>
    </Router>
  )
}

export default App
