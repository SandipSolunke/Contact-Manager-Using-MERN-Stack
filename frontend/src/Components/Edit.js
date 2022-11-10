import React from 'react'
import { Component } from "react";
import { Navigate } from 'react-router-dom';
import "./App.css"

class Edit extends Component {

    constructor(props) {
        super(props);
        const { _id, name, email } = props.contact
        this.state = {
            _id,
            name,
            email,
        };
    }

    update = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are mandatory..!");
        }

        else {
            this.props.updateContactHandlerFunction(this.state);
            this.setState({ _id: "", name: "", email: "", flag: true });
        }
    };

    textChange = (name, e) => {
        console.log(this.history)
        this.setState({
            [name]: e.target.value,
        });
    };

    render() {
        return (
            <div style={{ marginTop: "20px",color: "#999", borderRadius: "3px", marginBottom: "15px", background: "#fff", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)", padding: "30px" }}>
            <div className="ui main" style={{ marginTop: "20px" }}>
                <div className="sub_heading">
                    <h1>Edit Contact</h1>
                </div>

                <div className="ui divider" style={{ borderTop: "1px dashed black" }}></div>

                <form onSubmit={this.update} className="ui form">
                    <div className="field">
                        <label className="ui left aligned container">Name :</label>
                        <input type="text" value={this.state.name} onChange={this.textChange.bind(this, "name")} placeholder="Name"></input>
                    </div>

                    <div className="field">
                        <label className="ui left aligned container">Email :</label>
                        <input type="email" value={this.state.email} onChange={this.textChange.bind(this, "email")} placeholder="Email"></input>
                    </div>
                    <button className="ui button negative" style={{background:"#19aa8d"}}>Update</button>
                </form>
                   
            </div>
            </div>
        )
    }
}

export default Edit;