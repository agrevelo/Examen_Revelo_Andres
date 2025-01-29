import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listarProductos } from '../../services/productoService';
import { asignarProductoACategoria, eliminarProductoDeCategoria } from '../../services/categoriaService';

const AsignarProductos = () => {
    const { id: categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [productosCategoria, setProductosCategoria] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState('');

    useEffect(() => {
        cargarProductos();
        cargarProductosCategoria();
    }, [categoriaId]);

    const cargarProductos = async () => {
        try {
            const data = await listarProductos();
            setProductos(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cargarProductosCategoria = async () => {
        try {
            const response = await fetch(`http://localhost:8002/api/categorias/${categoriaId}/productos`);
            const data = await response.json();
            setProductosCategoria(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAsignar = async () => {
        if (!selectedProducto) return;
        try {
            const producto = productos.find(p => p.id === parseInt(selectedProducto));
            await asignarProductoACategoria(categoriaId, producto);
            cargarProductosCategoria();
            setSelectedProducto('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEliminar = async (productoId) => {
        try {
            await eliminarProductoDeCategoria(categoriaId, productoId);
            cargarProductosCategoria();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Asignar Productos a Categoría</h2>
            <div className="row mb-4">
                <div className="col-md-6">
                    <select 
                        className="form-select"
                        value={selectedProducto}
                        onChange={(e) => setSelectedProducto(e.target.value)}
                    >
                        <option value="">Seleccionar Producto</option>
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button 
                        className="btn btn-primary"
                        onClick={handleAsignar}
                    >
                        Asignar
                    </button>
                </div>
            </div>

            <h3>Productos en esta Categoría</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosCategoria.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminar(producto.id)}
                                >
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

export default AsignarProductos;