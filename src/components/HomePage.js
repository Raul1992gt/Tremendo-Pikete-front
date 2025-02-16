import React, { useState, useEffect } from 'react';
import { Typography, Container, Button, Stack, Box } from '@mui/material';

const HomePage = () => {
    const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem('nombreUsuario'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
  
    // useEffect para actualizar los valores cuando se monta el componente
    useEffect(() => {
      setNombreUsuario(localStorage.getItem('nombreUsuario'));
      setUserId(localStorage.getItem('userId'));
    }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        {nombreUsuario ? `Bienvenido, ${nombreUsuario}!` : 'Bienvenidos a la aplicación de gestión de jugadores'}
      </Typography>
    </Container>
  );
};

export default HomePage;
