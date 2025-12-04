import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login", {
                email,
                password,
            }, { withCredentials: true });
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong!!!");
        }
    }

    const handleSignUp = async() => {
        try {
            const res = await axios.post(BASE_URL + "/signup",{
                firstName,
                lastName,
                email,
                password,
            }, {withCredentials:true});
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong!!!");
        }
    }

    return (
        <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full 
            max-w-md border p-4 mx-auto mt-10 ">

                <h2 className="text-3xl font-semibold text-center mb-4">{isLoginForm ? "Login" : "Sign Up"}</h2>

                {!isLoginForm && (<><div>
                    <label className="label text-xl">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        className="input w-full"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                    <div className="mt-3">
                        <label className="label text-xl">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            className="input w-full"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div></>)}
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
                <p className='text-red-800 flex justify-center text-sm'>{error}</p>
                <div className="flex justify-center mt-4">
                    <button className="btn btn-neutral" onClick={isLoginForm ? handleLogin : handleSignUp}>
                        {isLoginForm ? "Login" : "Sign Up"}
                    </button>
                </div>

                <p className='m-auto cursor-pointer py-2' onClick={()=>setIsLoginForm((value) => !value)}>
                    {isLoginForm ? "New User? Click here to Sign Up" : "Existing User? Click here to Login"}
                </p>

            </fieldset>
        </div>
    )
}

export default Login;
