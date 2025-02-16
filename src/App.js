import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './components/Login';
import HomePage from './components/HomePage';
import JugadoresTable from './components/JugadoresTable';
import JugadoresItemsCountTable from './components/JugadoresItemsCountTable';
import PrioridadLoot from './components/PrioridadLoot';
import PrivateRoute from './components/PrivateRoute'; 
import CargarDatos from './components/CargarDatos';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const rol = localStorage.getItem('rol');

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setToken(null); // Limpiar el estado token
    navigate('/login'); // Redirigir al login
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tremendo Pikete
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/roster">Roster</Button>
          <Button color="inherit" component={Link} to="/jugadores-items">Jugadores y Items</Button>
          <Button color="inherit" component={Link} to="/prioridad-loot">Prioridad Loot</Button>
          {rol === 'admin' && (
            <Button color="inherit" component={Link} to="/cargar-datos">
              Cargar Datos
            </Button>
          )}
          {token && (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<PrivateRoute token={token}><HomePage /></PrivateRoute>} />
          <Route path="/roster" element={<PrivateRoute token={token}><JugadoresTable /></PrivateRoute>} />
          <Route path="/jugadores-items" element={<PrivateRoute token={token}><JugadoresItemsCountTable /></PrivateRoute>} />
          <Route path="/prioridad-loot" element={<PrivateRoute token={token}><PrioridadLoot /></PrivateRoute>} /> {/* Nueva ruta */}
          <Route path="/cargar-datos" element={rol === 'admin' ? <CargarDatos /> : <Typography>No tienes permiso para acceder a esta página.</Typography>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
