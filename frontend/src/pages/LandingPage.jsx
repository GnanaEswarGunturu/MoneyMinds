import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  AccountBalance,
  School,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';

const features = [
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: 'Financial Education',
    description: 'Learn essential financial concepts through interactive lessons and real-world examples.',
  },
  {
    icon: <AccountBalance sx={{ fontSize: 40 }} />,
    title: 'Budget Management',
    description: 'Track your income and expenses with easy-to-use budgeting tools.',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Investment Simulation',
    description: 'Practice investment strategies in a risk-free environment.',
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 40 }} />,
    title: 'Rewards & Achievements',
    description: 'Earn points and compete on the leaderboard as you learn and grow.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to MoneyMinds
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Journey to Financial Literacy Starts Here
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Your Financial Journey?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Join Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 