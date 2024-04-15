import {BrowserRouter as Router , Routes , Route , Navigate} from "react-router-dom"
import Users from "./users/pages/Users"
import NewPlace from "./places/pages/NewPlace"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPlaces"
import UpdatePlace from "./places/pages/UpdatePlace"
import Auth from "./users/pages/Auth"
import { AuthContext } from "./shared/Context/AuthContext"
import { useState } from "react"
import { useCallback } from "react"
function App() {

  const [isLoggedIn , setIsLoading] = useState(false);

  const login = useCallback(() => {
    setIsLoading(true);
  } , []);

  const logout = useCallback(() => {
    setIsLoading(false);
  } , [])

  return (
    <>
    <AuthContext.Provider value={{
      isLoggedIn : isLoggedIn , 
      login : login , 
      logout : logout
    }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
    </>
  )
}

export default App
