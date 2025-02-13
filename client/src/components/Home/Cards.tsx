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


<FocusCards cards={cards} />;

<Section/>
</div>
  )
}

export default Cards