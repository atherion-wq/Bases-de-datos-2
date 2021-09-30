import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { MapContainer } from '../hooks/mapa';
import axios from 'axios';


export const Proveedor = () => {


    const [formValues, handleInputChange, reset] = useForm({
        proveedor: '',
        categoria: '',
        entrega: ''
    })
    const { proveedor, categoria, entrega } = formValues;

    const [datos, setDatos] = useState([]);
    const [datosUbicacion,setDatosUbicacion]=useState();

    const [deliveri, setDelivery] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (proveedor.length > 0 || categoria.length > 0 || entrega.length > 0) {
            console.log(formValues);
            // console.log(dataJson);
            axios.post("http://localhost:9000/Proveedor", formValues)
                .then(response => {
                    const datosD = response.data;
                    setDelivery(a => datosD);
                    console.log(datosD);

                })
                .catch(error => console.log(error));
        }
    }


    const getDatos = (id, e) => {
        e.preventDefault();
        id = {
            "id": id
        }
        axios.post("http://localhost:9000/ProveedorDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatos(c => datosC);
                console.log(datosC);
                const [detalles]=datosC;
                const {DeliveryLocation}=detalles;
                const {points}=DeliveryLocation;
                const [pointsData]=points;
                const {x,y}=pointsData;
                setDatosUbicacion(
                    {
                        name: "Location 1",
                        location: {
                            lat: x,
                            lng: y
                        },
                    }
                );

            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container">
            <h1>Proveedor</h1>
            <hr />
            <br></br>
            <h5> Búsqueda de proveedores por filtros</h5>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit}>
                <div className="Container">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependCliente"><strong>Proveedor:</strong></span>
                                </div>
                                <input
                                    name='proveedor'
                                    type="text"
                                    className="form-control"
                                    value={proveedor}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependCliente" />
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependCategoria"><strong>Categoría:</strong></span>
                                </div>
                                <input
                                    name='categoria'
                                    type="text"
                                    className="form-control"
                                    value={categoria}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroupPrependCategoria" />
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
                            <button className='btn btn-warning' onClick={reset}>Reset</button>
                        </div>
                    </div>
                </div>
            </form>
            <br></br>
            <hr></hr>
            <table className="table dt-responsive nowrap table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Nombre Proveedor</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Método de entrega</th>
                        <th scope="col">Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deliveri.map((deliveri) => (
                            <tr>
                                <td>{deliveri.SupplierName}</td>
                                <td>{deliveri.SupplierCategoryName}</td>
                                <td>{deliveri.DeliveryMethodName}</td>
                                <td key={deliveri.SupplierID}><center><button className="btn btn-primary" onClick={(e) => getDatos(deliveri.SupplierID, e)} data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-check"></i></button></center></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>



            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Proveedor: </h5> {
                                datos.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.SupplierName}</h5>
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
                            <h3>Localización:</h3>
                            <MapContainer location={[
                                datosUbicacion
                            ]} />
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
