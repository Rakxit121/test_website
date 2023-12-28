import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Registerpage from './pages/Registerpage';

// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admindashboard from './pages/AdminDashboard';
import LoginPage from './pages/Loginpage';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import UserRoutes from './protected/UserRoutes';

function App() {
  return (
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>

        <Route path = '/home' element = {<Homepage></Homepage>}/>
        <Route path = '/register' element = {<Registerpage></Registerpage>}/>
        <Route path = '/login' element = {<LoginPage></LoginPage>}/>
        

        <Route element = {<UserRoutes/>}>
          <Route path='/profile' element={<h1>profile</h1>}></Route>
          <Route path='/cart' element={<h1>cart</h1>}></Route>
          <Route path='/wishlist' element={<h1>wishlist</h1>}></Route>
        </Route>

        {/* <Route element = {<AdminRoutes/>}> */}
          <Route path = '/admin/dashboard' element = {<Admindashboard> </Admindashboard>}/>
          <Route path = '/admin/edit/:id' element={<AdminEditProduct/>}/>
        {/* </Route> */}

      </Routes>
    </Router>
  );
}

export default App;





