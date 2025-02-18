import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Link, TableSortLabel, TextField } from '@mui/material';
import { red, orange, green, yellow } from '@mui/material/colors';
import ItemPopup from './ItemPopUp';

const JugadoresItemsCountTable = () => {
    const [jugadoresItemsCount, setJugadoresItemsCount] = useState([]);
    const [items, setItems] = useState([]);
    const [nombre, setNombre] = useState('');
    const [open, setOpen] = useState(false);
    const [jugadorData, setJugadorData] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'items_count', direction: 'desc' });
    
    // Estado para búsqueda
    const [filtroBusqueda, setFiltroBusqueda] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/jugadores/itemsTotales')
            .then(response => {
                const sortedData = [...response.data].sort((a, b) => b.items_count - a.items_count);
                setJugadoresItemsCount(sortedData);
            })
            .catch(error => {
                console.error('Error al obtener jugadores y cantidad de items:', error);
            });
    }, []);

    const openPopup = (playerId, nombre) => {
        axios.get(process.env.REACT_APP_API_URL + `/api/jugadores/items/${playerId}`)
            .then(response => {
                if (response.data.length > 0) {
                    const jugadorData = {
                        jugadorNombre: response.data[0].jugadornombre,
                        jugadorClase: response.data[0].jugadorclase,
                        jugadorRol: response.data[0].jugadorrol
                    };

                    const items = response.data.map(({ nombreitem, tipoitem, subtipoitem }) => ({
                        nombreItem: nombreitem,
                        tipoItem: tipoitem,
                        subTipoItem: subtipoitem
                    }));

                    setJugadorData(jugadorData);
                    setItems(items);
                    setNombre(nombre);
                    setOpen(true);
                } else {
                    console.warn('No hay datos disponibles para este jugador.');
                }
            })
            .catch(error => {
                console.error('Error al obtener los items del jugador:', error);
            });
    };

    const closePopup = () => {
        setOpen(false);
    };

    const getColor = (itemCount) => {
        const count = parseInt(itemCount, 10);
        if (count === 0) {
            return red[500];
        } else if (count > 4 && count < 8) {
            return orange[500];
        } else if (count >= 8) {
            return green[500];
        } else {
            return yellow[700];
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
    
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
    
        if (key === 'items_count') {
            direction = sortConfig.key === 'items_count' ? (sortConfig.direction === 'desc' ? 'asc' : 'desc') : 'desc';
        }
    
        const sortedData = [...jugadoresItemsCount].sort((a, b) => {
            let valueA = a[key];
            let valueB = b[key];
    
            if (key === 'items_count') {
                valueA = parseInt(valueA, 10);
                valueB = parseInt(valueB, 10);
            }
    
            if (valueA < valueB) return direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    
        setSortConfig({ key, direction });
        setJugadoresItemsCount(sortedData);
    };

    // Función para filtrar los jugadores por nombre
    const applyFilters = (data) => {
        return data.filter(jugador => {
            // Filtro por búsqueda rápida (nombre)
            const matchBusqueda = filtroBusqueda
                ? jugador.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
                : true;
            
            return matchBusqueda;
        });
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Jugadores y Número de Items Recibidos
            </Typography>

            {/* Filtro de búsqueda rápida */}
            <TextField
                label="Buscar por Nombre"
                variant="outlined"
                fullWidth
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['nombre', 'clase', 'rol', 'items_count'].map((col) => (
                                <TableCell key={col}>
                                    <TableSortLabel
                                        active={sortConfig.key === col}
                                        direction={sortConfig.key === col ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort(col)}
                                    >
                                        {col === 'nombre' ? 'Nombre del Jugador' :
                                            col === 'clase' ? 'Clase' :
                                                col === 'rol' ? 'Rol' :
                                                    'Cantidad de Items'}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applyFilters(jugadoresItemsCount).map((jugador, index) => (
                            <TableRow
                                key={jugador.player_id}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white'
                                }}
                            >
                                <TableCell>{jugador.nombre}</TableCell>
                                <TableCell>{jugador.clase}</TableCell>
                                <TableCell>{jugador.rol}</TableCell>
                                <TableCell
                                    sx={{
                                        backgroundColor: getColor(jugador.items_count),
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openPopup(jugador.player_id, jugador.nombre);
                                        }}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            display: 'block',
                                            width: '100%',
                                            height: '100%',
                                            padding: '8px'
                                        }}
                                    >
                                        {jugador.items_count}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {open && (
                <ItemPopup
                    nombre={nombre}
                    items={items}
                    onClose={closePopup}
                />
            )}
        </Container>
    );
};

export default JugadoresItemsCountTable;
