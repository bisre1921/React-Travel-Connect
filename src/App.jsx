import {BrowserRouter as Router , Routes , Route , Navigate} from "react-router-dom"
import Users from "./users/pages/Users"
import NewPlace from "./places/pages/NewPlace"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPlaces"
import UpdatePlace from "./places/pages/UpdatePlace"
import Auth from "./users/pages/Auth"
import  AuthContext  from "./shared/Context/AuthContext"
import { useState } from "react"
import { useCallback } from "react"
function App() {

  const [token , setToken] = useState(false);
  const [userId , setUserId] = useState(false);

  const login = useCallback((uid , token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData" , 
      JSON.stringify({
        userId : uid , 
        token : token
      })
    );
    
  } , []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  } , []);

  let routes;
  if(token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    )
  }

  return (
    <>
    <AuthContext.Provider value={{
      isLoggedIn : !!token , 
      token : token ,
      userId : userId ,
      login : login , 
      logout : logout
    }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
    </>
  )
}

export default App
