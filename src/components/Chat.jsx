import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket.js';
import { useSelector } from 'react-redux';

const Chat = () => {

  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const user = useSelector(store => store.user);
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-500'>CHAT</h1>
      <div className='flex-1 overflow-scroll p-5'>
        <div className="chat chat-start">
          <div className="chat-image avatar">
          </div>
          <div className="chat-header">
            Robin <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">Heyy! Wassup DAWGGG</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar"></div>
          <div className="chat-header">
            Sydney
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
        {messages.map((msg, index) => {
          return (<div></div>)
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input className='flex-1 border border-gray-500 text-white rounded p-2'></input>
        <button className='btn btn-primary'>Send</button>
      </div>
    </div>)
}

export default Chat