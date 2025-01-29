import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListarProductos from './components/Productos/ListarProductos';
import CrearProducto from './components/Productos/CrearProducto';
import EditarProducto from './components/Productos/EditarProducto';
import ListarCategorias from './components/Categorias/ListarCategorias';
import CrearCategoria from './components/Categorias/CrearCategoria';
import AsignarProductos from './components/Categorias/AsignarProductos';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Gestión de Productos</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/productos">Productos</Link>
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/productos" element={<ListarProductos />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
          <Route path="/categorias" element={<ListarCategorias />} />
          <Route path="/crear-categoria" element={<CrearCategoria />} />
          <Route path="/categorias/:id/productos" element={<AsignarProductos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;