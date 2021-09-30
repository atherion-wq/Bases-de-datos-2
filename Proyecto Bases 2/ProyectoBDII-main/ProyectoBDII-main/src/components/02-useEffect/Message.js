import React,{useEffect,useState} from 'react'

export const Message = () => {

    const [coords, setcoords] = useState({x:0,y:0})
    const {x,y}=coords;
    
    useEffect(() => {
        // console.log('Componente montado');
        const mouseMove=(e)=>{
            const coords={x:e.x,y:e.y};
            // console.log(coors);
            setcoords(coords);
        }

        window.addEventListener('mousemove',mouseMove);
        return () => {
            // console.log('Componente desmontado');
            window.removeEventListener('mousemove',mouseMove);
        }
    }, [])

    return (
        <div>
            <h3>Mi nombre es Daniel Villatoro!!</h3>
            <p>
                x:{x},y:{y}
            </p>
        </div>
    )
}
