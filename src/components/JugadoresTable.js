import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material'; // Importar componentes de MUI

const getColorByAsistencia = (puntos) => {
    switch (puntos) {
        case 0:
            return "#ff4d4d"; // Rojo
        case 1:
            return "#ffa500"; // Naranja
        case 2:
            return "#ffd700"; // Amarillo
        case 3:
            return "#4caf50"; // Verde
        default:
            return "#ffffff"; // Blanco
    }
};

const JugadoresTable = () => {
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL+"/api/jugadores")
            .then((response) => {
                console.log(response.data);
                setJugadores(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener jugadores:", error);
            });
    }, []);

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Roster de Jugadores
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Clase</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell align="center">Asistencias Raids</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jugadores.map((jugador, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' // Alternar entre gris claro y blanco
                                }}
                            >
                                <TableCell>{jugador.nombre}</TableCell>
                                <TableCell>{jugador.clase}</TableCell>
                                <TableCell>{jugador.rol}</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        backgroundColor: getColorByAsistencia(jugador.puntos_asistencia),
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {jugador.puntos_asistencia}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default JugadoresTable;
