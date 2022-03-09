// import React , {useContext, useState} from 'react'

import { createContext, useEffect, useState } from "react"

// const userContext = React.createContext();

// export function useUser() {
//     return useContext(userContext)
// 

// grab user data from the jwt token after we verify and grab the user from the database

// const INITIAL_STATE = {
//     user: null, 

// }


// create context
export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState("");

    // useEffect to grab the data of the user
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}