import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCategoria } from '../../services/categoriaService';

const CrearCategoria = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        nombre: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearCategoria(categoria);
            navigate('/categorias');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Nueva Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={categoria.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <textarea
                        className="form-control"
                        name="descripcion"
                        value={categoria.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Categoría</button>
            </form>
        </div>
    );
};

export default CrearCategoria;