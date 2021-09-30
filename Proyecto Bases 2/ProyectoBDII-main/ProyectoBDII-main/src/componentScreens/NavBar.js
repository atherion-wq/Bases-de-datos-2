import React,{Fragment} from 'react'
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return (
        <Fragment>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div className="container">
    <a className="navbar-brand"></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink exact activeClassName="active" className="nav-item nav-link"to="/cliente">Cliente</NavLink>
        </li>
        <li className="nav-item"> 
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="/proveedor">Proveedor</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="/inventario">Inventario</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="/venta">Ventas</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</Fragment>

    )
}