// import React , {useContext, useState} from 'react'

import { createContext, useEffect, useState } from "react"

// const userContext = React.createContext();

// export function useUser() {
//     return useContext(userContext)
// 

// creation of the jwt token will update localstorage where u can grab the users data then put it into the userContext

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, 

}


// create context
// const [user, setUser] = useState("")
// export const UserContext = createContext({user, setUser,
//     login: (user_name) => {
//         setUser(user_name)
//         console.log(user);
//     }
// })

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState("");


    // useEffect to grab the data of the user
    // make another fetch request

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}