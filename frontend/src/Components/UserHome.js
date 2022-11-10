import { React, useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import PageNotFound from "./PageNotFound";
import "./App.css"

import api from "../api/api";

const ContactList = (props) => {
    const [contacts, newstate] = useState([]);

    const username = props.username
    var flag = false
    if (username) {
        flag = true;
    }

    const retrieveContacts = async (userName) => {
        const response = await api.post("/", { username: userName });
        return response.data.data;
    };

    const removeContact = (id) => {
        props.getContactId(id);
    };

    const rendercontactlist = contacts.map((contact) => {
        return (
            <ContactCard contact={contact} username={username} clickHandler={removeContact} key={contact.name} />
        )
    })

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts(username);
            if (allContacts) newstate(allContacts);
        };
        getAllContacts();
    }, []);

    if (flag) {
        return (
            <div style={{ marginTop: "20px", borderRadius: "3px", marginBottom: "15px", background: "rgb(220, 255, 251)", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)", padding: "30px" }}>
                <div className="sub_heading">
                    <h1>Contacts</h1>
                </div>
                <div className="ui divider" style={{ borderTop: "1px dashed black" }}></div>
                <div className="ui middle aligned divided list">
                    {rendercontactlist}
                    <div className="ui divider" style={{ borderTop: "1px dashed black" }}></div>

                </div>
            </div>
        );
    }
    else return (<PageNotFound />)
}

export default ContactList;