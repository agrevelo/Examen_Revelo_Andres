import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarProducto } from '../../services/productoService';

const EditarProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                const response = await fetch(`http://localhost:8003/api/productos/${id}`);
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        cargarProducto();
    }, [id]);

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productoActualizado = {
                ...producto,
                precio: parseFloat(producto.precio),
                stock: parseInt(producto.stock),
                actualizadoEn: new Date()
            };
            await actualizarProducto(id, productoActualizado);
            navigate('/productos');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Producto</h2>
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
                <button type="submit" className="btn btn-primary">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditarProducto;