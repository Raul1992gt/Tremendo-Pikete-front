import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

const CargarDatos = () => {
  const [file, setFile] = useState(null);

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
    debugger
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/cargarRaid', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
        alert('Hubo un error al cargar el archivo');
      }
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
    </Box>
  );
};

export default CargarDatos;
