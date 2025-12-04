import axios from 'axios'
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addFeed } from '../utils/feedSlice.js';
import UserCard from './UserCard.jsx';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getfeed = async () => {
    if (feed && feed.data && feed.data.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      console.log("FULL FEED RESPONSE:", res.data);
      dispatch(addFeed(res.data));

    } catch (error) {
      console.error("Feed error: ", error);
    }
  }

  useEffect(() => {
    getfeed();
  }, []);

  if (!feed?.data || feed.data.length === 0) return (
    <div className='flex justify-center font-bold text-2xl my-10'>
      <h1>No New Users found!!!</h1>
    </div>

  )

  return (
    feed && (
      <div className='flex justify-center mt-4'>
        <UserCard user={feed.data[0]} />
      </div>)
  )
}

export default Feed