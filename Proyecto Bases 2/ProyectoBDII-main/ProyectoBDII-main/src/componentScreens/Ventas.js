import React, { useState } from 'react';
import { useForm } from './formUser';
import axios from 'axios';


export const Venta = () => {


    const [formValues, handleInputChange, reset] = useForm({
        numFactura: '',
        cliente: '',
        entrega: '',
        fecha1: '',
        fecha2: '',
        montoMin: '',
        montoMax: ''
    })
    const { numFactura, cliente, entrega, fecha1, fecha2, montoMin, montoMax } = formValues;
    const [Selles, setSell] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datosCliente, setDatosCliente] = useState([]);

    const [datosProducto, setDatosProducto] = useState([]);

    const [totalLine, setTotalLinea] = useState();
    
    const currencyFormat=(num)=>{ 
        if(num!=undefined){
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    }

    const currencyFormatTotal = (num) => {
        if(num!=undefined){
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formValues));
        if (numFactura.length > 0 || cliente.length > 0 || entrega.length > 0 || (fecha1.length > 0 && fecha2.length > 0) || (montoMin.length > 0 && montoMax.length > 0)) {
            axios.post("http://localhost:9000/Ventas", formValues)
                .then(response => {
                    const datosD = response.data;
                    console.log(datosD);
                    setSell(a => datosD);

                })
                .catch(error => console.log(error));
        }
    }
    const getDatos = (id, total, e) => {
        setTotalLinea(total);
        e.preventDefault();
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/VentasDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatos(c => datosC);

            })
            .catch(error => console.log(error));
    }


    const getDatosCliente = (id, e) => {
        e.preventDefault();
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/ClienteDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatosCliente(c => datosC);

            })
            .catch(error => console.log(error));
    }

    const getDatosProducto = (id, e) => {
        e.preventDefault();
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/InventarioDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatosProducto(c => datosC);

            })
            .catch(error => console.log(error));
    }


    return (
        <div className="container">
            <h1>Ventas</h1>
            <hr />
            <br></br>
            <h5> Búsqueda de ventas por filtros</h5>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit}>
                <div className="Container">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependnumF"><strong>Del:</strong></span>
                                </div>
                                <input
                                    name='fecha1'
                                    type="date"
                                    className="form-control"
                                    value={fecha1}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependnumF" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependcliente"><strong>Al:</strong></span>
                                </div>
                                <input
                                    name='fecha2'
                                    type="date"
                                    className="form-control"
                                    value={fecha2}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependcliente" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependEntrega"><strong>Monto Minimo:</strong></span>
                                </div>
                                <input
                                    name="montoMin"
                                    type="number"
                                    className="form-control"
                                    value={montoMin}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependEntrega" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependEntrega"><strong>Monto Máximo:</strong></span>
                                </div>
                                <input
                                    name="montoMax"
                                    type="number"
                                    className="form-control"
                                    value={montoMax}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependEntrega" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependnumF"><strong>Nº factura:</strong></span>
                                </div>
                                <input
                                    name='numFactura'
                                    type="number"
                                    className="form-control"
                                    value={numFactura}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependnumF" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependcliente"><strong>Cliente:</strong></span>
                                </div>
                                <input
                                    name='cliente'
                                    type="text"
                                    className="form-control"
                                    value={cliente}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependcliente" />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependEntrega"><strong>Método de entrega:</strong></span>
                                </div>
                                <input
                                    name="entrega"
                                    type="text"
                                    className="form-control"
                                    value={entrega}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependEntrega" />
                            </div>
                        </div>
                        <div className="form-group col-md-1">
                            <button className='btn btn-info' type="submit">Buscar</button>
                        </div>
                        <div className="form-group col-md-1">
                            <button className='btn btn-warning' onClick={reset}>Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>
            <br></br>
            <hr></hr>
            <table className="table dt-responsive nowrap table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Nº factura</th>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">Método de entrega</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Selles.map((sell) => (
                            <tr>
                                <td>{sell.InvoiceID}</td>
                                <td><button className="btn btn-link" role="link" onClick={(e) => getDatosCliente(sell.CustomerID, e)} data-toggle="modal" data-target=".bd-clienteInfo-modal-lg">{sell.CustomerName}</button></td>
                                <td>{sell.DeliveryMethodName}</td>
                                <td>{sell.InvoiceDate}</td>
                                <td>{currencyFormat(sell.TotalAmount)}</td>
                                <td key={sell.InvoiceID}><center><button className="btn btn-primary" onClick={(e) => getDatos(sell.InvoiceID, sell.TotalAmount, e)} data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-check"></i></button></center></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Factura: </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">






                            <div className="invoice-box">
                                <table cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr className="top">
                                            <td colSpan="6">
                                                <table><tbody>Nombre de Cliente
                                                <tr>
                                                        <td className="title">
                                                            {
                                                                datos.slice(0, 1).map((data) => (
                                                                    <h4>{data.CustomerName}</h4>
                                                                ))
                                                            }

                                                        </td>
                                                        {
                                                            datos.slice(0, 1).map((data) => (
                                                                <td>
                                                                    # factura: {data.InvoiceID}<br />
                                                                Número de orden: {data.CustomerPurchaseOrderNumber}<br />
                                                                    Fecha:{data.InvoiceDate}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                        </tr>


                                        <tr className="information">
                                            <td colSpan="6">
                                                <table>
                                                    <tbody>
                                                        {
                                                            datos.slice(0, 1).map((data) => (
                                                                <tr>
                                                                    <td>
                                                                        Método Entrega: {data.DeliveryMethodName}<br />
                                                            Instrucciones de entrega: {data.DeliveryInstructions}<br />
                                                                    </td>

                                                                    <td>
                                                                        Nombre del vendedor: {data.VendorName}<br />
                                                            Persona de contacto: {data.Contact1}<br />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr className="heading">
                                            <td>Producto</td>
                                            <td>Cantidad</td>

                                            <td>Precio unitario</td>
                                            <td>Impuesto aplicado</td>

                                            <td>Monto del impuesto</td>
                                            <td>Total</td>
                                        </tr>

                                        {
                                            datos.map((data) => (
                                                <tr className="item">
                                                    <td><button className="btn btn-link text-left" role="link" onClick={(e) => getDatosProducto(data.StockItemID, e)} data-toggle="modal" data-target=".bd-productoInfo-modal-lg">{data.StockItemName}</button></td>
                                                    <td>{data.Quantity}</td>
                                                    <td>{currencyFormat(data.UnitPrice)}</td>
                                                    <td>{data.TaxRate}  %</td>
                                                    <td>{currencyFormat(data.TaxAmount)}</td>
                                                    <td>{currencyFormat(data.TotalLine)}</td>
                                                </tr>
                                            ))
                                        }

                                        <tr className="total">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Total: {currencyFormatTotal(totalLine)}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>




                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>






            <div className="modal fade bd-clienteInfo-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cliente: </h5>{
                            datosCliente.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.CustomerName}</h5>
                                ))
                            }
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        {
                                datosCliente.map((data) => (
                                    <div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Teléfono:</b></label>
                                                <p id="telefono">{data.PhoneNumber}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Fax" className="col-form-label"><b>Fax:</b></label>
                                                <p id="Fax">{data.FaxNumber}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Categoría:</b></label>
                                                <p id="telefono">{data.CustomerCategoryName}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Días de gracia para pagar:</b></label>
                                                <p id="telefono">{data.PaymentDays}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Grupo de compra:</b></label>
                                                <p id="telefono">{data.BuyingGroupName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Contacto primario:</b></label>
                                                <p id="telefono">{data.PrimaryContactFullName}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Contacto secundario:</b></label>
                                                <p id="telefono">{data.AlternativeContactFullName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Sitioweb" className="col-form-label"><b>Sitio web:</b></label>
                                                <p id="Sitioweb"><a id="telefono" href={data.WebsiteURL}>{data.WebsiteURL}</a></p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Métodos de entrega:</b></label>
                                                <p id="telefono">{data.DeliveryMethodName}</p>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Dirección:</b></label>
                                                <p id="telefono">{data.DireccionCliente}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Ciudad de entrega:</b></label>
                                                <p id="telefono">{data.deliveryCity}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Código postal:</b></label>
                                                <p id="telefono">{data.PostalPostalCode}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade  bd-productoInfo-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Producto: </h5> {
                                datosProducto.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.StockItemName}</h5>
                                ))
                            }
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                datosProducto.map((data) => (
                                    <div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Código del proveedor" className="col-form-label"><b>Proveedor:</b></label>
                                                <p id="Código del proveedor">{data.SupplierName} LINK</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="ColorName" className="col-form-label"><b>Color:</b></label>
                                                <p id="ColorName">{data.ColorName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Unidad de empaquetamiento" className="col-form-label"><b>Unidad de empaquetamiento:</b></label>
                                                <p id="Unidad de empaquetamiento">{data.UnitPackage}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Empaquetamiento" className="col-form-label"><b>Empaquetamiento:</b></label>
                                                <p id="Empaquetamiento">{data.OuterPackage}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Precio venta" className="col-form-label"><b>Precio venta:</b></label>
                                                <p id="Precio venta">{currencyFormat(data.RecommendedRetailPrice)}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Peso:</b></label>
                                                <p id="telefono">{data.TypicalWeightPerUnit}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Palabras claves" className="col-form-label"><b>Palabras claves:</b></label>
                                                <p id="Palabras claves">{data.SearchDetails}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Cantidad de empaquetamiento" className="col-form-label"><b>Cantidad de empaquetamiento:</b></label>
                                                <p id="Cantidad de empaquetamiento" >{data.QuantityPerOuter}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Marca" className="col-form-label"><b>Marca:</b></label>
                                                <p id="Marca">{data.Brand}</p>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="tallas" className="col-form-label"><b>Tallas / tamaño:</b></label>
                                                <p id="tallas">{data.Size}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Impuesto" className="col-form-label"><b>Impuesto:</b></label>
                                                <p id="Impuesto">{data.TaxRate}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="UnitPrice" className="col-form-label"><b>Precio unitario:</b></label>
                                                <p id="UnitPrice">{currencyFormat(data.UnitPrice)}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Cantidad disponible" className="col-form-label"><b>Cantidad disponible:</b></label>
                                                <p id="Cantidad disponible">{data.QuantityOnHand}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="BinLocation" className="col-form-label"><b>Ubicación:</b></label>
                                                <p id="BinLocation">{data.BinLocation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
