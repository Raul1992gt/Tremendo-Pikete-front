import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Collapse, Box, } from '@mui/material';

// Función para obtener el color según la prioridad calculada
const getColorByPrioridad = (prioridad) => {
    if (prioridad >= 50) {
        return "#ff4d4d"; // Rojo (Alta prioridad)
    } else if (prioridad >= 30) {
        return "#ffa500"; // Naranja (Prioridad media)
    } else {
        return "#4caf50"; // Verde (Baja prioridad)
    }
};

const LootPrioridadTable = () => {
    const [jugadores, setJugadores] = useState([]);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  debugger
    useEffect(() => {
      axios
        .get("http://localhost:3000/api/jugadores/prioLooteo")
        .then((response) => {
          console.log(response.data);
          setJugadores(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener jugadores:", error);
        });
    }, []);
  
    // Maneja el clic en la columna de prioridad
    const handleRowClick = (index) => {
      setJugadorSeleccionado(jugadorSeleccionado === index ? null : index);
    };
  
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Prioridad de Loot de Jugadores
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Clase</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="center">Prioridad de Loot</TableCell>
                <TableCell align="center">Puntuación Prioridad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jugadores.map((jugador, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick(index)}
                  >
                    <TableCell>{jugador.nombre}</TableCell>
                    <TableCell>{jugador.clase}</TableCell>
                    <TableCell>{jugador.rol}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: getColorByPrioridad(jugador.prioridad),
                        color: "#000",
                        fontWeight: "bold",
                      }}
                    >
                      {jugador.prioridad >= 50
                        ? "Alta"
                        : jugador.prioridad >= 30
                        ? "Media"
                        : "Baja"}
                    </TableCell>
                    <TableCell align="center">{jugador.prioridad}</TableCell>
                  </TableRow>
  
                  {/* Desglose de Prioridad */}
                  <TableRow>
                    <TableCell colSpan={5} sx={{ padding: 0 }}>
                      <Collapse in={jugadorSeleccionado === index} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, padding: 2, backgroundColor: "#f0f0f0", borderRadius: 1 }}>
                          <Typography variant="h6">Desglose de Prioridad</Typography>
                          <Box>
                            {jugador.desglosePrio ? (
                                <ul>
                                {jugador.desglosePrio.detalles.map((detalle, idx) => (
                                    <li key={idx}>{detalle}</li>
                                ))}
                                </ul>
                            ) : (
                                <Typography variant="body1">Sin detalles</Typography>
                            )}
                            </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };
  
  export default LootPrioridadTable;