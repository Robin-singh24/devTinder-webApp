import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log("Clicked")   // test click

        try {
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password,
            }, 
            { withCredentials: true});
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-10">

                <legend className="fieldset-legend text-3xl text-center">Login</legend>

                <div>
                    <label className="label text-xl">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label text-xl">Password</label>
                    <input
                        type="password"
                        value={password}
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex justify-center mt-4">
                    <button className="btn btn-neutral" onClick={handleLogin}>
                        Login
                    </button>
                </div>

            </fieldset>
        </div>
    )
}

export default Login;
