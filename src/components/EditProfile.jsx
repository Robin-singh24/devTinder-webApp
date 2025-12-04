import { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';



const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, about, photoUrl
            }, { withCredentials: true });

            dispatch(addUser(res.data.data));
            setShowToast(true);
            const i = setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <>
            <div className='flex justify-center my-10 items-stretch gap-10'>
                <div className='flex justify-center mx-10'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-6 box-border flex flex-col justify-between">
                        <div>
                            <label className="label text-xl">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                className="input w-full"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label text-xl">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                className="input w-full"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label text-xl">Profile Photo</label>
                            <input
                                type="url"
                                value={photoUrl}
                                className="input w-full"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label text-xl">About</label>
                            <textarea
                                value={about}
                                className="textarea w-full h-32 resize-none"
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>


                        <p className='text-red-800 flex justify-center text-sm'></p>
                        <div className="flex justify-center pt-2">
                            <button className="btn btn-neutral" onClick={saveProfile} >
                                Update
                            </button>
                        </div>

                    </fieldset>
                </div>
                <div className='flex'><UserCard user={{ firstName, lastName, about, photoUrl }} /></div>
            </div>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully</span>
                </div>
            </div>)}
        </>
    )
}

export default EditProfile