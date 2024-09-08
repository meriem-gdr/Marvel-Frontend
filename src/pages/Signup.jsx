import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Auth from "../components/Auth";

const Signup = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.post(
        "https://site--marvel-backend--x8bwsvjswy7s.code.run/user/signup",
        {
          email: email,
          password: password,
        }
      );

      console.log("response", response);

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        alert("Something went wrong Please try again");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("This email already has an account");
        setIsLoading(false);
      }
      console.error(error.message);
    }
  };

  return (
    <Auth
      title="Sign up"
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};
export default Signup;
