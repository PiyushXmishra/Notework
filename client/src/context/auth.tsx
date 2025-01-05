import React, { createContext, useEffect, useState, ReactNode, useCallback, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  profile: string;
  joinedDate: string
}
interface Transcribe {
  id: string
  setSummaryInfo: Dispatch<SetStateAction<Transcribe|null>>
}
interface UserActivity {
  

  thumbnail: string[];
  heading: string[];
  url: string[],
  genre:string[]

}

export const Logout=()=>{
  sessionStorage.clear()
  return <h1> You are logged Out..</h1>
}
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  summaryInfo: Transcribe | null;
  setSummaryInfo: Dispatch<SetStateAction<Transcribe|null>>
  activity: UserActivity | null;
  fetchActivity: () => Promise<void>;
  checkAuth:() => Promise<void>;
  Logout:()=> React.ReactNode
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summaryInfo,setSummaryInfo]= useState<Transcribe| null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=>{
    const  cachedUser=sessionStorage.getItem('user')
    return cachedUser? true : false
  });

  const [user, setUser] = useState<User | null>(()=>{
    const cachedUser = sessionStorage.getItem('user')
    return cachedUser ? JSON.parse(cachedUser):null
  });

const [activity, setActivity] = useState<UserActivity | null>(() => {
    const cachedActivity = sessionStorage.getItem('activity');
    return cachedActivity ? JSON.parse(cachedActivity) : { thumbnail: [], heading: [], url:[] ,genre:[]};
  });
  const navigate = useNavigate()

  
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        credentials: 'include',
      });
      const resp = await response.json();
      console.log(resp)

      if (response.status === 401) {
        if(!isAuthenticated) return
        handleLogout()
         return
      } 
      console.log("checkauth running")
        setIsAuthenticated(true);
        setUser(resp.data);
        sessionStorage.setItem('user', JSON.stringify(resp.data)); // Cache user data
       } catch (error) {
      console.error('Auth check error:', error);
      if(!isAuthenticated) return

      handleLogout()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const fetchActivity = async()=>{
    //  if(!user?.id){
    //   checkAuth()
    //    if(!user?.id) return
    //  }
    try{
    const response = await fetch(`http://localhost:4000/ai/${user?.id}`, {
          method: 'GET',
          credentials: 'include', // Include cookies (with JWT)
        });
  
        if (response.status===401) {
          handleLogout()
          console.log("handleLogout run hua")
           return
        }
       
        console.log("run nhi hua")
        const data = await response.json();
        setActivity(data.data);

        sessionStorage.setItem('activity', JSON.stringify(data.data)); // Cache the data
        
    }catch(error){
      console.error('Error is:',error)
     handleLogout()
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.clear();
    setTimeout(() => navigate("/login"), 1000);
    window.location.reload();
  }  ;

  useEffect(()=>{
    const cachedUser = sessionStorage.getItem('user')
    const cachedActivity = sessionStorage.getItem('activity')
    const newActivity= localStorage.getItem('newactivity')
    if(cachedUser){
     setUser(JSON.parse(cachedUser))
     setIsAuthenticated(true)
     if(cachedActivity){
      const activity=JSON.parse(cachedActivity)

      if(activity?.heading[0] && ((newActivity==='false' )||(!newActivity)) && activity?.url){
        setActivity(JSON.parse(cachedActivity))
        console.log(newActivity)
        return
        
      }
    }
       fetchActivity()
     if(!isAuthenticated) return
    }
    checkAuth()

    // else if (!isAuthenticated){
    //  checkAuth()
    // }
     
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, user ,Logout,checkAuth,activity,summaryInfo,setSummaryInfo, fetchActivity}}>
      {children}
    </AuthContext.Provider>
  );
};

