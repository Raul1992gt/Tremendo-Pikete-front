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
      <Typography variant="h6">
        Haz clic en un enlace para ver más opciones:
      </Typography>
      
      {/* Usar Stack para separar los botones verticalmente */}
      <Stack spacing={2} direction="column" alignItems="center">
        <Box width="200px">
          <Button
            variant="contained"
            color="primary"
            href="/roster" // No pasa el id, solo va a Roster
            size="small"
            fullWidth
          >
            Ver Roster
          </Button>
        </Box>
        {/* <Box width="200px">
          <Button
            variant="contained"
            color="primary"
            href={`/dashboard/${userId}`} // Pasa el id en la URL solo para Dashboard
            size="small"
            fullWidth
          >
            Mi Dashboard
          </Button>
        </Box> */}
      </Stack>
    </Container>
  );
};

export default HomePage;
