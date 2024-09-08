import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import Auth from "../components/Auth";

const Login = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const previousPathname = location.state?.from;

  const handleSubmit = async ({ email, password }) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.post(
        "https://site--marvel-backend--x8bwsvjswy7s.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        navigate(previousPathname || "/");
      } else {
        alert("Please try again");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setError("Email and/or password are incorrect");
        setIsLoading(false);
      }
      console.error(error.message);
    }
  };

  return (
    <>
      <Auth
        title="Login"
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
