import BarChartComponent from "../components/Dashboard/BarChartComponent";
import Recommendations from "../components/Dashboard/Recommendations";
import Resources from "../components/Dashboard/Resources"
import Analytics from "../components/Dashboard/Analytics";
import { ThemeProvider } from "../context/Theme";
import { useThemeButton } from "../hooks/useTheme";
import { Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const Dashboard: React.FC = () => {
  const {darkMode}=useThemeButton()
  const analysisRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  console.log(darkMode,"Dashboard")
  useEffect(() => {
    // Scroll to the appropriate section based on the URL hash
    const scrollToSection = () => {
      const hash = location.hash;
      if (hash === "#resources" && analysisRef.current) {
        analysisRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#charts" && chartsRef.current) {
        chartsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToSection();
  }, [location]);
  return (
    <ThemeProvider>
    <div className="flex flex-col gap-16 pl-6  dark:bg-colorGradient2">
      <div ref={analysisRef} id="analysis">
<Resources /></div>
{/* <div  className="flex flex-row gap-28" > */}
<Card className="w-11/12 ml-4">
          <CardHeader>
            <CardTitle className=" dark:text-white  text-2xl">Analytics Overview</CardTitle>
            <CardDescription className="dark:text-gray-400 text-xl">Summary of your usage and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading analytics...</div>}>
              <Analytics />
            </Suspense>
          </CardContent>
        </Card>
 {/* <Analytics/> */}
         

     
       
        <div ref={chartsRef} id="charts">
          
        {/* </div> */}
        <BarChartComponent />
        </div>
      </div>

 <div className="dark:bg-colorGradient2 ">
        <Recommendations />
     </div> 

    </ThemeProvider>
 
  );
};

export default Dashboard;
