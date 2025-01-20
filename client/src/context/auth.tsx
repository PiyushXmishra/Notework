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


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  summaryInfo: Transcribe | null;
  setSummaryInfo: Dispatch<SetStateAction<Transcribe|null>>
  activity: UserActivity | null;
  fetchActivity: () => Promise<void>;
  checkAuth:() => Promise<void>;
  logout:()=> void;
  isUserExist:boolean;
  setIsUserExist:Dispatch<SetStateAction<boolean>>;
  isNew:boolean;
  setIsNew:Dispatch<SetStateAction<boolean>>
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summaryInfo,setSummaryInfo]= useState<Transcribe| null>(null)
  const [isNew,setIsNew]=useState(false)
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
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    
    setUser(null);
    setActivity(null);
    sessionStorage.clear();
    navigate('/login');
  }, [navigate]);
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        credentials: 'include',
      });
      const resp = await response.json();
      if(!response.ok) return new Error
        setIsAuthenticated(true);
        setUser(resp.data);
        sessionStorage.setItem('user', JSON.stringify(resp.data));
    // Cache user data
       } catch (error) {
      console.error('Auth check error:', error);

    }
  },[logout]);

  const fetchActivity = useCallback( async()=>{
    if (!user?.id) {
      console.warn('No user ID found, skipping fetchActivity');
      return;
    }
  
    try{
    const response = await fetch(`http://localhost:4000/ai/${user?.id}`, {
          credentials: 'include', 
        });
  
        if (!response.ok) {
          console.log("handleLogout run hua")
           return
        }
       
        const data = await response.json();
        setActivity(data.data);
        sessionStorage.setItem('activity', JSON.stringify(data.data)); 
        
    }catch(error){
      console.error('Error is:',error)
   
    }
  },[user?.id,logout])

  useEffect(() => {
    const cachedUser = sessionStorage.getItem('user');
    const cachedActivity = sessionStorage.getItem('activity');

    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setIsAuthenticated(true);

    }

    if (cachedActivity) {
      console.log("A", isNew)
      setActivity(JSON.parse(cachedActivity));
    } else {
      fetchActivity(); // Fetch activity only if it's not cached
    }
    if(isNew) {
      console.log(isNew)

      fetchActivity()
      setIsNew(false)
    }
    if(!isAuthenticated) checkAuth();
     // Always verify auth status on load
  }, [checkAuth, fetchActivity,isNew]);

// User not logged in
// after user logged in, checkauth should run
// when there is 401 error or user manually logout checkauth should run
// problem: checkauth running on every reload

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, user ,logout,checkAuth,activity,summaryInfo,setSummaryInfo, fetchActivity,isNew,setIsNew}}>
      {children}
    </AuthContext.Provider>
  );
};

