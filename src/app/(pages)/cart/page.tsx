"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  removeItem,
  clearCart,
  updateQuantity,
} from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// Utility function to format prices as USD
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Button asChild variant="outline" className="hover:bg-gray-100">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-700">
                Product
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Color
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Price
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Total
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.code} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(
                            updateQuantity({
                              code: item.code,
                              quantity: item.quantity - 1,
                            })
                          );
                        }
                      }}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (newQuantity >= 1) {
                          dispatch(
                            updateQuantity({
                              code: item.code,
                              quantity: newQuantity,
                            })
                          );
                        }
                      }}
                      className="w-16 text-center h-8"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            code: item.code,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeItem({ code: item.code }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Subtotal and action buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-lg">
          <span className="font-semibold text-gray-700">Subtotal: </span>
          <span className="font-bold text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex space-x-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Clear Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all items from your cart permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => dispatch(clearCart())}>
                  Clear Cart
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
