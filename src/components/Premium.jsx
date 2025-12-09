import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants'

const Premium = () => {

    const handleBuyClick = async (type) => {

        const order = await axios.post(BASE_URL + "/payment/create",
            {
                membershipType: type
            },
            {
                withCredentials: true
            });

        const { amount, keyId, currency, notes, orderId } = order.data;

        const options = {
            key: keyId,
            amount,
            currency,
            name: "Dinder",
            description: "Connect to other people via Premium",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.email,
            },
            theme: {
                color: "#F37254",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    };

    return (
        <div className='m-10 flex justify-center'>
            <div className="flex w-full flex-col lg:flex-row p-15">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Perks of being a Premium Member: </h1>
                    <div className='text-center'>
                        <ul>
                            <li>- Send Unlimited Likes</li>
                            <li>- get verified</li>
                            <li>- Get Priority Likes</li>
                            <li>- Send as many Messages you want to send</li>
                        </ul>
                    </div>
                    <button onClick={() => handleBuyClick("premium")} className='flex justify-center btn btn-primary'>Buy Premium</button>
                </div>
            </div>
        </div>
    )
}

export default Premium