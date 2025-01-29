import React, { useState } from 'react';
import axios from 'axios';

const UsuarioForm = ({ onSave }) => {
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8004/api/usuarios', form);
      onSave(response.data);
      alert('Usuario guardado exitosamente.');
      setForm({ nombre: '', email: '' });
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      alert('Hubo un problema al guardar el usuario. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg rounded-3">
            <div className="card-header bg-primary text-white text-center">
              <h3>Crear Usuario</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingresa el nombre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingresa el email"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
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

export default UsuarioForm;
