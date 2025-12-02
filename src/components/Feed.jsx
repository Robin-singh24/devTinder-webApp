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
      dispatch(addFeed(res.data));

    } catch (error) {
      console.error("Feed error: ", error);
    }
  }

  useEffect(() => {
    getfeed();
  }, [])

  return (
    feed && (
      <div className='flex justify-center mt-4'>
        <UserCard user={feed.data[2]} />
      </div>)
  )
}

export default Feed