import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaBook, FaCheck } from 'react-icons/fa';

const MatricularUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState({ usuarioId: '', cursoId: '' });

  useEffect(() => {
    const fetchData = async () => {
      const usuariosResponse = await axios.get('http://localhost:8004/api/usuarios');
      const cursosResponse = await axios.get('http://localhost:8002/api/cursos');
      setUsuarios(usuariosResponse.data);
      setCursos(cursosResponse.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8002/api/cursos/${form.cursoId}`, { id: form.usuarioId });
    alert('Usuario matriculado correctamente');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg rounded-3">
            <div className="card-header bg-success text-white text-center">
              <h2>
                <FaCheck className="me-2" /> Matricular Usuario
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FaUser className="me-2" /> Usuario:
                  </label>
                  <select
                    className="form-select"
                    name="usuarioId"
                    onChange={handleChange}
                    value={form.usuarioId}
                    required
                  >
                    <option value="">Seleccione un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <FaBook className="me-2" /> Curso:
                  </label>
                  <select
                    className="form-select"
                    name="cursoId"
                    onChange={handleChange}
                    value={form.cursoId}
                    required
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    <FaCheck className="me-2" /> Matricular
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

export default MatricularUsuario;
