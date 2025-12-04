import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useDispatch } from 'react-redux';
import { removeUserFromfeed } from '../utils/feedSlice.js';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user ?? {};
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromfeed(userId));
        } catch (error) {
            console.error("Error sending request:", error);
        }
    }

    return (
        <div className="card flex bg-base-200 w-96 shadow-sm h-[550px]">
            <figure className="overflow-hidden">
                <img
                    src={photoUrl || "/placeholder.png"}
                    alt="photo"
                    className="w-full h-full object-cover" />
            </figure>
            <div className="card-body flex flex-col justify-between">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard