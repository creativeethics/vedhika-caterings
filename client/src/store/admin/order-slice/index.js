import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  adminStats: null,
  statsLoading: false,
  statsError: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const getAdminStats = createAsyncThunk(
  "/order/getAdminStats",
  async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/orders/get`);
      const orders = response.data.data || [];
      
      // Calculate stats
      const totalCustomers = [...new Set(orders.map(o => o.user?._id))].length;
      const statusCounts = orders.reduce((acc, order) => {
        const status = order.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      // Calculate inProcess orders (confirmed + inProcess + inShipping)
      const inProcessOrders = 
        (statusCounts.confirmed || 0) + 
        (statusCounts.inProcess || 0) + 
        (statusCounts.inShipping || 0);

      return {
        data: {
          totalCustomers,
          undersCount: statusCounts.under || 0,
          deliveredOrders: statusCounts.delivered || 0,
          inProgressOrders: inProcessOrders,
          totalOrders: orders.length,
          pendingOrders: statusCounts.pending || 0,
          confirmedOrders: statusCounts.confirmed || 0
        }
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      }
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getAdminStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.adminStats = action.payload.data;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.error.message;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

// Memoized selectors with transformation logic
export const selectOrderList = createSelector(
  (state) => state.adminOrder.orderList,
  (orderList) => {
    // Sort orders by date (newest first)
    return [...orderList].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
);

export const selectOrderDetails = createSelector(
  (state) => state.adminOrder.orderDetails,
  (orderDetails) => {
    if (!orderDetails) return null;
    // Calculate order total
    const total = orderDetails.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    return {
      ...orderDetails,
      total
    };
  }
);

export const selectAdminStats = createSelector(
  (state) => state.adminOrder.adminStats,
  (adminStats) => {
    if (!adminStats) return null;
    // Calculate completion percentage
    const completionRate = adminStats.totalOrders > 0 
      ? Math.round((adminStats.deliveredOrders / adminStats.totalOrders) * 100)
      : 0;
    return {
      ...adminStats,
      completionRate
    };
  }
);

export default adminOrderSlice.reducer;
