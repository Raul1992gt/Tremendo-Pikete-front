import React, { useState } from 'react';
import { Typography, Button, Box, TextField, Snackbar } from '@mui/material';
import axios from 'axios';

const CargarDatos = () => {
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/json') {
      setFile(uploadedFile);
    } else {
      alert('Por favor, sube un archivo JSON válido');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo JSON para cargar');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/api/cargarRaid', formData);
      setSnackbarMessage('Archivo cargado exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Hubo un error al cargar el archivo');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Cargar Datos JSON
      </Typography>
      <TextField
        type="file"
        inputProps={{ accept: '.json' }}
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Cargar Archivo
      </Button>

      {/* Snackbar para el mensaje de carga */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CargarDatos;
