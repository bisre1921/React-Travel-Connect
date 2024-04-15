import {BrowserRouter as Router , Routes , Route , Navigate} from "react-router-dom"
import Users from "./users/pages/Users"
import NewPlace from "./places/pages/NewPlace"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPlaces"
import UpdatePlace from "./places/pages/UpdatePlace"
import Auth from "./users/pages/Auth"
function App() {

  return (
    <>
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
    </>
  )
}

export default App
