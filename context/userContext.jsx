import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AuthContext=createContext();
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const AuthProvider=({children})=>{

  


  const[token,setToken]=useState(localStorage.getItem("token"));
    const[authUser,setAuthUser]=useState(null);
    
   

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${backend_url}/api/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setAuthUser(data.user || data.newUser);
    } else {
      setAuthUser(null);
    }
  } catch (error) {
    setAuthUser(null);
    toast.error("Failed to verify session.");
  }
};

useEffect(() => {
    checkAuth();
  }, []);



    const login=async (state,credentials)=>{

        try{
            const response= await fetch(`${backend_url}/api/auth/${state}`,{
                method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(credentials)
            }
                );
                const data= await response.json();
              
                
            if(data.success){
                setToken(data.token);
                setAuthUser(data.user || data.newUser);
                localStorage.setItem("token",data.token);
                toast.success(data.message);
                return data;
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const logout=async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("Logged out successfully");
        socket.disconnect();
    }

    const value={
        checkAuth,
        login,
        logout,
        authUser,
        token
    }

    return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    )

}