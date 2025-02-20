import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import Login from './components/Login';
import HomePage from './components/HomePage';
import JugadoresTable from './components/JugadoresTable';
import JugadoresItemsCountTable from './components/JugadoresItemsCountTable';
import PrioridadLoot from './components/PrioridadLoot';
import PrivateRoute from './components/PrivateRoute'; 
import CargarDatos from './components/CargarDatos';
import GenerarInformeButton from './components/GenerarInformeButton';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para el Drawer
  const navigate = useNavigate();
  
  // Verificar si el dispositivo es móvil (pantalla pequeña)
  const isMobile = useMediaQuery('(max-width: 768px)'); 

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

  // Función para cerrar el drawer
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tremendo Pikete
          </Typography>
          
          {/* Mostrar botón hamburguesa solo en pantallas pequeñas */}
          {isMobile ? (
            <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
              {/* Usar un ícono SVG simple */}
              <span style={{ fontSize: '2rem' }}>☰</span>
            </IconButton>
          ) : (
            <div>
              {/* Barra de navegación horizontal para pantallas grandes */}
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/roster">
                Roster
              </Button>
              <Button color="inherit" component={Link} to="/jugadores-items">
                Jugadores y Items
              </Button>
              {(rol === 'admin' || rol === 'oficial') && (
                <Button color="inherit" component={Link} to="/prioridad-loot">
                  Prioridad Loot
                </Button>
              )}
              {rol === 'admin' && (
                <Button color="inherit" component={Link} to="/cargar-datos">
                  Cargar Datos
                </Button>
              )}
            </div>
          )}
          
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer para dispositivos móviles */}
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/" onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/roster" onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Roster" />
            </ListItem>
            <ListItem button component={Link} to="/jugadores-items" onClick={() => toggleDrawer(false)}>
              <ListItemText primary="Jugadores y Items" />
            </ListItem>
            {(rol === 'admin' || rol === 'oficial') && (
              <ListItem button component={Link} to="/prioridad-loot" onClick={() => toggleDrawer(false)}>
                <ListItemText primary="Prioridad Loot" />
              </ListItem>
            )}
            {rol === 'admin' && (
              <ListItem button component={Link} to="/cargar-datos" onClick={() => toggleDrawer(false)}>
                <ListItemText primary="Cargar Datos" />
              </ListItem>
            )}
          </List>
        </Drawer>
      )}

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<PrivateRoute token={token}><HomePage /></PrivateRoute>} />
          <Route path="/roster" element={<PrivateRoute token={token}><JugadoresTable /></PrivateRoute>} />
          <Route path="/jugadores-items" element={<PrivateRoute token={token}><JugadoresItemsCountTable /></PrivateRoute>} />
          <Route path="/prioridad-loot" element={<PrivateRoute token={token}><PrioridadLoot /></PrivateRoute>} />
          <Route path="/cargar-datos" element={rol === 'admin' ? <CargarDatos /> : <Typography>No tienes permiso para acceder a esta página.</Typography>} />
          <Route path="/generar-informe" element={<PrivateRoute token={token}><GenerarInformeButton /></PrivateRoute>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
