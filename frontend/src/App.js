// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/dashboard';
import SignIn from './pages/login';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/dashboard' element={<Layout page={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}