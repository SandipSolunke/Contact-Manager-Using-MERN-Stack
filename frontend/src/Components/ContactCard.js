import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const { _id, name, email } = props.contact;
    return (
        <div className="item" style={{ verticalAlign: "center" }}>

            <div className="left floated content">
                <tr style={{ verticalAlign: "center" }}>
                    <td>
                        <i className="bi bi-file-person-fill" style={{ fontSize: "35px", color: "black", marginRight: "15px" }}></i>
                    </td>
                    <td style={{ textAlign: "left", verticalAlign: "center" }}>
                        <Link to={"/" + props.username + "/" + _id} style={{ textDecoration: "none" }} state={{ contact: props.contact }} >
                            <div><h4 style={{ color: "black" }}>{name}</h4></div>

                            <div style={{ marginTop: "5px", color: "black" }}><p><span style={{ fontWeight: "bold", color: "black" }}>Email : </span><span style={{ fontFamily: "unset", fontWeight: "bold", color: "brown" }}>{email}</span></p></div>
                        </Link>
                    </td>
                </tr>
            </div>

            <div className="right floated content" style={{ marginTop: "25px" }} >
                <div style={{ verticalAlign: "center" }}>
                    <Link to={"/" + props.username + "/" + _id + "/edit"} state={{ contact: props.contact }}>
                        <i className="edit alternate outiline icon" style={{ fontSize: "30px", color: "black", cursor: "pointer", marginRight: "15px" }}></i>
                    </Link>

                    <Link to={`/${props.username}/DeleteConfirmation/${_id}`} state={{ _id: _id }}>
                        <i className="trash alternate outiline icon" style={{ fontSize: "30px", color: "#c60000", cursor: "pointer" }}></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;