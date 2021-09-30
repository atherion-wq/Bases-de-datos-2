import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { MapContainer } from '../hooks/mapa';
import axios from 'axios';



export const Cliente = () => {

    const [formValues, handleInputChange, reset] = useForm({
        cliente: '',
        categoria: '',
        entrega: ''
    })
    const { cliente, categoria, entrega } = formValues;

    const [customers, setCustomers] = useState([]);

    const [datos, setDatos] = useState([]);

    const [datosUbicacion,setDatosUbicacion]=useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cliente.length > 0 || categoria.length > 0 || entrega.length > 0) {
            // const dataJson = JSON.stringify(formValues);
            // console.log(formValues);
            // console.log(dataJson);
            axios.post("http://localhost:9000/Clientes/", formValues)
                .then(response => {
                    const datosC = response.data;
                    setCustomers(cust => datosC);
                    // console.log(datosC);

                })
                .catch(error => console.log(error));
            // console.log(data);
        }
    }
    // const { register, handleSubmit } = useForm();

    const getDatosCliente = (id, e) => {
        e.preventDefault();
        id = {
            "id": id
        }
        // const dataJson = JSON.stringify(id);
        // console.log(id);
        axios.post("http://localhost:9000/ClienteDetalle/", id)
            .then(response => {
                const datosC = response.data;
                setDatos(cust => datosC);

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
            // console.log(datosUbicacion);
            })
            .catch(error => console.log(error));
    }


    return (
        <div className="container">
            <h1>Clientes</h1>
            <hr />
            <br></br>
            <h5> Búsqueda de clientes por filtros</h5>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit}>
                <div className="Container">
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrependCliente"><strong>Cliente:</strong></span>
                                </div>
                                <input
                                    name='cliente'
                                    type="text"
                                    className="form-control"
                                    value={cliente}
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
            <table className="table dt-responsive nowrap table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Método de entrega</th>
                        <th scope="col">Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer) => (
                            <tr key={customer.CustomerID}>
                                <td key={customer.CustomerName}>{customer.CustomerName}</td>
                                <td key={customer.CustomerCategoryName}>{customer.CustomerCategoryName}</td>
                                <td key={customer.DeliveryMethodName}>{customer.DeliveryMethodName}</td>
                                <td key={customer.CustomerID}><center><button className="btn btn-primary" onClick={(e) => getDatosCliente(customer.CustomerID, e)} data-toggle="modal" data-target=".bd-example-modal-lg"><i className="fa fa-check"></i></button></center></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cliente: </h5> {
                                datos.map((data) => (
                                    <h5 key="clienteName" className="modal-title">{data.CustomerName}</h5>
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
                                                <p id="telefono">{data.PrimaryContact}</p>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Contacto secundario:</b></label>
                                                <p id="telefono">{data.AlternativeContact}</p>
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
                                                <p id="telefono">{data.CustomerAddress}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Ciudad de entrega:</b></label>
                                                <p id="telefono">{data.CityName}</p>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="telefono" className="col-form-label"><b>Código postal:</b></label>
                                                <p id="telefono">{data.PostalPostalCode}</p>
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
