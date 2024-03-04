import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initial_state = {
  user: null,
  isAuthenicated: false,
};
function authReducer(state, { type, payload }) {
  switch (type) {
    case "login":
      return { user: payload, isAuthenicated: true };
    case "logout":
      return { user: null, isAuthenicated: false };
    default:
      throw new Error("unknown action Error");
  }
}
const fake_user = {
  name: "parnia",
  email: "parniiiiia.mohammadi@gmail.com",
  password: "1234",
};

const authContext = createContext();
export default function AuthProvider({ children }) {
  const [{ user, isAuthenicated }, dispatch] = useReducer(
    authReducer,
    initial_state
  );
  const navigate = useNavigate();
  function login(user) {
    if (fake_user.email == user.email && fake_user.password == user.password) {
      dispatch({ type: "login", payload: fake_user });
      navigate("/");
    }
    if (fake_user.email != user.email || fake_user.password != user.password)
      alert("Email-address or Password is not correct");
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <authContext.Provider value={{ user, isAuthenicated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
