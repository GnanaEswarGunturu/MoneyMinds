import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AdultDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Adult Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Portfolio Overview</Typography>
            {/* Add portfolio content */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Investment Performance</Typography>
            {/* Add investment performance content */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Financial Planning</Typography>
            {/* Add financial planning content */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Market Analysis</Typography>
            {/* Add market analysis content */}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdultDashboard; 