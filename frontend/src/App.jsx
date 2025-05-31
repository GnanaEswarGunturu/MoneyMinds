import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/landingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ChildDashboard from './pages/Dashboard/ChildDashboard';
import TeenDashboard from './pages/dashboard/TeenDashboard';
import AdultDashboard from './pages/Dashboard/AdultDashboard';
import Leaderboard from './pages/leaderboard';
import Budget from './pages/budget';
import Expenses from './pages/expenses';
import Savings from './pages/savings';
// import Invest from './pages/Invest';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Child Routes */}
            <Route path="/child-dashboard" element={<ChildDashboard />} />
            <Route path="/child-dashboard/leaderboard" element={<Leaderboard />} />
            <Route path="/child-dashboard/savings" element={<Savings />} />
            
            {/* Teen Routes */}
            <Route path="/teen-dashboard" element={<TeenDashboard />} />
            <Route path="/teen-dashboard/leaderboard" element={<Leaderboard />} />
            <Route path="/teen-dashboard/budget" element={<Budget />} />
            <Route path="/teen-dashboard/expenses" element={<Expenses />} />
            <Route path="/teen-dashboard/savings" element={<Savings />} />
            
            {/* Adult Routes */}
            <Route path="/adult-dashboard" element={<AdultDashboard />} />
            <Route path="/adult-dashboard/leaderboard" element={<Leaderboard />} />
            <Route path="/adult-dashboard/budget" element={<Budget />} />
            <Route path="/adult-dashboard/expenses" element={<Expenses />} />
            <Route path="/adult-dashboard/investments" element={<Invest/>} />
            <Route path="/adult-dashboard/savings" element={<Savings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
