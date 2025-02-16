import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setToken }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(process.env.REACT_APP_API_URL+'/login', {
      nombre_usuario: nombreUsuario,
      contrasena: contrasena,
    });

    // Si la autenticación es exitosa, almacenamos el token
    const token = response.data.token;
    setToken(token);
    localStorage.setItem('token', token); // Guardamos el token en el almacenamiento local      
    localStorage.setItem('nombreUsuario', nombreUsuario); // Almacenamos el nombre de usuario en el localStorage
    
    // Decodificar el token JWT para obtener el rol
    const decodedToken = jwtDecode(token);
    const rolId = decodedToken.rol_id;  // Extraemos el rol del token

    localStorage.setItem('rol', rolId);  // Guardamos el rol en el almacenamiento local

    // Redirigir a la página de home
    const userId = decodedToken.id; 
    localStorage.setItem('userId', userId); // Obtener el ID desde el token
    window.location.href = `/`;
  } catch (error) {
    setError('Usuario o contraseña incorrectos');
  }
};
  

  return (
    <Container sx={{ marginTop: 4, maxWidth: 400 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Iniciar sesión
          </Button>

          {error && <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
        </form>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            ¿No tienes cuenta? Contacta con Pegotas
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
