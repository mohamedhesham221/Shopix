"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { 
  Package, Calendar, CreditCard, 
  MapPin, User, Phone 
} from "lucide-react";
import { format } from "date-fns";

const ProfileOrderCard = ({ order }) => {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg">
          <span className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary font-inter" />
            Order #{order.orderId?.slice(0, 8)}
          </span>
          <Badge
          className="font-roboto capitalize"
            variant={
              order.paymentStatus === "paid"
                ? "default"
                : order.paymentStatus === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {order.paymentStatus}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {/* Date + Payment */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-gray-600 font-roboto">
            <Calendar className="w-4 h-4" />
            {format(new Date(order.createdAt), "PPP")}
          </span>
          <span className="flex items-center gap-1 text-gray-600 font-roboto">
            <CreditCard className="w-4 h-4" />
            {order.paymentMethod}
          </span>
        </div>

        <Separator />

        {/* Customer Info */}
        <div className="space-y-1">
          <p className="flex items-center gap-2 font-roboto">
            <User className="w-4 h-4 text-gray-500" />
            {order.fullName}
          </p>
          <p className="flex items-center gap-2 font-roboto">
            <Phone className="w-4 h-4 text-gray-500" />
            {order.phoneNumber}
          </p>
          <p className="flex items-center gap-2 font-roboto">
            <MapPin className="w-4 h-4 text-gray-500" />
            {order.streetAddress}, {order.city}, Floor {order.apartmentFloor}
          </p>
        </div>

        <Separator />

        {/* Items */}
        <div className="space-y-3">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded-md border"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium font-roboto">{item.title}</p>
                  <p className="text-xs text-gray-500 font-roboto">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
              <span className="font-semibold font-roboto">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="flex justify-between items-center font-medium">
          <span className="font-roboto">Total</span>
          <span className="text-primary font-roboto">${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOrderCard;
