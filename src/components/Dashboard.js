// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const token = localStorage.getItem('token'); // Obtener el token del localStorage
//   const { id } = useParams();
//   const nombreUsuario = localStorage.getItem('nombreUsuario');

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/items/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },// Enviar token en los headers
//         });
//         setItems(response.data); // Guardar los ítems en el estado
//       } catch (error) {
//         console.error('Error al obtener los ítems:', error);
//       }
//     };
//     fetchItems();
//   }, [id, token]); // Ejecutar cuando el token cambie

//   return (
//     <Container sx={{ marginTop: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         {nombreUsuario ? `Bienvenido a Tremendo Pikete, ${nombreUsuario}` : 'Bienvenido a Tremendo Pikete'}
//       </Typography>
      
//       <Typography variant="h5" align="center" color="textSecondary" gutterBottom>
//         Tus ítems conseguidos:
//       </Typography>

//       {items.length > 0 ? (
//         <Grid container spacing={3}>
//           {items.map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item.id}>
//               <Card sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                     {item.nombre}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     <strong>Tipo:</strong> {item.tipo}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     <strong>Subtipo:</strong> {item.subtipo}
//                   </Typography>
//                   <Typography variant="body2" color="primary">
//                     <strong>Nivel:</strong> {item.nivel}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="body1" align="center" color="textSecondary">
//           No tienes ítems aún.
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
