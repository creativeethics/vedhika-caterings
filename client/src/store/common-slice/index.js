import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch Feature Images
export const getFeatureImages = createAsyncThunk(
  "feature/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/common/feature/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch images");
    }
  }
);

// Add Feature Image
export const addFeatureImage = createAsyncThunk(
  "feature/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/common/feature/add`,
        { image }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add image");
    }
  }
);

// Remove Feature Image
export const removeFeatureImage = createAsyncThunk(
  "feature/removeFeatureImage",
  async (imageId, { rejectWithValue }) => {
    if (!imageId) {
      return rejectWithValue("Invalid image ID");
    }
    
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/common/feature/remove/${imageId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete image");
    }
  }
);

const commonSlice = createSlice({
  name: "commonFeature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload?.data || [];
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload?.data);
      })
      .addCase(removeFeatureImage.fulfilled, (state, action) => {
      state.featureImageList = state.featureImageList.filter(
        (image) => image._id !== action.payload?.data?.id
      );

      });
  },
});

export default commonSlice.reducer;
