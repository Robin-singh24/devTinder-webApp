import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Body from './Body.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path= '/' element={<Body />}>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <NavBar />
      <h1>Hello World!!!</h1> */}
    </>
  )
}

export default App
