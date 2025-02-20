import React, { useState } from 'react';
import axios from 'axios';

const GenerarInformeButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateReport = async () => {
        setLoading(true);
        setError(null);
        try {
            // Hacer una solicitud al backend para generar el informe
            const response = await axios.get(process.env.REACT_APP_API_URL + "/api/generarInforme", {
                responseType: 'blob', // Importante para manejar archivos binarios como PDF
            });

            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'informe_reparto.pdf'); // Puedes cambiar el nombre del archivo aquí
            document.body.appendChild(link);
            link.click();

            // Limpiar
            document.body.removeChild(link);
        } catch (err) {
            console.error("Error al generar el informe:", err);
            setError('Hubo un error al generar el informe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleGenerateReport} disabled={loading}>
                {loading ? 'Generando...' : 'Generar Informe'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default GenerarInformeButton;
