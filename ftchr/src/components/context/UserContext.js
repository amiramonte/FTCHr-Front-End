// import React , {useContext, useState} from 'react'

import { createContext, useEffect, useState } from "react"

// const userContext = React.createContext();

// export function useUser() {
//     return useContext(userContext)
// 

// creation of the jwt token will update localstorage where u can grab the users data then put it into the userContext

// const INITIAL_STATE = {
//     user: null, 

// }


// create context
export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user,, setUser] = useState("");

    // useEffect to grab the data of the user
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}