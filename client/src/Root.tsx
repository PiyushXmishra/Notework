
import Home from './pages/Home'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider} from './context/auth'
import { ThemeProvider } from './context/Theme'

function Root() {
  

  return (

    <ThemeProvider>
    <AuthProvider>
      <div className='w-full h-full min-h-[calc(100vh-header-footer-height)]'>
     <Home/>
     <Outlet/>
      <Footer  />
      </div>
    </AuthProvider>
    </ThemeProvider>
 
  )
}

export default Root
