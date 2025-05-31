import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AccountBalance,
} from '@mui/icons-material';

const Budget = () => {
  const [budget, setBudget] = useState({
    income: '',
    categories: [
      { name: 'Housing', amount: '', spent: 0 },
      { name: 'Food', amount: '', spent: 0 },
      { name: 'Transportation', amount: '', spent: 0 },
      { name: 'Entertainment', amount: '', spent: 0 },
      { name: 'Savings', amount: '', spent: 0 },
    ],
  });

  const [newCategory, setNewCategory] = useState('');

  const handleIncomeChange = (e) => {
    setBudget({ ...budget, income: e.target.value });
  };

  const handleCategoryAmountChange = (index, value) => {
    const newCategories = [...budget.categories];
    newCategories[index] = { ...newCategories[index], amount: value };
    setBudget({ ...budget, categories: newCategories });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setBudget({
        ...budget,
        categories: [...budget.categories, { name: newCategory, amount: '', spent: 0 }],
      });
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (index) => {
    const newCategories = budget.categories.filter((_, i) => i !== index);
    setBudget({ ...budget, categories: newCategories });
  };

  const calculateProgress = (amount, spent) => {
    if (!amount) return 0;
    return (spent / parseFloat(amount)) * 100;
  };

  const getTotalBudget = () => {
    return budget.categories.reduce((total, category) => {
      return total + (parseFloat(category.amount) || 0);
    }, 0);
  };

  const getRemainingBudget = () => {
    const totalBudget = getTotalBudget();
    const totalSpent = budget.categories.reduce((total, category) => {
      return total + (category.spent || 0);
    }, 0);
    return totalBudget - totalSpent;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
          Budget Planner
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Plan and track your monthly budget
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Income Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Income
            </Typography>
            <TextField
              fullWidth
              label="Income"
              type="number"
              value={budget.income}
              onChange={handleIncomeChange}
              InputProps={{ startAdornment: '$' }}
            />
          </Paper>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Budget Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary">Total Budget</Typography>
                    <Typography variant="h4">${getTotalBudget().toLocaleString()}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary">Remaining</Typography>
                    <Typography variant="h4">${getRemainingBudget().toLocaleString()}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Categories Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Budget Categories
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    label="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            {budget.categories.map((category, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography>{category.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Budget Amount"
                      type="number"
                      value={category.amount}
                      onChange={(e) => handleCategoryAmountChange(index, e.target.value)}
                      InputProps={{ startAdornment: '$' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={calculateProgress(category.amount, category.spent)}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        ${category.spent} / ${category.amount || 0}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      onClick={() => handleDeleteCategory(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Budget; 