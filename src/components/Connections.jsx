import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';

import { addConnection } from '../utils/connectionSlice'

const Connections = () => {

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {

            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res.data.data)
            dispatch(addConnection(res.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className='font-bold text-3xl'>No Connections Found</h1>

    return (
        <div className='text-center my-10 '>
            <h1 className='font-bold text-3xl'>Connections</h1>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, about, age, gender } = connection;

                return (
                    <div className="flex bg-base-100 shadow-sm w-1/2 mx-auto my-6">
                        <figure>
                            <img
                                alt="photo"
                                src={photoUrl}
                                className='w-30 h-30 rounded-2xl'>
                            </img>
                        </figure>
                        <div className="text-left mx-4">
                            <h2 className="card-title text-2xl">{firstName+ " " + lastName}</h2>
                            {age && gender &&(<p>{age+ ", " + gender}</p>)}
                            <p>{about}</p>
                        </div>
                    </div>)
            })}
        </div>


    )
}

export default Connections