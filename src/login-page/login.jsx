import React, { useState,useEffect} from 'react'
import './login.css'
import { useDispatch } from 'react-redux';
// import { Link} from "react-router-dom";
import { login } from '../Authentication/auth';
import { Link,useNavigate } from 'react-router-dom';



const Login = () => {
const [limit, setLimit] = useState({
        email: "",
        password: ""
      });

const [error,setError]=useState({})
const navigate =useNavigate();
const [loading,setLoading]=useState(false);
const dispatch = useDispatch();


  const handleChange=(e)=>{
    setLimit({
        ...limit,
           [ e.target.name] :e.target.value
        

    })
  }
 

  function checkError() {
    const neError = {};
  
    if (limit.email === "") {
      neError.email = "Please enter the email";
    } else if (!limit.email.includes("@")) {
      neError.email = "Please re-check your email";
    }
  
    if (limit.password === "") {
      neError.password = "Please enter the password";
    } else if (limit.password.length < 5) {
      neError.password = "Please enter a valid password";
    }
  
    setError(neError);
  
    return Object.keys(neError).length === 0;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Run after 50ms");
    }, 50);
  
    return () => clearTimeout(timer);
  }, [limit.email,limit.password]);
     

 const getUser =async()=>{
  const token = localStorage.getItem('token');
  const getServer= await fetch('https://barter-platform-backend.onrender.com/profile',{
     method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await getServer.json()
  console.log('get profile data',data)
 }


  const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = checkError();
  if (!isValid) return;

  setLoading(true);

  try {
    const server = await fetch("https://barter-platform-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(limit)
    });

    const data = await server.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      dispatch(login({ email: limit.email }));
      await getUser();
      navigate("/home");
    } else {
      setError({ password: data.message || "Login failed" });
    }

  } catch (error) {
    console.log(error);
    setError({ password: "Something went wrong, please try again" });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className='head-of-login'>
    <div className='in-head-1' >
     <div className='login-text'>LOGIN PAGE </div>
     <div style={{marginTop:"43px"}}>
      <form  className='inner-comp' onSubmit={handleSubmit} >

     
     <input 
     name='email'
     type='email'
     placeholder='Enter your name '
     onChange={handleChange}
     className='inner-comp-input'
     value={limit.email}


      />
      {
        error.email && (
            <p style={{ fontSize:"10px"}}>
             {error.email }
            </p>
        )
     }
       <input 
     name='password'
     type='password'
     placeholder='Enter password '
     onChange={handleChange}
     className='inner-comp-input'
     value={limit.password}

      />
       {
        error.password && (
      <p style={{fontSize:"10px"}}>
             {error.password }
            </p>
        )
     }
     <button
      type='submit'
      className='inner-comp-input-button'
      disabled={loading}
     >
     {loading? "Loading...":"Login"}
     </button>
     <Link to="/registration" style={{fontSize:"16px"}}> REGISTER HERE</Link>
     </form>
     </div>
    <div>
    </div>
    </div>
  </div>
)
}

export default Login



