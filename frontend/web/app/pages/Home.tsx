import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SettingsIcon from '@mui/icons-material/Settings';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        今天吃什么？
      </Typography>
      
      <Grid container spacing={3}>
        {/* 智能推荐 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <RestaurantIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              智能推荐
            </Typography>
            <Typography color="text.secondary" align="center">
              基于您的喜好和饮食习惯，为您推荐合适的菜品
            </Typography>
          </Paper>
        </Grid>

        {/* 浏览菜品 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <FastfoodIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              浏览菜品
            </Typography>
            <Typography color="text.secondary" align="center">
              查看所有可用的菜品，发现新的美食
            </Typography>
          </Paper>
        </Grid>

        {/* 个人设置 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              个人设置
            </Typography>
            <Typography color="text.secondary" align="center">
              设置您的饮食偏好、过敏源和其他个性化选项
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 快速开始按钮 */}
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4, display: 'block', mx: 'auto' }}
      >
        立即开始
      </Button>
    </Container>
  );
};

export default Home; 