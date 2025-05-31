import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  EmojiEvents,
  AccountBalance,
  Receipt,
  TrendingUp,
  Savings,
  Person,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = false; // Replace with actual auth state
  const userType = 'adult'; // Replace with actual user type state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: `/${userType}-dashboard` },
      { text: 'Leaderboard', icon: <EmojiEvents />, path: `/${userType}-dashboard/leaderboard` },
    ];

    const userSpecificItems = {
      child: [
        { text: 'Savings', icon: <Savings />, path: '/child-dashboard/savings' },
      ],
      teen: [
        { text: 'Budget', icon: <AccountBalance />, path: '/teen-dashboard/budget' },
        { text: 'Expenses', icon: <Receipt />, path: '/teen-dashboard/expenses' },
        { text: 'Savings', icon: <Savings />, path: '/teen-dashboard/savings' },
      ],
      adult: [
        { text: 'Budget', icon: <AccountBalance />, path: '/adult-dashboard/budget' },
        { text: 'Expenses', icon: <Receipt />, path: '/adult-dashboard/expenses' },
        { text: 'Investments', icon: <TrendingUp />, path: '/adult-dashboard/investments' },
        { text: 'Savings', icon: <Savings />, path: '/adult-dashboard/savings' },
      ],
    };

    return [...baseItems, ...(userSpecificItems[userType] || [])];
  };

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {getMenuItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MoneyMinds
          </Typography>
          {!isAuthenticated ? (
            <Box>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Box>
          ) : (
            <IconButton color="inherit">
              <Person />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout; 