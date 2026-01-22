import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PreRegister from './components/PreRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presignup" element={<PreRegister />} />
        <Route path="/YoyoLandingPage" element={<Home />} />
        <Route path="/YoyoLandingPage/presignup" element={<PreRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
