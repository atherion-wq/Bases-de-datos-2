import React from 'react';
import './effects.css'
import { useForm } from '../../hooks/useForm';

export const FormWithCustomHook = () => {
    //useEffects: Es un hook que nos permitira ejecutar algun efecto secundario cuando algo suceda en nuestros componentes.
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password:''
    })
    const { name, email,password } = formValues;

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>FormWithCustomHook</h1>
            <hr />
            {/* <div className='container'> */}
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

                <div className='form-group'>
                    <input
                        type='password'
                        name='password'
                        className='form-control'
                        placeholder='*******'
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
            {/* </div> */}

            <button type='submit' className='btn btn-primary'>Guardar</button>

        </form>
    )
}
