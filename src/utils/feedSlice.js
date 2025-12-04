import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed: (state,action) => {
            return action.payload;
        },
        removeUserFromfeed: (state, action) => {
            const newFeed = state.filter(user=>user._id !== action.payload);
            return newFeed;
        }
    }
});

export const {addFeed, removeUserFromfeed} = feedSlice.actions;
export default feedSlice.reducer; 