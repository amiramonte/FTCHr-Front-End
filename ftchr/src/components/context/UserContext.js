import React , {useContext, useState} from 'react'

const userContext = React.createContext();

export function useUser() {
    return useContext(userContext)
}