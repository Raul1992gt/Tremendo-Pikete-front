import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Typography, Container, Table, TableHead, TableBody, TableRow, 
    TableCell, TableContainer, Paper, TableSortLabel, TextField, Box 
} from '@mui/material';

const getColorByAsistencia = (puntos) => {
    switch (puntos) {
        case 0: return "#ff4d4d"; // Rojo
        case 1: return "#ffa500"; // Naranja
        case 2: return "#ffd700"; // Amarillo
        case 3: return "#4caf50"; // Verde
        default: return "#ffffff"; // Blanco
    }
};

const JugadoresTable = () => {
    const [jugadores, setJugadores] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro de búsqueda
    const [sortConfig, setSortConfig] = useState({ key: 'puntos_asistencia', direction: 'desc' });

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/jugadores")
            .then((response) => setJugadores(response.data))
            .catch((error) => console.error("Error al obtener jugadores:", error));
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...jugadores].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];

            // Convertir a número si es necesario
            if (key === 'puntos_asistencia') {
                valueA = Number(valueA);
                valueB = Number(valueB);
            } else {
                valueA = valueA.toString().toLowerCase();
                valueB = valueB.toString().toLowerCase();
            }

            if (valueA < valueB) return direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setJugadores(sortedData);
    };

    // Filtrar los jugadores por nombre
    const filteredJugadores = jugadores.filter((jugador) =>
        jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Roster de Jugadores
            </Typography>

            {/* Filtro de búsqueda */}
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="Buscar por Nombre"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['nombre', 'clase', 'rol', 'puntos_asistencia'].map((column) => (
                                <TableCell key={column} align={column === 'puntos_asistencia' ? 'center' : 'left'}>
                                    <TableSortLabel
                                        active={sortConfig.key === column}
                                        direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort(column)}
                                    >
                                        {column === 'puntos_asistencia' ? 'Asistencias Raids' : column.charAt(0).toUpperCase() + column.slice(1)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJugadores.map((jugador, index) => (
                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
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
