import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};
export const getAllCourses = createAsyncThunk("./course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "loading course data...",
      success: "courses loaded successfully",
      error: "failed to get course",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const deleteCourse = createAsyncThunk("./course/delete", async () => {
  try {
    const response = axiosInstance.delete(`/courses/${id}`);
    toast.promise(response, {
      loading: "deleting course ...",
      success: "courses deleted successfully",
      error: "failed to delete the course",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk("course/create",async(data)=>{
  try {
    let formData = new FormData();
    formData.append("title",data?.title);
    formData.append("description",data?.title);
    formData.append("category",data?.title);
    formData.append("thumbnail",data?.title);
    formData.append("createdy",data?.title);
    

    const response = axiosInstance.post("/courses",formData)
    toast.promise(response,{
      loading:"Creating new course",
      success:"Course created success",
      error:"Failed to create course"
    });
    return (await response).data

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
