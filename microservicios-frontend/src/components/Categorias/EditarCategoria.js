import React, { useEffect, useState } from 'react';
import { getUsuarioById, updateUsuario } from '../../services/usuarioService';
import { useNavigate, useParams } from 'react-router-dom';

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({ nombre: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const { data } = await getUsuarioById(id);
        setUsuario(data);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        alert('No se pudo cargar la información del usuario.');
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(id, usuario);
      alert('Usuario actualizado exitosamente');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un error al actualizar el usuario. Por favor, inténtelo nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg rounded-3">
            <div className="card-header bg-warning text-dark text-center">
              <h2>Editar Usuario</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                    placeholder="Actualiza el nombre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder="Actualiza el correo electrónico"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
