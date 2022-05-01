import React,{useState,useEffect} from 'react'
import '../styles/login.css'
import {useHistory} from 'react-router-dom'
import Button from '@restart/ui/esm/Button';
function LoginForm({}) {
    const [details,setDetails] = useState({email:"",password:""});

    const submitHandler= e =>{
        e.preventDefault();
        Login(details);
    }
    const history = useHistory();
    const adminUser={
        email:"retake@gmail.com",
        password:"retake123"
      }
     
    const [error, setError] = useState("");
    const Login = details =>{
        console.log(details);
        if(details.email == adminUser.email && details.password == adminUser.password){
            history.push('/match')
            console.log("logged in");
          
        } else{
          console.log("Details do not match")
          setError("Details do not match")
        }
      }
    return (
        <form onSubmit={submitHandler}> 
            <div className="form-inner">
                <h2>Login</h2>
                {(error!="")?(<div className="error">{error}</div>):""}
               
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"name="email" id="email" onChange={e =>setDetails({...details,email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password"name="password" id="password" onChange={e =>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN" onClick={Login}/>
            </div>
        </form>
    )
}


export default LoginForm
