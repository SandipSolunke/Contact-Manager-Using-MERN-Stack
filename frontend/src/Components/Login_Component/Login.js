import './Register.css'
import { useState } from 'react'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [res, setRes] = useState("NULL")

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            "username": username,
            "password": password
        }

        const loginUser = async () => {
            const res = await api.post("/login", user)

            setRes(res.data.massage)
            if (res.data.massage === "Success") {
                props.getUsername(user.username)
                navigate(`/` + user.username + '/home', { state: user })
            }
            else {
                console.log(res.data)
                alert(res.data.massage)
            }
        }

        loginUser()


        setUsername("")
        setPassword("")
    };

    return (
        <div className='body'>
            <div className="signup-form">
                <form action="/examples/actions/confirmation.php" method="post" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <p>Please enter the username and password to login!</p>
                    <hr />
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={event => setUsername(event.target.value)} value={username} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-key"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="password" placeholder="Password" required="required" value={password} onChange={event => setPassword(event.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Login