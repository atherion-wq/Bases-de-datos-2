import React,{useContext} from 'react';
import { UserContext } from './UserContext';

export const LoginScreen = () => {
    const {setuser} = useContext(UserContext);

    return (
        <div>
            <h1>LoginScreen</h1>
            <hr/>
            <button 
            className="btn btn-primary"
            onClick={()=>setuser(
                {
                    id:123,
                    name:'Daniel Villatoro'
                }
            )}
            >
                Login
            </button>
        </div>
    )
}
