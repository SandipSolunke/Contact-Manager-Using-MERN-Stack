import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import PageNotFound from "./PageNotFound";
import "./App.css"

const AddContacts = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const navigate=useNavigate()

    const addPostHandler = (e) => {
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All fields are mandatory..!");
        }
        else {

            setName('');
            setEmail('');
            const contact = { name: name, email: email, username: props.username }
            props.newcontact(contact);
        }
    };

    if (props.username) {
        return (
            <div style={{ marginTop: "20px", color: "#999", borderRadius: "3px", marginBottom: "15px", background: "rgb(220, 255, 251)", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)", padding: "30px" }}>
                <div className="ui main" style={{ marginTop: "20px" }}>

                    <div className="sub_heading">
                        <h1>Add Contacts</h1>
                    </div>

                    <div className="ui divider" style={{ borderTop: "1px dashed black" }}></div>
                    <form onSubmit={addPostHandler} className="ui form">
                        <div className="field">
                            <label className="ui left aligned container">Name :</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
                        </div>

                        <div className="field">
                            <label className="ui left aligned container">Email :</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                        </div>
                        <button className="ui button negative" style={{ background: "#19aa8d" }}>Add</button>
                    </form>
                    <div className="field">
                            <button className="ui button negative" onClick={() => navigate(-1)} style={{background:"#19aa8d", marginTop:"20px"}}>Back</button>
                    </div>
                </div>
            </div>
        );
    }
    else return (<PageNotFound />)
}

export default AddContacts;