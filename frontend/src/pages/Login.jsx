import { useState } from 'react';
import { loginUser } from '../services/api'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setError("");

        if (!data.email || !data.password) {
            setError("Every field is required");
            return;
        }

        try{
            const response = await loginUser(data);
            navigate("/dashboard");
            console.log("Login successful:", response.data);
        } catch(err) {
            setError("Invalid credentials");
            console.error(err);
        }

    }

    return (
      <form onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={onChangeHandler}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={onChangeHandler}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
