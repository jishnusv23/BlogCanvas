import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogType } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";

export const addArticle = createAsyncThunk(
  "article/addArticle",
  async (data: BlogType, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = await CLIENT_API.post("/api/add-article", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editArticle = createAsyncThunk(
  "article/editArticle",
  async (data: BlogType, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = await CLIENT_API.post("/api/edit-article", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


