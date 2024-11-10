import { createAsyncThunk } from "@reduxjs/toolkit";
import {  Blog } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";

export const addArticle = createAsyncThunk(
  "article/addArticle",
  async (data: Blog, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = await CLIENT_API.post("/add-article", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
