import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearProducto } from '../../services/productoService';

const CrearProducto = () => {
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevoProducto = {
                ...producto,
                precio: parseFloat(producto.precio),
                stock: parseInt(producto.stock),
                creadoEn: new Date(),
                actualizadoEn: new Date()
            };
            await crearProducto(nuevoProducto);
            navigate('/productos');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <textarea
                        className="form-control"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={producto.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Producto</button>
            </form>
        </div>
    );
};

export default CrearProducto;