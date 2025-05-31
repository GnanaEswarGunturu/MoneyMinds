import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Savings as SavingsIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  EmojiEvents,
} from '@mui/icons-material';

const Savings = () => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
  });

  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchSavingsGoals = async () => {
      // Simulated API response
      const data = [
        {
          id: 1,
          name: 'New Bike',
          targetAmount: 500,
          currentAmount: 350,
          deadline: '2024-08-30',
        },
        {
          id: 2,
          name: 'Gaming Console',
          targetAmount: 400,
          currentAmount: 200,
          deadline: '2024-09-15',
        },
        {
          id: 3,
          name: 'Emergency Fund',
          targetAmount: 1000,
          currentAmount: 800,
          deadline: '2024-12-31',
        },
      ];
      setSavingsGoals(data);
    };

    fetchSavingsGoals();
  }, []);

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount) {
      const goal = {
        id: savingsGoals.length + 1,
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
      };
      setSavingsGoals([...savingsGoals, goal]);
      setNewGoal({
        name: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteGoal = (id) => {
    setSavingsGoals(savingsGoals.filter((goal) => goal.id !== id));
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  const getTotalSavings = () => {
    return savingsGoals.reduce((total, goal) => total + goal.currentAmount, 0);
  };

  const getRemainingToSave = () => {
    return savingsGoals.reduce(
      (total, goal) => total + (goal.targetAmount - goal.currentAmount),
      0
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <SavingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Savings Goals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your savings progress and achieve your financial goals
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Savings
              </Typography>
              <Typography variant="h4">
                ${getTotalSavings().toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Remaining to Save
              </Typography>
              <Typography variant="h4" color="warning.main">
                ${getRemainingToSave().toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Goals */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Your Savings Goals</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Goal
              </Button>
            </Box>

            <Grid container spacing={3}>
              {savingsGoals.map((goal) => (
                <Grid item xs={12} md={6} key={goal.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">{goal.name}</Typography>
                        <IconButton
                          onClick={() => handleDeleteGoal(goal.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        Target: ${goal.targetAmount.toLocaleString()}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Deadline: {goal.deadline}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={calculateProgress(goal.currentAmount, goal.targetAmount)}
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(0)}%
                        </Typography>
                      </Box>
                      <Typography sx={{ mt: 1 }} variant="body2" color="primary">
                        Saved: ${goal.currentAmount.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Goal Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Savings Goal</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Target Amount"
              type="number"
              value={newGoal.targetAmount}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetAmount: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Current Amount"
              type="number"
              value={newGoal.currentAmount}
              onChange={(e) =>
                setNewGoal({ ...newGoal, currentAmount: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Deadline"
              type="date"
              value={newGoal.deadline}
              onChange={(e) =>
                setNewGoal({ ...newGoal, deadline: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddGoal} variant="contained">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Savings; 