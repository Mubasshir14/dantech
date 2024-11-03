import { matchPath, Outlet, useLocation } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"

function App() {
  const location = useLocation();

  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

  // Use matchPath for dynamic routes like 'users/:id'
  const noFooterPaths = [
   '/shop',
   '/adpater',
   '/earbud',
   '/smartwatch',
   '/cover',
   '/earphone',
   '/powerbank',
   '/speaker',
   '/microphone',
   '/monitor',
   '/cmaera'
  ];

  const noFooter = noFooterPaths.some(path => location.pathname.includes(path)) ||
    matchPath({ path: '/users/:id' }, location.pathname);

  return (
    <div>
      <NavBar />
      <Outlet />
      {/* {!noFooter && <Footer />} */}
      <Footer/>
    </div>
  )
}

export default App
