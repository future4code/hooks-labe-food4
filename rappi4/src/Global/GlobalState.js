import { useState } from "react";
import { BASE_URL } from "../Constants/url"
import axios from "axios";
import GlobalStateContext from "../Global/GlobalStateContext"

const GlobalState = (props) => {


    const data = {
        
    }


    return (
        <GlobalStateContext.Provider value={data}>
            {props.children}
        </GlobalStateContext.Provider>   
    )
}

export default GlobalState; 