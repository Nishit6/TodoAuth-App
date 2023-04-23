import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './Components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Fragment>
      <ToastContainer position='top-center' />
      <Main />
    </Fragment>
  );
}

export default App;
