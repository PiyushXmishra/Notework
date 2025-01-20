import axios from 'axios'
interface Heading{
    heading: string,
    index: number,
    onPdfGenerated:(state:number,value:boolean)=>void
}
import { useAuthContext } from '../../hooks/useAuth'
import {  useState } from 'react'
function Pdf({heading,index,onPdfGenerated}:Heading) {
    console.log(index)
    const [isDisable,setIsDisable]=useState(false)
    const {logout}=useAuthContext()
    const handleSubmit= async()=>{
        setIsDisable(true)
        try{
        const response= await axios.post('http://localhost:4000/ai/makePdf',
       { heading  } ,{
         withCredentials: true,
       }        

         )

         const activityJSON= sessionStorage.getItem('activity')
         if(!activityJSON ) throw new Error
         
        
         const Activity= JSON.parse(activityJSON)

         Activity.url[index]= response.data.data.url
         const updatedActivityJSON = JSON.stringify(Activity);
         sessionStorage.setItem('activity', updatedActivityJSON);
    onPdfGenerated(index,true)
        }catch(error){
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    logout()
                } else {
                    console.error('Error status:', error.response?.status, error.response?.data);
                }
            } else {
                 console.error('Unexpected error:', error);
             }
        }finally{
            setIsDisable(false)

        }
      }
    

  return (
    <div>

            { <button className="font-bold text-white flex gap-1 px-2 py-1.5 bg-gray-800 hover:bg-black dark:bg-colorGradient3 dark:text-white dark:hover:bg-hoverColor  rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={isDisable}>
          
            Create
           <p>Pdf</p> 
          
        </button>}
    
</div>  
  )
}

export default Pdf