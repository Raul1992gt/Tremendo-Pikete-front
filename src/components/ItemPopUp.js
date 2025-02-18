import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Card, CardContent } from '@mui/material';

const ItemPopup = ({ nombre, items, onClose }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Ítems de {nombre}</DialogTitle>
            <DialogContent sx={{ overflow: "hidden" }}>
                {/* Mostrar las tarjetas con los ítems */}
                {items && items.length > 0 ? (
                    <Grid 
                        container 
                        spacing={2} 
                        justifyContent={items.length === 1 ? "center" : "flex-start"} 
                        sx={{
                            maxHeight: '60vh', 
                            overflowY: 'auto', // Añadimos scroll vertical
                        }}
                    >
                        {items.map((item, index) => {
                            // Verificar si el nombre del ítem contiene "Desecrated"
                            const esTier = item.nombreItem && item.nombreItem.toLowerCase().includes('desecrated');

                            return (
                                <Grid 
                                    item 
                                    xs={12}  // En móvil, ocupa todo el ancho
                                    sm={6}   // En pantallas medianas, 2 columnas
                                    md={4}   // En pantallas grandes, 3 columnas
                                    key={index}
                                >
                                    <Card sx={{ minWidth: items.length === 1 ? 200 : 'auto' }}>
                                        <CardContent>
                                            <Typography 
                                                variant="h6" 
                                                color={esTier ? "primary" : "textPrimary"} // Cambiar color si es una pieza de tier
                                            >
                                                {item.nombreItem || 'Desconocido'}
                                            </Typography>
                                            {esTier && (
                                                <Typography 
                                                    variant="body2" 
                                                    color="secondary" 
                                                    sx={{ marginTop: 1, fontWeight: 'bold', color: 'red' }} // Cambiar el color y darle espacio
                                                >
                                                    ¡Pieza de Tier!
                                                </Typography>
                                            )}
                                            <Typography variant="body2" color="textSecondary">
                                                Tipo: {item.tipoItem || 'N/A'} <br />
                                                Subtipo: {item.subTipoItem || 'N/A'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay ítems disponibles.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ItemPopup;
