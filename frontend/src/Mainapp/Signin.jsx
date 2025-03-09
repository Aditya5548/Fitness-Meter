import React, { useEffect, useState } from 'react';
import Navbar from '../Elements/Navbar';
import { useNavigate } from 'react-router-dom'
function Signin(){
    const [email , setEmail]=useState("")
    const [password , setPassword]=useState("")
    let [msg , setMsg]=useState("")
    const navigate=useNavigate()
       //validation start
        const validate =()=>{
            if(localStorage.getItem('user')){
                navigate('/Userdash')
            }
        }
        //calling validation
        useEffect(()=>{
            validate()
        },[])
    
        //validation end



    const logcode =async(e)=>{
        e.preventDefault()
        const user={email,password}
        console.log(user)
        var response=await fetch('https://fitness-meter.onrender.com/userlog',{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }  
        })
        const d=await response.json()
        console.log(d)
        if(d.msg=="Login Success.."){
            setMsg("Login Successs")
            setEmail("")
            setPassword("")
            localStorage.setItem('user',d.id)
            localStorage.setItem('username',d.name)
            navigate("/Userdash")   
        }
        else{
            setMsg(d.msg)
            setEmail("")
            setPassword("")
         }
    }
    
    return (
        <>
        <Navbar />
        <br /><br />
        <div className="row my-5 ">
            <div className="col-sm-7 col-md-4 text-center mx-auto signinbg">
               <h2 className='fw-bold '>Log in</h2> 
               <p className='small'>Don't Have an account.<a href="/Signup">Signup</a></p>
               <form action=""  onSubmit={logcode} >

               <span className='text-danger'><h4>{msg}</h4></span>
               <br />
                <input type="email" id="name" placeholder='Enter Email'  value={email} onChange={(e)=>{setEmail(e.target.value)}}  className='w-75 shadow-lg workoutname'/>
                <br /><br />
                <input type="password" id="pass"  placeholder='Enter Passward' value={password} onChange={(e)=>{setPassword(e.target.value)}}   className='w-75 shadow-lg workoutname'/>
                <br /><br />
                <p><a href="">Forgot Passward</a></p>
                <input type="submit" value="LOGIN" className="btnview"/>
    
                </form>

            </div>
        </div>
        </>
    );
}

export default Signin;
