// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/dashboard';
import SignIn from './pages/login';
import CallCenter from './pages/call-center';
import NotFound from './pages/404';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />

        <Route path='/dashboard' element={<Layout page={<Dashboard />} />} />
        <Route path='/call-center' element={<Layout page={<CallCenter />} />} />
        <Route path='*' element={<Layout page={<NotFound />} />} />
      </Routes>
    </Router>
  );
}