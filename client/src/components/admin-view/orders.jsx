import { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderList, selectOrderDetails } from "../../store/admin/order-slice";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "../../store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const orderList = useSelector(selectOrderList);
  const orderDetails = useSelector(selectOrderDetails);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const filteredOrders = useMemo(() => {
    if (!orderList || searchTerm === "") return [...orderList].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    return [...orderList].filter(order => {
      // Search by ID
      if (order._id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      // Search by status
      if (order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      // Search by amount (exact match)
      if (order.totalAmount.toString().includes(searchTerm)) {
        return true;
      }
      
      // Search by date (any part of date string)
      const orderDateStr = new Date(order.orderDate).toLocaleString();
      if (orderDateStr.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      return false;
    }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }, [orderList, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by ID, status, amount or date..."
            className="border rounded p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0
              ? filteredOrders.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>
                      {new Date(orderItem?.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-900"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : orderItem?.orderStatus === "delivered"
                            ? "bg-green-500"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
