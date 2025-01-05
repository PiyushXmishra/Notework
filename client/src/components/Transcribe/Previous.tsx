
import { useState } from "react";
import { AuthProvider } from "../../context/auth";
import { useAuthContext } from "../../hooks/useAuth";

function Previous() {

   const {activity} = useAuthContext()
   const [currentIndex, setCurrentIndex] = useState(0);
   const itemsPerPage = 4; // Number of items per page
  
  return (
    <AuthProvider>
    <div className="flex flex-col justify-center gap-10 py-12">
      <h1 className=" flex justify-center text-2xl font-bold dark:text-white">Previous Visited</h1>
      <div className="md:flex md:flex-row md:justify-center md:items-center md:gap-8 md:ml-10 md:mr-10 flex flex-col items-center md:w-11/12 w-4/5 mx-auto gap-20">  
      <div className="">
        <button
          onClick={()=>{ setCurrentIndex(currentIndex - 1)}}
          disabled={currentIndex === 0}
          className="absolute left-0  px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300 transform -translate-y-1/2"
        >
          {"<"}
        </button>
        <button
          onClick={()=>{setCurrentIndex(currentIndex + 1)}}
          disabled={currentIndex + itemsPerPage >= (activity?.thumbnail.length|| 0)}
          className="absolute right-0  px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300 transform -translate-y-1/2"
        >
           {">"}
        </button>
      </div>
 
   {activity?.thumbnail.slice(currentIndex, currentIndex + 4).map((value,key)=>(
    <div className="border-2 border-gray-300 rounded  h-10/12" key={key}>
    <img src={value} alt="hi" />
    <p key={key} className="dark:text-white p-2 flex justify-center">{activity?.heading[key]}</p>
</div> 
         
   ))}
      
      
      </div>

      {/* <button className="dark:text-white font-bold" onClick={fetchActivity}> See more...</button> */}
      
   
    </div>
    </AuthProvider>
  );
}

export default Previous;
