import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

const SignupPage = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState();
    const navigate = useNavigate("");

    const onChangeHandler = (e) => {
        setData({...data, [e.target.name] : e.target.value});
    }

    const handleSignup = async(e) => {
        e.preventDefault();
        setError("");

        if(!data.username || !data.email || !data.password || !data.confirmPassword || data.password !== data.confirmPassword) {
            setError("Every field is required");
            return;
        }

        try{
            const response = await signupUser(data);
            console.log("Signup successful: ", response.data);
            navigate("/login");
        }catch(error){
            console.error("signup error: ", error);
            setError("Signup failed");
        }

    }

        return (
            <div className="h-screen flex items-center justify-center bg-muted/30">

            <div className="w-full max-w-md p-8 rounded-2xl border bg-background shadow-sm">

                <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Create Account</h1>
                <p className="text-sm text-muted-foreground">
                    Sign up to start chatting
                </p>
                </div>

                {error && (
                <p className="text-red-500 text-sm text-center mb-2">
                    {error}
                </p>
                )}

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-4">

                {/* Username */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Username</label>
                    <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={data.username}
                    onChange={onChangeHandler}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Password</label>
                    <input
                    type="password"
                    placeholder="Create a password"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <input
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={onChangeHandler}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                    Create Account
                </button>

                </form>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                Already have an account?{" "}
                <a href="/login">
                <span className="text-blue-500 cursor-pointer hover:underline">
                    Login
                </span>
                </a>
                </p>

            </div>
            </div>
  );
    
}

export default SignupPage;