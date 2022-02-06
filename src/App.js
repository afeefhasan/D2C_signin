import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route , Routes} from 'react-router-dom';
import Login from './SignIn';
import Dashboard from './Home';
import Register from './Register';
function App() {
  let  path = window.location.pathname;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
