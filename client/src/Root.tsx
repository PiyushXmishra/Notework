
import Home from './pages/Home'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider} from './context/auth'
import { ThemeProvider } from './context/Theme'

function Root() {
  

  return (

    <ThemeProvider>
    <AuthProvider>
     <Home/>
     <Outlet/>
      <Footer />
    </AuthProvider>
    </ThemeProvider>
 
  )
}

export default Root
