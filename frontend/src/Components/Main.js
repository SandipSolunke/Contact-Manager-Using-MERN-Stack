import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Register from './Login_Component/Register';
import Login from './Login_Component/Login';
import ResetPass from './Login_Component/userComponents/ResetPass';

import Home from './Home';
import Header from "./Header";
import AddContacts from './AddContacts';
import UserHome from "./UserHome";
import ContactDetails from "./ContactDetails";
import DeleteConfirmation from "./DeleteConfirtamation";
import GetId from "./GetId";
import api from "../api/api";
import PageNotFound from './PageNotFound';

const Main = (props) => {
    const navigate = useNavigate();
    const [contacts, newstate] = useState([]);
    const [username, setUsername] = useState("")

    const getUsernameFromLocalStorage = async () => {
        const un = localStorage.getItem('username')

        if (un) setUsername(un)
    }

    const getUsername = (name) => {
        setUsername(name)
        localStorage.setItem('username', name);
    }

    //fetch contacts from json server
    const retrieveContacts = async () => {
        // const response = await api.get("/");
        // return response.data;
    };


    //Update Contact Handling Function
    const updateContactHandler = async (updatedContacts) => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) newstate(allContacts);
        };

        await api.put("/update/" + updatedContacts._id, { data: { name: updatedContacts.name, email: updatedContacts.email }, username: { username } }).then((res) => {
            if (res.data.status) getAllContacts()
            else console.log(res.data.massage)
        })

    };

    //Add new Contact Handling Function
    const addNewContact = async (contact) => {
        const response = await api.post("/" + contact.username + "/add", contact)
        newstate([...contacts, response.data])
    }

    //Remove Contact Handling Function
    const removeContact = async (id) => {
        await api.delete("/delete/" + id, { data: { username: username } });

        const newConctactList = contacts.filter((contact) => {
            return contact._id !== id;
        });

        newstate(newConctactList);
        navigate(-1);
    }

    //Update Contact List On every change
    if (!username) getUsernameFromLocalStorage();
    useEffect(() => {

        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) newstate(allContacts);
        };

        getAllContacts();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/">
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="login" element={<Login getUsername={getUsername} />} />
                    <Route path=":id/ResetPassword" element={<ResetPass username={username} />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route path="/:username" element={<> <Header username={username} /> </>} >
                    <Route path="home" element={<UserHome username={username} />} />
                    <Route path="add" element={<AddContacts newcontact={addNewContact} username={username} />} />
                    <Route path=":id" element={<ContactDetails />} />
                    <Route path="DeleteConfirmation/:id" element={<DeleteConfirmation clickHandler={removeContact} />} />
                    <Route path=":id/edit" element={<GetId updateHandleFunction={updateContactHandler} />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Main