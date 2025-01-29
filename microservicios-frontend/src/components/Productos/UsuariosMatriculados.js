import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const UsuariosMatriculados = () => {
  const { id } = useParams(); // ID del curso
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get(`http://localhost:8002/api/cursos/${id}/usuarios`);
      setUsuarios(response.data);
    };
    fetchUsuarios();
  }, [id]);

  const handleDesmatricular = async (usuarioId) => {
    if (window.confirm('¿Está seguro de que desea desmatricular a este usuario?')) {
      await axios.delete(`http://localhost:8002/api/cursos/${id}/usuarios/${usuarioId}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioId));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded-3">
            <div className="card-header bg-primary text-white text-center">
              <h2>Usuarios Matriculados</h2>
            </div>
            <div className="card-body">
              {usuarios.length > 0 ? (
                <ul className="list-group">
                  {usuarios.map((usuario) => (
                    <li
                      key={usuario.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{usuario.nombre} {usuario.apellido}</strong> <br />
                        <span className="text-muted">{usuario.email}</span>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDesmatricular(usuario.id)}
                      >
                        <FaTrashAlt className="me-1" /> Desmatricular
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center">
                  <p className="text-muted">No hay usuarios matriculados en este curso.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosMatriculados;
