import {useLocation,Link } from 'react-router-dom'

function UserHome(){
    const location = useLocation();
    return(
        <div>
            <p>Logged in as {location.state.username}</p>
            <Link to="/">
                <button>Click here to logout</button>
            </Link>
            <br></br>

            <Link to={`/${location.state.username}/ResetPassword`} state= {{username :location.state.username}}>
                <button>Click here to reset password</button>
            </Link>
        </div>
    )
}

export default UserHome