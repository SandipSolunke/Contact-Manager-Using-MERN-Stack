import {useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom'

import api from '../../api/api'
import './Register.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const Register = () => {
    const navigate=useNavigate()
    const [username,setUsername]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [confirmPassword,setConfirmPassword]= useState("")
    const [res,setRes]= useState("NULL")
  
    const handleSubmit=event=>{
      event.preventDefault();
      
      const user={
        "username":username,
        "email": email,
        "password" : password
      }
    
      const registerUser=async()=>{
        const res=await api.post("/register",user)
        console.log(res.data.massage)
        setRes(res.data.massage)
        if(res.data.status){
            navigate("/login")
        }
      }
      registerUser()
    
  
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    };
    
    return (
        <div>
            <div className="signup-form">
                <form action="/examples/actions/confirmation.php" method="post" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr/>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={event => setUsername(event.target.value)} value={username}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                </div>
                                <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" value={email} onChange={event => setEmail(event.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-key"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name="password" placeholder="Password" required="required" value={password} onChange={event => setPassword(event.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-key"></i>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" value={confirmPassword} onChange={event=> setConfirmPassword(event.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                        </div>
                </form>

                <div className="text-center">
                    Already have an account? 
                    <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    )
}


export default Register