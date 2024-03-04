import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenicated, login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login({ email, password });
  };
  useEffect(()=>{
    if(isAuthenicated) navigate("/", {replace:true})},[isAuthenicated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login :</h2>
      <form onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email" name="email" id="email">
            Email :
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
