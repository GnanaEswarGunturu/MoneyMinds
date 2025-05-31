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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';

import {
  TrendingUp,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShowChart,
} from '@mui/icons-material';


const Invest = () => {
  const [investments, setInvestments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'Stocks',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const investmentTypes = [
    'Stocks',
    'Bonds',
    'Mutual Funds',
    'ETFs',
    'Real Estate',
    'Cryptocurrency',
    'Other',
  ];

  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchInvestments = async () => {
      // Simulated API response
      const data = [
        {
          id: 1,
          name: 'Tech Growth Fund',
          type: 'Mutual Funds',
          amount: 5000,
          date: '2024-05-30',
          returns: 8.5,
        },
        {
          id: 2,
          name: 'Blue Chip Stocks',
          type: 'Stocks',
          amount: 3000,
          date: '2024-05-29',
          returns: 12.3,
        },
        {
          id: 3,
          name: 'Government Bonds',
          type: 'Bonds',
          amount: 2000,
          date: '2024-05-28',
          returns: 4.2,
        },
      ];
      setInvestments(data);
    };

    fetchInvestments();
  }, []);

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.amount) {
      const investment = {
        id: investments.length + 1,
        ...newInvestment,
        amount: parseFloat(newInvestment.amount),
        returns: Math.random() * 15, // Simulated returns
      };
      setInvestments([investment, ...investments]);
      setNewInvestment({
        name: '',
        type: 'Stocks',
        amount: '',
        date: new Date().toISOString().split('T')[0],
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteInvestment = (id) => {
    setInvestments(investments.filter((investment) => investment.id !== id));
  };

  const getTotalInvestments = () => {
    return investments.reduce((total, investment) => total + investment.amount, 0);
  };

  const getAverageReturns = () => {
    if (investments.length === 0) return 0;
    const totalReturns = investments.reduce((sum, investment) => sum + investment.returns, 0);
    return totalReturns / investments.length;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <ShowChart sx={{ mr: 1, verticalAlign: 'middle' }} />
          Investment Portfolio
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your investments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Investments
              </Typography>
              <Typography variant="h4">
                ${getTotalInvestments().toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Returns
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp color="primary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {getAverageReturns().toFixed(1)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Investment List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Investment Portfolio</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Investment
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Returns</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investments.map((investment) => (
                    <TableRow key={investment.id}>
                      <TableCell>{investment.date}</TableCell>
                      <TableCell>{investment.name}</TableCell>
                      <TableCell>{investment.type}</TableCell>
                      <TableCell align="right">
                        ${investment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ color: investment.returns >= 0 ? 'success.main' : 'error.main' }}>
                        {investment.returns.toFixed(1)}%
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDeleteInvestment(investment.id)}
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
      </Grid>

      {/* Add Investment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Investment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Investment Name"
              value={newInvestment.name}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Investment Type"
              value={newInvestment.type}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, type: e.target.value })
              }
              sx={{ mb: 2 }}
            >
              {investmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newInvestment.amount}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, amount: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={newInvestment.date}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddInvestment} variant="contained">
            Add Investment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Invest; 