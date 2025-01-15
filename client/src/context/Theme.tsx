import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
interface Theme{
  setDarkMode:Dispatch<SetStateAction<boolean>>
  darkMode: boolean;
  themeSwitch:()=>void;


}



export const ThemeButton = createContext<Theme | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) =>{
 
  const [darkMode,setDarkMode]= useState(()=>{
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'?true:false;
  }) 

  const themeSwitch=()=>{
    setDarkMode(prevMode=>{
      const newTheme=!prevMode;
      localStorage.setItem('theme', newTheme ? 'dark':'light')
      return newTheme
    })
  }
  useEffect(() => {
    if(darkMode){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')

    }
  

  }, [darkMode])
  
  
    return (
      
        <ThemeButton.Provider value={{darkMode,themeSwitch,setDarkMode}}> {children}</ThemeButton.Provider>
        
    )
}



