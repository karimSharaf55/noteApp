import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {useNavigate} from 'react-router-dom'
export default function Login(props) {
    let navigate=useNavigate()
    const [erro, seterro] = useState('')
    const [isloading, setisloading] = useState(false)
    const [errolist, seterrolist] = useState([])

const [user, setuser] = useState({
  
  
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

    let validationResult=validateLoginForm(user)

    if(validationResult.error)
    {
        setisloading(false)
         seterrolist(validationResult.error.details)
    }
    else
    {
        let {data} =await axios.post("https://route-egypt-api.herokuapp.com/signin",user)

        if (data.message==='success') {
            localStorage.setItem('userToken',data.token)
         setisloading(false)
         props.getuser()
navigate('/Home')

        }
        else{
            seterro(data.message)
            setisloading(false)
        }
    }
  
}

function validateLoginForm(user) {
    let schema = Joi.object({
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
                            <input onChange={getUser}  placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input onChange={getUser}  placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                       
                        <button type='submit' className='btn btn-info'>{isloading?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
                        {erro&&<div className='alert alert-danger'>{erro}</div>}
                    </form>
                </div>
            </div>





    </div>
  )
}
