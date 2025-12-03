import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {

  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) =>{
    try {
      const res = await axios.post(BASE_URL+ "/request/review/" + status + "/" + _id,
        {},
        {withCredentials:true},
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  } 

  const fetchRequests = async () => {
    try {

      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data))

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1 className='font-bold text-3xl flex justify-center'>No Requests Found</h1>

  return (
    <div className='text-center my-10 '>
      <h1 className='font-bold text-3xl'>Pending Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } = request;

        return (
          <div key={_id}
            className="flex items-center shadow-sm w-2/3 mx-auto my-6 p-4 bg-base-100 rounded-xl">
            <figure>
              <img
                alt="photo"
                src={photoUrl}
                className='w-30 h-30 rounded-2xl'>
              </img>
            </figure>
            <div className="text-left mx-4">
              <h2 className="card-title text-2xl">{firstName + " " + lastName}</h2>
              {age && gender && (<p>{age + ", " + gender}</p>)}
              <p>{about}</p>
            </div>
            <div className='flex ml-auto items-center'>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2"onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>)
      })}
    </div>
  )
}

export default Requests