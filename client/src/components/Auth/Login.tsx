import { useEffect, useState} from "react"
import { useAuthContext } from "../../hooks/useAuth"
import ContinuewithGoogle from "./ContinuewithGoogle"
import { NavLink, useNavigate } from "react-router-dom"
export default function Login() {
  const [formdata,setFormData] = useState({
    email:"",
    password: "",
  })
  const navigate= useNavigate()
  const {user} = useAuthContext()
const [message,setMessage] = useState('')
const {isAuthenticated,setIsAuthenticated} = useAuthContext()
const handleChange= async(e: { target: { name: string; value:string| number  } })=>{
  const {name,value} = e.target
  setFormData({
    ...formdata,
    [name]:value
  })
}
const handleLogin= async(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
try {
  const response =  await fetch("http://localhost:4000/auth/login",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formdata),
    credentials:'include'
  })
  const data = await response.json()
  console.log(data,"login response")
  if(data.status !== "success")   return new Error
  setIsAuthenticated(true)
    setMessage(data.user)
   
  }catch(e){
   console.log(e)
   setMessage("Something went very wrong")
}}

useEffect(()=>{
  if(user) navigate('/dash')
})

  return (
  
    <div className="dark:bg-colorGradient2 ">
 { (message  || isAuthenticated)?<div className="flex justify-center items-center dark:text-white"> 
  <h1>Welcome Back  {message} !!</h1>
  
  {/* : <h1>Oops 😔 ! &nbsp;  {message} !!</h1> */}
  
  
   </div>  :
   <div className=" min-h-screen flex  justify-center items-center py-8">
   <div className=" flex items-center justify-center p-11 flex-col border-2 border-gray-400 w-full max-w-md   rounded-lg " >
   <h1 className="text-2xl mb-3 dark:text-gray-300"> Hello <b className="dark:text-white">Notework User </b></h1> 
   <span className="text-gray-700 text-base dark:text-gray-400"> Login to your account and use notework at its full potential. </span>
    <form className="p-6 " 
     onSubmit={handleLogin}
    > 
  <div className="flex flex-col gap-1.5 dark:text-white">
  <label htmlFor="email address" className="text-gray-600 dark:text-gray-300">
   Email Address
  </label>
   <input type="email" id="email" name="email" value={formdata.email}  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border-gray-400 dark:text-white  font-semibold dark:placeholder-gray-400 placeholder-gray-500 border  dark:bg-colorGradient1 focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2" placeholder="you@example.com"
     onChange={handleChange}
     required
   />
</div>
<div className="flex flex-col py-4 gap-1.5 dark:text-white">
  <label htmlFor=" password" className="text-gray-600 dark:text-gray-300"> Password</label>
  <input type="password" id="password" name="password" value={formdata.password} placeholder="••••••••" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 dark:placeholder-gray-400 placeholder-gray-500 dark:text-white font-semibold dark:bg-colorGradient1"
    onChange={handleChange}
    required />
</div>

{/* <div className=" bg-colorGradient2  text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-black flex items-center justify-center dark:bg-colorGradient1 " >  */}
<button  className="bg-colorGradient2  text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-black flex items-center justify-center dark:bg-colorGradient1 w-full" >Log In</button>  
{/* </div> */}
<NavLink to="/forgotPassword"><p className=" flex justify-center  mt-2 py-2 underline text-blue-600 dark:text-blue-400">Forgot Password ?</p>  </NavLink>
<div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center ">
            <span className="px-2 bg-white dark:bg-colorGradient2 text-gray-500">Or continue with</span>
          </div>
        </div>
<ContinuewithGoogle/>
    </form>

    </div>
    </div>}
    </div>
 
)
}  


