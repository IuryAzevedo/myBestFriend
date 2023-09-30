import './App.css'
import { AuthProvider } from './context/AuthContext'
import RoutesApp from './routes/RoutesApp'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <AuthProvider>
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </AuthProvider>
  )
}

export default App
