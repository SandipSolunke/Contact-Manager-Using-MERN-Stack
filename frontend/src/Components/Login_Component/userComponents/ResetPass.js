import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/api'

const ResetPass=(props)=>{
    const navigate=useNavigate();
    const [currPass,setcurrPass]= useState("")
    const [newPass,setnewPass]= useState("")
    const [res,setRes]= useState("NULL")
  
    const handleSubmit=event=>{
      event.preventDefault();
      
      const user={
        "username": props.username,
        "currPass": currPass,
        "newPass" : newPass
      }

      const registerUser=async()=>{
        const res=await api.post(`/${props.username}/ResetPassword`,user)
        setRes(res.data.massage);
        if(res.data.status){
            try {
                navigate(`/`+ user.username+"/home", {state: user});
            } catch (error) {
                console.log(error)
            }
        }
        else{
            alert(res.data.massage)
        }

      }

      registerUser()
    
      setcurrPass("")
      setnewPass("")
    };

    return(
        <div>
            <div className="signup-form">
                <form action="/examples/actions/confirmation.php" method="post" onSubmit={handleSubmit}>
                    <h2>Reset Password</h2>
                    <p>Please enter the password!</p>
                    <hr/>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="bi bi-key"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name="current_password" placeholder="current password" required="required" value={currPass} onChange={event => setcurrPass(event.target.value)}/>
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
                                <input type="text" className="form-control" name="new_password" placeholder="new password" required="required" value={newPass} onChange={event => setnewPass(event.target.value)}/>
                            </div>
                        </div>
  
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg">Reset</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPass