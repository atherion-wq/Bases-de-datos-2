import React, { Fragment, useState,useEffect } from 'react';
import './effects.css'
import { Message } from './Message';

export const SimpleForm = () => {
    //useEffects: Es un hook que nos permitira ejecutar algun efecto secundario cuando algo suceda en nuestros componentes.
    const [formState, setformState] = useState({
        name: '',
        email: ''
    })
    const { name, email } = formState;
    //Para que el useEffect se dispare solo una ves, podemos agregar un arrglo vacio al final
    useEffect(() => {
        // console.log("HOLA");
    },[]);

    useEffect(() => {
        // console.log("FormState cambio");
    },[formState]);

    useEffect(() => {
        // console.log("Email cambio");
    },[email ]);

    const handleInputChange=({target})=>{
        // console.log(target.name);
        // console.log(target.value);
        setformState({
            ...formState,
            [target.name]:target.value
        })
    }


    return (
        <Fragment>
            <h1>UseEffect</h1>
            <hr />
            <div className='container'>
                <div className='form-group'>
                    <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Tu nombre'
                        autoComplete='off'
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        name='email'
                        className='form-control'
                        placeholder='email@gmail.com'
                        autoComplete='off'
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {(name==='Daniel') && <Message/>}

        </Fragment>
    )
}
