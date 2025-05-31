import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated leaderboard data - replace with actual API call
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Simulated API call
        const data = [
          { id: 1, name: 'Sarah J.', points: 2500, badge: 'Financial Wizard', rank: 1 },
          { id: 2, name: 'Mike R.', points: 2300, badge: 'Money Master', rank: 2 },
          { id: 3, name: 'Emma T.', points: 2100, badge: 'Savings Star', rank: 3 },
          { id: 4, name: 'James L.', points: 1900, badge: 'Budget Pro', rank: 4 },
          { id: 5, name: 'Lisa M.', points: 1800, badge: 'Investment Guru', rank: 5 },
        ];
        setLeaderboardData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#1976d2'; // Default blue
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle', color: '#FFD700' }} />
          Leaderboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See how you rank among other financial wizards!
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Rank</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Points</TableCell>
              <TableCell sx={{ color: 'white' }}>Badge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: 'action.selected' },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {user.rank <= 3 && (
                      <EmojiEvents
                        sx={{
                          color: getBadgeColor(user.rank),
                          mr: 1,
                        }}
                      />
                    )}
                    #{user.rank}
                  </Box>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.points.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={user.badge}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard; 