import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
  const fetchToken = async () => {
    const token = localStorage.getItem('token');
    if(token){
      try{
        const jwt_decode = (await import('jwt-decode')).default;
        const decodedToken = jwt_decode(token);
        const userInfo = {
          id: decodedToken.id,
          name: decodedToken.name,
          role: decodedToken.role,
        };
        setUser(userInfo);
        setIsAuthenticated(true);
      }catch(err) {
        console.error("Invalid token", err);
      }
    }
    setLoading(false);
  };
  fetchToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }

  return(
    <UserContext.Provider value={{user, setUser, loading, isAuthenticated, logout}}>
      {children}
    </UserContext.Provider>
  )
};

export {UserContext};
export default UserContext;