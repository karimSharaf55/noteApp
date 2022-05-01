import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {useNavigate} from 'react-router-dom'
export default function Register() {
    let navigate=useNavigate()
    const [erro, seterro] = useState('')
    const [isloading, setisloading] = useState(false)
    const [errolist, seterrolist] = useState([])

const [user, setuser] = useState({
  
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:'',

})
function getUser(e) {
    let myuser={...user}
    myuser[e.target.name]=e.target.value;
    setuser(myuser)
}

async function submitRigister(e) {
    e.preventDefault() 

    let validationResult=validateRegisterForm(user)

    if(validationResult.error)
    {
        setisloading(false)
         seterrolist(validationResult.error.details)
    }
    else
    {
        let {data} =await axios.post("https://route-egypt-api.herokuapp.com/signup",user)

        if (data.message==='success') {
         setisloading(false)
         navigate('/Login')
        }
        else{
            seterro(data.message)
            setisloading(false)
        }
    }
  
}

function validateRegisterForm(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
    });
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <div>


<div className="container my-5 py-5">
{errolist.map((erro,index)=>{
if (index ==4)
 {
    return <div key={index} className='alert alert-danger'> password invalid</div>
}
else
{
return <div key={index} className='alert alert-danger'>{erro.message}</div>
}

})}
                <div className="col-md-5 m-auto text-center">
                
                    <form onSubmit={submitRigister} >
                        <div className="form-group">
                            <input onChange={getUser}  placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group my-2 ">
                            <input onChange={getUser}  placeholder="Enter your name" name="last_name" type="text" className="form-control" />
                        </div>
                        <div className="form-group my-2 ">
                            <input onChange={getUser}  placeholder="age" name="age" type="number" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getUser}  placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input onChange={getUser}  placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                       
                        <button type='submit' className='btn btn-info'>{isloading?<i className='fas fa-spinner fa-spin'></i>:'register'}</button>
                        {erro&&<div className='alert alert-danger'>{erro}</div>}
                    </form>
                </div>
            </div>





    </div>
  )
}
