import {BrowserRouter as Router , Routes , Route , Navigate} from "react-router-dom"
import Users from "./users/pages/Users"
import NewPlace from "./places/pages/NewPlace"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
function App() {

  return (
    <>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
