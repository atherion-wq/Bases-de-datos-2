import React, { useState } from 'react';
import { useForm } from './formUser';
import axios from 'axios';

export const Inventario = () => {

    const [formValues, handleInputChange, reset] = useForm({
        inventario: '',
        grupo: '',
        cantidad: ''
    })
    const { inventario, grupo, cantidad } = formValues;
    const [Inventorys, setInventario] = useState([]);
    const [datos, setDatos] = useState([]);
    const [datosProveedor, setDatosProveedor] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inventario.length > 0 || grupo.length > 0 || cantidad.length > 0) {
            axios.post("http://localhost:9000/Inventario", formValues)
                .then(response => {
                    const datosD = response.data;
                    setInventario(a => datosD);
                    console.log(datosD);

                })
                .catch(error => console.log(error));
        }
    }

    const getDatos = (id, e) => {
        e.preventDefault();
        console.log(id);
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/InventarioDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatos(c => datosC);
                console.log(datosC);

            })
            .catch(error => console.log(error));
    }

    const getDatosProveedor=(id,e)=>{
        e.preventDefault();
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/ProveedorDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatosProveedor(c => datosC);

            })
            .catch(error => console.log(error));
    }


    const currencyFormat=(num)=>{ 
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className="container">
            <h1>Inventario</h1>
            <hr />
            <br></br>
            <h5> Búsqueda de productos por filtros</h5>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit}>
                <div className="Container">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependinventario"><strong>Producto:</strong></span>
                                </div>
                                <input
                                    name='inventario'
                                    type="text"
                                    className="form-control"
                                    value={inventario}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependinventario" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependgrupo"><strong>Categoria:</strong></span>
                                </div>
                                <input
                                    name='grupo'
                                    type="text"
                                    className="form-control"
                                    value={grupo}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependgrupo" />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependEntrega"><strong>Cantidad:</strong></span>
                                </div>
                                <input
                                    name="cantidad"
                                    type="number"
                                    className="form-control"
                                    value={cantidad}
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
                        <th scope="col">Nombre producto</th>
                        <th scope="col">Grupo que pertenece</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Inventorys.map((inventory) => (
                            <tr>
                                <td>{inventory.StockItemName}</td>
                                <td>{inventory.StockGroupName}</td>
                                <td>{inventory.QuantityOnHand}</td>
                                <td key={inventory.StockItemID}><center><button className="btn btn-primary" onClick={(e) => getDatos(inventory.StockItemID, e)} data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-check"></i></button></center></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Producto: </h5> {
                                datos.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.StockItemName}</h5>
                                ))
                            }
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                datos.map((data) => (
                                    <div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Código del proveedor" className="col-form-label"><b>Proveedor:</b></label>
                                                <button className="btn btn-link" role="link" onClick={(e) => getDatosProveedor(data.SupplierID, e)} data-toggle="modal" data-target=".bd-proveedorInfo-modal-lg">{data.SupplierName}</button>
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


            <div className="modal fade bd-proveedorInfo-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Proveedor: </h5> {
                                datosProveedor.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.SupplierName}</h5>
                                ))
                            }
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                datosProveedor.map((data) => (
                                    <div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Código del proveedor" className="col-form-label"><b>Código del proveedor:</b></label>
                                                <p id="Código del proveedor">{data.SupplierReference}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Sitioweb" className="col-form-label"><b>Sitio web:</b></label>
                                                <p id="Sitioweb"><a href={data.WebsiteURL}>{data.WebsiteURL}</a></p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Categoría:</b></label>
                                                <p id="telefono">{data.SupplierCategoryName}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Ciudad de entrega:</b></label>
                                                <p id="telefono">{data.CityName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Contacto primario:</b></label>
                                                <p id="telefono">{data.PrimaryContact}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Contacto secundario:</b></label>
                                                <p id="telefono">{data.AlternativeContact}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Código postal de entrega" className="col-form-label"><b>Código postal de entrega:</b></label>
                                                <p id="Código postal de entrega">{data.DeliveryPostalCode}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Teléfono:</b></label>
                                                <p id="telefono" >{data.PhoneNumber}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="FaxNumber" className="col-form-label"><b>Fax:</b></label>
                                                <p id="FaxNumber">{data.FaxNumber}</p>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Nombre del banco" className="col-form-label"><b>Nombre del banco:</b></label>
                                                <p id="Nombre del banco">{data.BankAccountName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Número de cuenta corriente:</b></label>
                                                <p id="telefono">{data.BankAccountNumber}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="Días de gracia para pagar" className="col-form-label"><b>Días de gracia para pagar:</b></label>
                                                <p id="Días de gracia para pagar">{data.PaymentDays}</p>
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