import React from 'react'
import AppRoute from './routes/AppRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <AppRoute />
      </div>
    </>
  )
}

export default App