import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { NavBar } from './componentScreens/NavBar';
import { Inventario } from './componentScreens/Inventario';
import { Venta } from './componentScreens/Ventas';
import { HomeScreen } from './componentScreens/PagPrincipal';
import { Cliente } from './componentScreens/ClienteScreen';
import { Proveedor } from './componentScreens/ProveedorScreen';

export const App = () => {
    return (
        <Router>
            <div>
                <NavBar/>
                <Switch>   {/*PATH DEBE SER EXACTO CON EL 'exact' */}
                    <Route exact path="/PagPrincipal" component={HomeScreen} />
                    <Route exact path="/cliente" component={Cliente} />
                    <Route exact path="/proveedor" component={Proveedor} />
                    <Route exact path="/inventario" component={Inventario} />
                    <Route exact path="/venta" component={Venta} />
                    <Redirect to="/"/>
                    {/* <Route component={HomeScreen} />Si no existiera la ruta que muestre el default.(404) */}
                </Switch>
            </div>
        </Router>
    )
}
