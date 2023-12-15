"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { CartContext } from "./providers/cart-provider";
import { useContext } from "react";
import { ScrollArea } from "./ui/scroll-area";

function Cart() {
  // TODO: add dynamic values
  const { theme } = useTheme();
  const { cartItems, getCartTotalPrice, getCartTotalQuantity, incrementCart, decrementCart, removeItem } = useContext(CartContext);
  const shippingFee = 0;
  const transactionFee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center">
        <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 dark:text-gray-400 group-hover:dark:text-gray-500">
          {getCartTotalQuantity()}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({getCartTotalQuantity()})</SheetTitle>
        </SheetHeader>
        {getCartTotalQuantity() > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* Cart Items */}
              <ScrollArea className="h-[500px]">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.item._id} className="flex items-center space-x-4 py-2">
                    <Link href={`/${cartItem.item._id}`}>
                      <div className="flex-shrink-0">
                        <Image src={cartItem.item.imgUrl} alt={cartItem.item.name} width={50} height={50} />
                      </div>
                    </Link>
                    <Link href={`/${cartItem.item._id}`}>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium">{cartItem.item.name.slice(0, 50)}</span>
                        <span className="text-sm">{formatPrice(cartItem.item.price)}</span>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Qty:</span>
                        <button
                          className="rounded border border-gray-300 p-1 text-xs text-gray-500 dark:bg-white"
                          onClick={() => decrementCart(cartItem.item)}
                        >
                          -
                        </button>
                        <span className="text-sm">{cartItem.quantity}</span>
                        <button
                          className="rounded border border-gray-300 p-1 text-xs text-gray-500 dark:bg-white"
                          onClick={() => incrementCart(cartItem.item)}
                        >
                          +
                        </button>
                        <button
                          className="rounded border border-gray-300 p-1 text-xs text-gray-500 dark:bg-white"
                          onClick={() => removeItem(cartItem.item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            {/* Pricing Details */}
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Subtotal</span>
                  <span>{formatPrice(getCartTotalPrice())}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(transactionFee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link href="/cart" className={buttonVariants({ className: "w-full" })}>
                    Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <>
            <div className="space--y1 flex h-full flex-col items-center justify-center">
              {theme === "dark" ? (
                ""
              ) : (
                <div aria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
                  <Image src="/hippo-empty-cart.png" fill alt="empty shopping cart hippo" />
                </div>
              )}
              <div className="text-xl font-semibold">Your cart is empty</div>
              <SheetTrigger asChild>
                <Link href="/" className={buttonVariants({ variant: "link", size: "sm", className: "text-small text-muted-foreground" })}>
                  Add items to your cart
                </Link>
              </SheetTrigger>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
