import React, { useState } from 'react'
import { AppRouter } from './AppRouter';
import { UserContext } from './UserContext';

export const MainApp = () => {
    // const user={
    //     id:1234,
    //     name:'Daniel',
    //     email:'danielvillatoroc@gmail.com'
    // }
    const [user, setuser] = useState({});


    return (
        <UserContext.Provider value={{
            user,
            setuser
        }}>
            <AppRouter />
        </UserContext.Provider>
    )
}

