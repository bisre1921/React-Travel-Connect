import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userId : null,
  token : token ,
  login: () => {},
  logout: () => {}
});

export default AuthContext;
