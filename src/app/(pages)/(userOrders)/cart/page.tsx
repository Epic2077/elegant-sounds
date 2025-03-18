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
import Image from "next/image";

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
      <div className="container mx-auto py-10 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Button asChild variant="outline" className="hover:bg-primary">
          <Link href="/shop/b">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container w-[95%] py-10 mt-10 mx-auto min-h-screen flex flex-col ">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center my-6">
        Your Cart
      </h1>
      <div className="flex flex-row gap-4 mx-auto mb-12 my-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary text-card rounded-full flex justify-center items-center">
            1
          </div>
          <h2 className="text-2xl">Cart Items</h2>
        </div>
        <div className="w-36 h-[2px] bg-muted-foreground"></div>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-card border-2 border-card-foreground text-foreground rounded-full flex justify-center items-center">
            2
          </div>
          <h2 className="text-2xl">checkout</h2>
        </div>
        <div className="w-36 h-[2px] bg-muted-foreground"></div>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-card border-2 border-card-foreground text-foreground rounded-full flex justify-center items-center">
            3
          </div>
          <h2 className="text-2xl">Order Complete</h2>
        </div>
      </div>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto rounded-lg shadow-md mt-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-card">
              <TableHead className="font-semibold text-card-foreground">
                Image
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Product
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Color
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Price
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Total
              </TableHead>
              <TableHead className="font-semibold text-card-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.code} className="hover:bg-secondary">
                <TableCell>
                  <div className="p-2 bg-muted w-max rounded-2xl">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt={item.title}
                    />
                  </div>
                </TableCell>
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
                    className="text-destructive "
                  >
                    <Trash2 className="h-8 w-8" />
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
          <span className="font-semibold text-primary">Subtotal: </span>
          <span className="font-bold text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex space-x-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-destructive ">
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
          <Button asChild className="bg-primary">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
