
import {  useState } from "react";
import { AuthProvider } from "../../context/auth";
import { useAuthContext } from "../../hooks/useAuth";
import { Download,File } from 'lucide-react';
import Pdf from "../Transcribe/Pdf";
export default function Resources() {
  const {activity} = useAuthContext()
  const [visibleItems, setVisibleItems] = useState<number>(5); 
  const [update,setUpdate]=useState<boolean[]>([])
  
  const handleSeeMore = () => {
    
    if(activity?.heading ){
    setVisibleItems((prev) =>
        Math.min(prev + 5, activity?.heading.length) 
       )}
    };

    const handleUpdate=(state:number,value:boolean)=>{ 
      const newUpdate= [...update]
      newUpdate[state]=value
     setUpdate(newUpdate)
    }
   console.log(update)


  return (
    <AuthProvider>
    <div>
      <h1 className="text-2xl font-bold py-4 mt-4 flex-1 ml-4  mb-4 dark:text-white ">
        Resources
      </h1>
      <div className=" flex flex-col ml-5 gap-4 lg:w-11/12  w-10/12">
        {activity?.heading.slice(0,visibleItems).map((value,index) => (
          <ul
            className="flex sm:flex-row flex-col sm:gap-0 gap-4 border-gray-300 dark:border-none border  dark:shadow-colorGradient4 shadow-sm hover:shadow-md  transition-shadow duration-200    py-6 rounded-lg  max-sm:pl-5 justify-between pr-5   dark:bg-colorGradient1   " key={index}
          >
            <div className="flex">
              <div className="flex-shrink-0 w-12 flex justify-center">
          
            <File className="w-5 h-6 text-gray-800 dark:text-gray-400 "/>
            </div>
            <li  className=" flex flex-row gap-2 rounded sm:w-full font-[600]  pl-4 dark:text-white text-gray-800">
              {value ? value: <h1 > List is empty.</h1>} 
            </li>
            </div>
                 <a className="pr-2" target="_blank" href={activity?.url[index] }> { (activity?.url[index]===null && (!update[index] ) ? <Pdf heading={activity?.heading[index]} index={index} onPdfGenerated ={handleUpdate} />:<Download className="w-5 h-6 text-gray-800 dark:text-gray-400 sm:mx-0 mx-4 sm:my-0 my-1" />)}</a>
            </ul>
        ))}
      </div>
      { activity?.heading && (visibleItems < activity?.heading?.length) &&  (
      <div className="flex flex-col justify-center gap-4">
              <p className="dark:text-white flex justify-center p-6">{visibleItems} of {activity?.heading.length}</p>
              <button onClick={handleSeeMore} className="flex justify-center font-bold dark:text-white "> See More</button>
      </div>
      )}
    </div>
   
    </AuthProvider>
  );
}
