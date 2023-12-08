"use client";
import { CartContext } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

function CheckoutPage() {
  const { clearCart } = useContext(CartContext);
  return (
    <div className="flex justify-center">
      <div>
        <Button onClick={() => clearCart()}>TEMPORARY - Confirm checkout and remove from database</Button>
      </div>
    </div>
  );
}

export default CheckoutPage;
