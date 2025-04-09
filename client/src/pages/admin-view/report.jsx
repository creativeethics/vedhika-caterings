import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats } from "../../store/admin/order-slice/index";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";

export default function AdminReportView() {
  const dispatch = useDispatch();
  const { adminStats, statsLoading, statsError } = useSelector((state) => ({
    adminStats: state.adminOrder.adminStats,
    statsLoading: state.adminOrder.statsLoading,
    statsError: state.adminOrder.statsError
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAdminStats());
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  if (statsError) {
    return (
      <div className="p-4 text-red-600">
        Error loading reports: {statsError}
      </div>
    );
  }

  if (!adminStats && !statsLoading) {
    return (
      <div className="p-4 text-yellow-600">
        No report data available
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard Reports</h1>
      
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Orders Card */}
        <Card className="border border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-gray-800">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-3xl font-bold text-gray-900">
                {adminStats?.totalOrders?.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Total Customers Card */}
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-3xl font-bold text-blue-900">
                {adminStats?.totalCustomers?.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>

        
        {/* Delivered Orders Card */}
        <Card className="border border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Delivered Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-3xl font-bold text-green-900">
                {adminStats?.deliveredOrders?.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Progress Orders Card */}
        <Card className="border border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">In Progress Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-3xl font-bold text-yellow-900">
                {adminStats?.inProgressOrders?.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
