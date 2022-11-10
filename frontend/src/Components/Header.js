import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css"

const Header = (props) => {

    const username = props.username

    return (
        <div style={{ marginTop: "25px" }}>
            <div className="ui center aligned container">
                <div className="ui menu" style={{ height: "20px", background: "rgb(220, 255, 251)" }}>
                    <div className="item">
                        <i className="address book icon" style={{ fontSize: "28px" }}></i>
                        <div className="main_title">
                            <p>Contact Manager</p>
                        </div>
                    </div>

                    <div className="right menu" >
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <div className="item" onClick={() => localStorage.removeItem('username')}>
                                <div className="nav_heading">
                                    <p>Logout</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/" + props.username + "/ResetPassword"} style={{ textDecoration: "none" }}>
                            <div className="item" >
                                <div className="nav_heading">
                                    <p>Reset Pass</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/" + username + "/home"} style={{ textDecoration: "none" }}>
                            <div className="item" >
                                <div className="nav_heading">
                                    <p>Home</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/" + username + "/add"} style={{ textDecoration: "none" }}>
                            <div className="item">
                                <div className="nav_heading">
                                    <p>Add New</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div >
            <Outlet />
        </div>
    );
}

export default Header;
