import { useAppSelector } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Utility function to format prices as USD
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <DropdownMenu>
      {/* Trigger: Cart icon with badge */}
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          {cartItems.length > 0 && (
            <div className="absolute top-0 right-0 p-0.5 px-1.5 text-destructive-foreground text-xs bg-destructive rounded-full mt-[-5px] mr-[-5px] flex items-center justify-center">
              {cartItems.length}
            </div>
          )}
          <ShoppingCart className="h-6 w-6 text-primary hover:text-muted-foreground transition-colors" />
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        className="w-72 p-4  shadow-lg border  rounded-lg"
        align="end"
      >
        <DropdownMenuLabel className="text-lg font-semibold text-foreground">
          Your Cart
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-foreground" />

        {/* Empty Cart Case */}
        {cartItems.length === 0 ? (
          <DropdownMenuItem className="flex flex-col items-start cursor-default">
            <span className="text-sm text-muted-foreground">
              Your cart is empty
            </span>
            <Button asChild variant="link" className="p-0 h-auto text-primary">
              <Link href="/shop/b">Shop Now</Link>
            </Button>
          </DropdownMenuItem>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <DropdownMenuItem
                  key={item.code}
                  className="flex justify-between items-center cursor-default py-2"
                >
                  <div className="flex flex-col">
                    <span>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground mt-2">
                      {item.title}
                    </span>

                    <span className="text-xs text-foreground mt-2">
                      {item.quantity} × {formatPrice(item.price)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-bg-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="bg-foreground" />

            {/* Subtotal */}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-semibold text-foreground">
                Subtotal:
              </span>
              <span className="text-sm font-bold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-2 mt-2">
              <Button
                asChild
                variant="outline"
                className="w-full text-sm hover:bg-muted"
              >
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button
                asChild
                className="w-full text-sm bg-primary hover:bg-muted"
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
