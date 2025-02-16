import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Link } from '@mui/material';
import { red, orange, green, yellow } from '@mui/material/colors'; // Importar colores de MUI
import ItemPopup from './ItemPopUp'; // Importar el ItemPopup

const JugadoresItemsCountTable = () => {
    const [jugadoresItemsCount, setJugadoresItemsCount] = useState([]);
    const [items, setItems] = useState([]);
    const [nombre, setNombre] = useState('');
    const [open, setOpen] = useState(false);
    const [jugadorData, setJugadorData] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/jugadores/itemsTotales') 
            .then(response => {
                setJugadoresItemsCount(response.data);
            })
            .catch(error => {
                console.error('Error al obtener jugadores y cantidad de items:', error);
            });
    }, []);

    const openPopup = (playerId, nombre) => {
        axios.get(process.env.REACT_APP_API_URL+`/jugadores/items/${playerId}`)
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
            return red[500]; // Rojo para 0 ítems
        } else if (count > 4 && count < 8) {
            return orange[500]; // Naranja para entre 5 y 7 ítems
        } else if (count >= 8) {
            return green[500]; // Verde para 8 o más ítems
        } else {
            return yellow[700]; // Amarillo para 1-4 ítems
        }
        
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                Jugadores y Número de Items Recibidos
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del Jugador</TableCell>
                            <TableCell>Clase</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Cantidad de Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {jugadoresItemsCount.map((jugador, index) => (
                        <TableRow
                            key={jugador.player_id}
                            sx={{
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' // Alterna entre gris y blanco
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
