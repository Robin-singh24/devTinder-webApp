import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../utils/constants.js';

const Login = () => {
    const [email, setEmail] = useState("Robin@gmail.com");
    const [password, setPassword] = useState("Robin@1223");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("Clicked")   // test click

        try {
            const res = await axios.post(
                BASE_URL + "/login", {
                email,
                password,
            },
                { withCredentials: true });
            console.log(res.data)
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-10">

                <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>

                <div>
                    <label className="label text-xl">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="input w-full"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-3">
                    <label className="label text-xl">Password</label>
                    <input
                        type="password"
                        value={password}
                        className="input w-full"
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
