import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ItemsPorJugadorChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para asignar colores según el rol
    const getColorByRole = (role) => {
        role = role.toLowerCase();
        switch (role) {
            case 'tank':
                return "rgba(153, 102, 255, 0.6)";  // Morado para Tank
            case 'healer':
                return "rgba(54, 162, 235, 0.6)";  // Azul para Heal
            default:
                return "rgba(75, 192, 79, 0.6)";  // Verde para DPS u otros roles
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/jugadores/itemsTotales`);
                const data = response.data;
                
                const labels = data.map(jugador => jugador.nombre);
                const valores = data.map(jugador => jugador.items_count);
                const roles = data.map(jugador => jugador.rol);  // Asumiendo que 'rol' es el campo del rol del jugador
                
                const backgroundColors = roles.map(rol => getColorByRole(rol));

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Ítems Recibidos",
                            data: valores,
                            backgroundColor: backgroundColors,
                            borderWidth: 1,
                            hoverOffset: 4,
                        }
                    ]
                });
            } catch (err) {
                console.error("Error al obtener los datos:", err);
                setError("Error al cargar los datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ width: "600px", margin: "auto" }}>
            <Pie 
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Estado actual del reparto',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.raw + ' ítems';
                                }
                            }
                        },
                        legend: {
                            position: 'top',
                        },
                    },
                    animation: {
                        animateScale: true,  // Animación de escalado al inicio
                        animateRotate: true, // Rotación al inicio
                    },
                }}
            />
        </div>
    );
};

export default ItemsPorJugadorChart;
