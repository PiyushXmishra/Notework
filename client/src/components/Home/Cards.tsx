import Centre from "./Centre"
import Intro from "./Intro"
import Section from "./Sections";
import { FocusCards } from "../ui/focus-cards";

interface Cards{
  title:string,
  src:string,
  // button:string
}

function Cards() {

  const cards:Cards[]=[
    {  title:"Explore",
       src:"./../../images/explore.jpg"
    // button:"Get Started"
    },
    {
      title:"Transcribe",
      src:"./../../images/transcribe.jpg",
      // button:"Transcribe"
    },
    {
      title:"Dashboard",
      src:"./../../images/dashboard3.jpg",
      // button:"Personalized Reports"
    }
    
  ]
  

  return (
    
    <div className=" dark:bg-colorGradient2 ">
    <Intro/>
    <Centre/>
{/* <div className="flex flex-col gap-12 mx-auto w-4/6  md:w-9/12 md:flex md:flex-row md:justify-center md:gap-8 md:p-4 mt-20 ">
{/* <div className="flex flex-row justify-center py-4 gap-32 md:gap-12  lg:w-1/2 lg:w-1/8 lg:h-fit"> */}

{/* <div className="flex flex-col  border-4 items-center dark:border-colorGradient1 dark:bg-colorGradient1 text-xl mb-2 px-6 py-10  rounded-lg gap-8 transition-transform duration-300 ease-in-out transform hover:scale-105">
   
   <h2 className="font-bold dark:text-white  text-2xl   ">
  Explore
  </h2>
  <img src="./../../images/Designer (2).png"  className=" rounded-2xl  " alt="" />
   
  
  
  
  <button className="bg-zinc-900 hover:bg-black text-white rounded-2xl px-4 py-2 font-bold">Get Started </button> 
</div> 
<div className="flex flex-col  border-4 items-center dark:border-colorGradient1 dark:bg-colorGradient1 text-xl mb-2 px-6 py-10  rounded-lg gap-8 transition-transform duration-300 ease-in-out transform hover:scale-105"> <h2 className="font-bold dark:text-white  text-2xl"  >Transcribe</h2> 
<img src="./../../images/Designer (1).jpeg" width="1024" className="  rounded-2xl "alt="" />
<button className="bg-zinc-900 hover:bg-black text-white rounded-2xl px-4 py-2 font-bold">Transcribe</button> </div>
<div className="flex flex-col border-4 dark:border-colorGradient1 dark:bg-colorGradient1 text-xl mb-2 px-6 py-10  rounded-lg gap-8 transition-transform duration-300 ease-in-out transform hover:scale-105"> 
  <h2 className="font-bold dark:text-white  text-2xl  flex justify-center">Dashboard</h2>
  <img src="./../../images/Designer (3).png" alt="" className=" rounded-2xl" />
<button  className="bg-zinc-900 hover:bg-black rounded-2xl p-2 text-white font-bold">Personalized Reports</button>
</div>
</div> */} 
 {/* <div className=" flex-col gap-12 mx-auto w-4/6  md:w-9/12 md:flex md:flex-row md:justify-center md:gap-8 md:p-4 mt-20 " >
{
  
  cards.map((v,i)=>(

    <div className="flex flex-col   border-4 items-center dark:border-colorGradient1  dark:bg-colorGradient1 text-xl    rounded-lg gap-8 transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-gradient-to-r from-[#474540] via-[#1f1f1f] to-[#121212]" key={i}>

   
    {/* <h2 className="font-bold dark:text-white  text-2xl   ">
      {v.title}
      </h2> */}
      {/* <img src={v.image}  className="   " alt="" />
     {/* <button className="bg-zinc-900 hover:bg-black text-white rounded-2xl px-4 py-2 font-bold" >{v.button}</button>  */}
    
{/*      
     </div>
  ))
  
}

  </div>  */}

<FocusCards cards={cards} />;

<Section/>
</div>
  )
}

export default Cards