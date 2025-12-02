import { useEffect } from 'react';

import Footer from './Footer.jsx';
import NavBar from './NavBar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice.js'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) =>store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching: ", error);
    }
  }

  useEffect(() => {
    if(!userData){
      fetchUser();
    }
  }, []);

  return (
  <div className="min-h-screen flex flex-col">
    <NavBar />

    <div className="flex-1">
      <Outlet />
    </div>

    <Footer />
  </div>
)

}

export default Body