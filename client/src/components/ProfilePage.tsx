// src/components/Profile.tsx
import React, { useState } from 'react';                              
import { motion } from 'framer-motion';
import {  CalendarIcon,  TrashIcon } from '@heroicons/react/24/outline';
// import { UploadIcon } from 'lucide-react';
//  import { AuthProvider } from "../context/auth";
import { useAuthContext } from '../hooks/useAuth';
import { ConfirmationPopup } from './ConfirmationPopup';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const {  user } = useAuthContext();
    const navigate = useNavigate()
const [disable,setDisable] = useState(true)
const[email,setEmail]=useState(user?.email)
const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [username,setUserName]=useState(user?.name)
const [delaccount,setDelAccount] = useState('')
const handleEdit=()=>{
if(disable){
  setDisable(false)
  localStorage.setItem('disable','false')

}else{
  setDisable(true)
  localStorage.setItem('disable','true')

}
 
 
}

// const handleLogout = async () => {
//   try {
//     Cookies.remove()
//     sessionStorage.clear()
//     navigate('/login');
//   } catch (err) {
//     setError('Failed to logout. Please try again.');
//   }
// };

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });
    if (response.ok) {
      sessionStorage.clear()
      console.log('Logged out successfully');
      
      navigate('/')
      window.location.reload();
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

const handleDeleteAccount = async()=>{
  try{
  let response = await fetch('http://localhost:4000/auth/delete',{
    method:'DELETE',
    credentials: 'include'
   })
   response = await response.json()
   if(response.status ){
      setDelAccount("Your Account deleted successfully")
      sessionStorage.clear()
      localStorage.clear()
   }else{
    setDelAccount('Oops, something went very wrong')
   }

  }catch(error){
    console.log(error)
    setDelAccount('Oops, something went very wrong')
  }
   
}
  return (
    <div className="dark:bg-colorGradient2 p-12 md:py-14 2xl:h-screen 2xl:flex 2xl:items-center">
      
    <motion.div 
      className=" max-w-max mx-auto p-6   bg-white dark:bg-colorGradient1 rounded-lg dark:border border-gray-300 border-2 shadow-2xl space-y-4  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    > 
    
    <div className="flex flex-col items-center text-2xl font-bold text-gray-800 dark:text-white " >{localStorage.getItem('disable')==='false'? <>Edit your Profile</> :<>Profile Page</> }</div>
            <div className='flex justify-end'> <button onClick={handleEdit}><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill={"gray"} d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"/></svg> </button></div>
<div className="flex flex-col items-center">
      {/* Profile Picture */}
      <div className="relative ">

        {user?<img src={`${user?.profile}`} className="w-24 h-24 md:w-32 md:h-32 rounded-full "/>:<div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center md:w-32 md:h-32">
          <span className="text-gray-500">+</span>
        </div>}
        
      </div>
            <div className="flex flex-col items-center justify-center gap-8 ">
        <h2 className="text-2xl font-bold mt-6 ">{" " }</h2>
        <input className={`flex items-center justify-center  sm:w-full w-11/12 border  dark:bg-white border-gray-400 p-2 rounded-lg  ${localStorage.getItem('disable')==='false'? 'placeholder-gray-800 font-bold': 'placeholder-gray-400 '}`} placeholder={username} value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setUserName(e.target.value)}}  disabled={disable}/>
        <div className="flex flex-col items-center justify-center   gap-8">
        <input className={`flex items-center justify-center sm:w-full w-11/12 border  dark:bg-white border-gray-400 p-2 rounded-lg ${localStorage.getItem('disable')==='false'? 'placeholder-gray-800 font-bold': 'placeholder-gray-600 '}`} placeholder={email} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}  disabled={disable}/>
       </div><div className="flex items-center justify-center"> 
        <input className={`flex items-center justify-center sm:w-full w-11/12 dark:text-black border  dark:bg-white border-gray-400 p-2 rounded-lg ${localStorage.getItem('disable')==='false'? 'placeholder-gray-800 font-bold': 'placeholder-gray-600'}`} placeholder=' ************' disabled={disable} type="password" />
        </div>  
        
        <div className="flex items-center text-gray-600 dark:text-white">
          <CalendarIcon className="h-5 w-5 mr-1 " /> { user?.joinedDate && `Joined ${user?.joinedDate}` }
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-2 gap-4 w-full md:mt-6 md:grid-cols-3 p-4">
        <div className="text-center">
          <span className="block text-lg font-bold dark:text-gray-500 ">42</span>
          <span className="text-md font-bold dark:text-white text-gray-500">Shared Urls</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold dark:text-gray-500">1337</span>
          <span className="text-md font-bold dark:text-white text-gray-500">Generated Pdfs</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold dark:text-gray-500">420</span>
          <span className=" text-gray-500 dark:text-white text-md font-bold">Analytics Visited</span>
        </div>
      </div>

      {/* Recent Activity */}
    

      {/* Action Buttons */}
    { localStorage.getItem('disable')==='false'?   <button className="flex items-center px-4 py-2 text-white bg-blue-500 font-bold rounded hover:bg-blu7-600" onClick={handleEdit}>
        Save Changes
        </button> : <div className="flex justify-between w-full mt-6 space-x-4 py-6">
        <button className="flex items-center sm:px-4 sm:py-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"  onClick={() => setShowLogoutConfirm(true)} >
         Logout
        </button>
        <button className="flex items-center sm:px-4 sm:py-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-12"  onClick={() => setShowDeleteConfirm(true)} >
          <TrashIcon className="h-5 w-5 mr-1 " /> Delete Account
        </button>
       { delaccount}
      </div>}
      </div>
    </motion.div>

    <ConfirmationPopup
        isOpen={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout? "
        confirmText="Logout"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      isDel={false}
      />

<ConfirmationPopup
        isOpen={showDeleteConfirm}
        title="Delete Account"
        message="It's hard to say Good Bye 🥺.
         Are you sure you want to delete your account? "
        confirmText="Delete Account"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
        isDel={true}
      />
    </div>
  );
};

export default ProfilePage;
