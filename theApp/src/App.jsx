import React from 'react';
import { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Settings from '../pages/Settings.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
)

function App({routes}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;