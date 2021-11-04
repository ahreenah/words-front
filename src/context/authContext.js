import { createContext } from "react";

export default createContext({
    token:'aaaa',
    setToken(v){
        this.token='bbb'
    }
})