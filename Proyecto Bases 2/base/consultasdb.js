var ServerConfig = require('./dbconfig');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');

// Consultas a la base de datos
const Clientes = require ('./Consultas/Clientes');
const ClienteDetalle = require ('./Consultas/ClienteDetalle');
const Proveedor = require ('./Consultas/Proveedor');
const ProveedorDetalle = require ('./Consultas/ProveedorDetalle');
const Inventario = require ('./Consultas/Inventario');
const InventarioDetalle = require ('./Consultas/InventarioDetalle');
const Ventas = require ('./Consultas/Ventas');
const VentasDetalle = require ('./Consultas/VentasDetalle');
//estadisticas
const EstadisticaClientes = require ('./Consultas/EstadisticaClientes');
const EstadisticaFacturas = require ('./Consultas/EstadisticaFacturas');
const EstadisticaOrdenes = require ('./Consultas/EstadisticaOrdenes');
const EstadisticaProductos = require ('./Consultas/EstadisticaProductos');
const EstadisticaProveedores = require ('./Consultas/EstadisticaProveedores');



var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Endpoints
app.post('/Clientes',Clientes.getClientes);
app.post('/ClienteDetalle',ClienteDetalle.getClienteDetalle);
app.post('/Proveedor',Proveedor.getProveedores);
app.post('/ProveedorDetalle',ProveedorDetalle.getProveedoresDetalle);
app.post('/Inventario',Inventario.getInventario);
app.post('/InventarioDetalle',InventarioDetalle.getInventarioDetalle);
app.post('/Ventas',Ventas.getVentas);
app.post('/VentasDetalle',VentasDetalle.getVentasDetalle);
// estadisticas
app.post('/EstadisticaClientes',EstadisticaClientes.getEstadisticaClientes);
app.post('/EstadisticaFacturas',EstadisticaFacturas.getEstadisticaFacturas);
app.post('/EstadisticaOrdenes',EstadisticaOrdenes.getEstadisticaOrdenes);
app.post('/EstadisticaProductos',EstadisticaProductos.getEstadisticaProductos);
app.post('/EstadisticaProveedores',EstadisticaProveedores.getEstadisticaProveedores);



app.listen(9000, function (req,res) {
    console.log('[MENSAJE]:[El servidor se esta ejecutando en el puerto 9000]');
});