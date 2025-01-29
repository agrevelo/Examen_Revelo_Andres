import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarCategorias } from '../../services/categoriaService';

const ListarCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await listarCategorias();
            setCategorias(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Categorías</h2>
            <Link to="/crear-categoria" className="btn btn-primary mb-3">
                Crear Nueva Categoría
            </Link>
            <div className="row">
                {categorias.map(categoria => (
                    <div key={categoria.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{categoria.nombre}</h5>
                                <p className="card-text">{categoria.descripcion}</p>
                                <Link 
                                    to={`/categorias/${categoria.id}/productos`} 
                                    className="btn btn-info btn-sm me-2"
                                >
                                    Ver Productos
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarCategorias;