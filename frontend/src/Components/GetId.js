import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Edit from './Edit.js'

function GetId(props) {
    const location = useLocation();
    const navigate = useNavigate();

    function updateContactHandler(contact) {
        props.updateHandleFunction(contact);
        navigate(-1)
    }
    return (
        
        <Edit contact={location.state.contact} updateContactHandlerFunction={updateContactHandler} />
    )

}

export default GetId