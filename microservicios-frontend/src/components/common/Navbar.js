import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Microservicios</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/usuarios">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cursos">Cursos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/matricular">Matricular Usuario</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
