import React, { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SidebarUser from '../Elements/SidebarUser';
import feed1 from '../assets/feed1.jpeg'
function Addfeed(){
    const navigate=useNavigate()
        let [Name , setName]=useState("")
        let [Email, setEmail]=useState("")
        let [message , setMessage]=useState("")
        let [type , setFtype]=useState("")
        let [msg , setMsg]=useState("")

        let regcode=async (e)=>{
            e.preventDefault()
            const user={Name,Email,message,type}
            console.log(user)
            var response=await fetch('http://localhost:4000/feed',{
                method:'POST',
                body:JSON.stringify(user),
                headers:{
                    'Content-Type':'application/json'
                }  
            })
            const d=await response.json()
            console.log(d)
            if(d.msg){
                setMsg(d.msg)
                setName("")
                setEmail("")
                setFtype("")
                setMessage("")

                //navigate("/Signin")
            }
            else{
                setName("")
                setEmail("")
                setFtype("")
                setMessage("")
            }
        }


        const validate =()=>{
            if(!localStorage.getItem('user')){
                navigate('//Userdash')
            }
        }
        //calling validation
        useEffect(()=>{
            validate()
        },[])
    
        //validation end
   

    return (
     <>
     <SidebarUser />
     <div className="adminlogout">
        <div>
        <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">≡</button>
        </div>
        <div>
           Hey,  {localStorage.getItem('username')}
           &nbsp;&nbsp;
          <button className="btnset2" onClick={()=>{localStorage.removeItem('user') ,navigate('/Signin')}}>Logout</button>
        </div>
     </div>
     <br />
     <div className="row justify-content-center align-items-center">
        <div className="col-md-4 ">
        <img src={feed1} alt="" className='w-100 shadow-lg p-2 rounded-5'/>
        </div>
        <div className="col-md-4 py-5">  
            <form action="" onSubmit={regcode} >
            <center>
                <h2 className='fw-bold '>Give Feedback</h2> 
                <br/>
                <span className='text-danger'><h4>{msg}</h4></span>
                <input type="name" id="name" value={Name} onChange={(e)=>{setName(e.target.value)}}   placeholder='Enter Name' className='w-75 text-start shadow-lg workoutname'/>
                <br /><br />
                <input type="email" id="email"  value={Email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter Email' className='w-75 text-start shadow-lg workoutname'/>
                <br /><br />
                <select name="" value={type} onChange={(e)=>{setFtype(e.target.value)}}  className='w-75 shadow-lg workoutname'>
                    <option value="Value">Value</option>
                    <option value="Negative">Negative</option>
                    <option value="Postive">Positive</option>
                    <option value="Complain">Complain</option>
                    <option value="Suggestion">Suggestion</option>
                    
                </select><br /><br />
                <textarea id="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  placeholder='Enter Number' rows="4" cols="40" className="workoutname2"/>
                <br /><br />
                <input type="submit" value="Summit Response" className="btnview"/>
            </center>
        </form>
            
        </div>
     </div>
     
     
       
     </>
    );
}

export default Addfeed;
