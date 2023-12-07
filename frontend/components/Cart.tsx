"use client";
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";

function Cart() {
  // TODO: add dynamic values
  const { theme } = useTheme();
  const itemCount = 0;
  const shippingFee = 0;
  const transactionFee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center p-2">
        <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 dark:text-gray-400 group-hover:dark:text-gray-500">
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className="sm:mex-w-lg flex w-full flex-col pr-0">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">{/*TODO: cart logic*/}Cart Items</div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
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
              <div aria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
                {theme === "dark" ? <div>Empty</div> : <Image src="/hippo-empty-cart.png" fill alt="empty shopping cart hippo" />}
              </div>
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
