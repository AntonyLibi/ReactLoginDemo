import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SignIn } from './Components/SignIn/SignIn';
import { SignUp } from './Components/SignUp/SignUp';
import { ForgotPassword } from './Components/ForgotPassword/ForgotPassword';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';
import { Home } from './Components/Home/Home';
import { BookDetails } from './Components/Home/BookDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/BookDetails" element={<BookDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 