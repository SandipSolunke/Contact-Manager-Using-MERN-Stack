import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function DeleteConfirmation(props) {
    const navigate = useNavigate()
    const location = useLocation();
    const { _id } = location.state

    return (
        <div className="ui center aligned container" style={{ marginTop: "250px" }}>
            <div className="ui center aligned container"><h2>Delete?</h2></div>
            <div className="actions">
                <div className="ui deny button" onClick={() => { navigate(-1) }}>
                    Cancel
                </div>
                <div className="ui negative right labeled icon button" onClick={() => props.clickHandler(_id)}>
                    Ok
                    <i className="trash alternate icon" ></i>
                </div>
            </div>
        </div>
    );
}


export default DeleteConfirmation;