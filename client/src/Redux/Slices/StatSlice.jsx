import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    allUserCount:0,
    subscribedCount:0
};
export const getStatsData = createAsyncThunk ('/stat/get',async()=>{
    try {
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response,{
            loading:"Getting the stats...",
            success:(data) =>{
                return data?.data?.message
            },
            error:"Failed to load data stats"
        });
        error:(await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const statSlice = createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(getStatsData.fulfilled,(state,action)=>{
state.allUserCount =  action?.payload?.allUserCount;
state.subscribedCount =  action?.payload?.subscribedUsersCount;

})
    }
});

export default statSlice.reducer;