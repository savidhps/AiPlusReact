import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import FeedbackForm from './pages/FeedBackForm';
import AdminDashboard from './pages/AdminDashboard';

function App(){
  return (
    <BrowserRouter>
      <div style={{maxWidth:900, margin:'24px auto', padding:20}}>
        <nav style={{display:'flex',gap:12}}>
          <Link to="/">SignIn</Link>
          <Link to="/signup">SignUp</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/feedback" element={<FeedbackForm/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
