import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Receipt,
  TrendingUp,
} from '@mui/icons-material';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Other',
  ];

  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchExpenses = async () => {
      // Simulated API response
      const data = [
        {
          id: 1,
          description: 'Grocery Shopping',
          amount: 150.50,
          category: 'Food',
          date: '2024-05-30',
        },
        {
          id: 2,
          description: 'Bus Pass',
          amount: 75.00,
          category: 'Transportation',
          date: '2024-05-29',
        },
        {
          id: 3,
          description: 'Movie Tickets',
          amount: 30.00,
          category: 'Entertainment',
          date: '2024-05-28',
        },
      ];
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense = {
        id: expenses.length + 1,
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        description: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <Receipt sx={{ mr: 1, verticalAlign: 'middle' }} />
          Expense Tracker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze your spending
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h4">
                ${getTotalExpenses().toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monthly Trend
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp color="primary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  5% increase from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Expense List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Expenses</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Expense
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell align="right">
                        ${expense.amount.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDeleteExpense(expense.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Expenses by Category
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(getExpensesByCategory()).map(([category, amount]) => (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary">{category}</Typography>
                      <Typography variant="h6">
                        ${amount.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Expense Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Description"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Category"
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              sx={{ mb: 2 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Expenses; 