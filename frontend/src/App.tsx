import './App.css'
import { AuthProvider } from './context/AuthContext'
import RoutesApp from './routes/RoutesApp'


function App() {

  return (
    <AuthProvider>
      <RoutesApp/>
    </AuthProvider>
  )
}

export default App
