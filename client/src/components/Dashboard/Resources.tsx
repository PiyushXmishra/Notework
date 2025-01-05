
import { useState } from "react";
import { AuthProvider } from "../../context/auth";
import { useAuthContext } from "../../hooks/useAuth";
import { Download } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
// import { Clipboard } from 'lucide-react';
export default function Resources() {
 
 
  const {activity} = useAuthContext()

  const [visibleItems, setVisibleItems] = useState<number>(5); // Show 5 items initially


  const handleSeeMore = () => {
    if(activity?.heading ){
    setVisibleItems((prev) =>
        Math.min(prev + 5, activity?.heading.length) 
  )
}

  };

  return (
    <AuthProvider>
    <div>
      <h1 className="text-2xl font-bold py-4 mt-4 flex-1 ml-4  mb-4 dark:text-white ">
        Resources
      </h1>
      <div className=" flex flex-col ml-5 gap-4 lg:w-11/12  w-10/12">
        {activity?.heading.slice(0,visibleItems).map((value,index) => (
          <ul
            className="flex flex-row border-gray-300  border  py-6 rounded-lg  max-sm:pl-5 justify-between pr-5 shadow-md hover:shadow-lg dark:bg-colorGradient1  dark:hover:bg-colorGradient1 hover:opacity-50  hover:bg-gray-100" key={index}
          >
            <li  className=" flex flex-row gap-2 rounded sm:w-full font-[600]  pl-4 dark:text-white ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.6em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="gray"
                  d="M5 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5.414a1.5 1.5 0 0 0-.44-1.06L9.647 1.439A1.5 1.5 0 0 0 8.586 1zM4 3a1 1 0 0 1 1-1h3v2.5A1.5 1.5 0 0 0 9.5 6H12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm7.793 2H9.5a.5.5 0 0 1-.5-.5V2.207z"
                />
              </svg>
           {value ? value: <h1 > List is empty.</h1>} 
            </li>
            
          <a className="pr-2" target="_blank" href={activity?.url[index] }>  <Download color="gray"  height="1.2em" /></a>
          <button className="pl-2">
          <EllipsisVertical color="gray"/></button>
        
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
