import React, { Fragment,useState } from 'react'

export const CounterApp = () => {

    const [state, setState] = useState({
        counter1:10,
        counter2:20,
        counter3:30,
    });

    const {counter1,counter2}=state;
    // console.log(counter);

    return (
        <Fragment>
            <h1>Contador1 {counter1}</h1>
            <h1>Contador2 {counter2}</h1>
            <hr/>
            <button className="btn btn-primary" 
            onClick={()=>{
                setState({
                    ...state,             //OPERADOR QUE COPIA LOS ESTADOS ANTERIORES
                    counter1:counter1+1
                });
            }}>
                +1
            </button>
        </Fragment>
    )
}
