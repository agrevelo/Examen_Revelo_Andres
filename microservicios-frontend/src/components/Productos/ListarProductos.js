import React, { useState, useEffect } from 'react';
import { listarProductos, eliminarProducto } from '../../services/productoService';
import { Link } from 'react-router-dom';

const ListarProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await listarProductos();
            setProductos(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            try {
                await eliminarProducto(id);
                cargarProductos();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Productos</h2>
            <Link to="/crear-producto" className="btn btn-primary mb-3">
                Crear Nuevo Producto
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <Link to={`/editar-producto/${producto.id}`} className="btn btn-warning btn-sm me-2">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(producto.id)}
                                    className="btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarProductos;