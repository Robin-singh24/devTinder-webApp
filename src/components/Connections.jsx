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
        <div className='text-center my-10'>
            <h1 className='font-bold text-3xl'>Connections</h1>

            {connections.map((connection) => {
                const {firstName, lastName, photoUrl, about, age} = connection;

                return(
                    <div>
                        <img alt='photo' className='w-40 h-40' src={photoUrl}></img>
                        <h2>{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                    </div>
                ) 
            })}
        </div>


    )
}

export default Connections