import Footer from './Footer.jsx';
import NavBar from './NavBar.jsx';
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body