"use client";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "@/components/providers/cart-provider";

function CheckoutPage() {
  const [msg, setMsg] = useState("");
  const { clearCart } = useContext(CartContext);
  return (
    <div className="flex justify-center">
      <div>
        <Button
          onClick={() => {
            setMsg("Purchased");
            clearCart();
          }}
        >
          TEMPORARY - Confirm checkout and remove from database
        </Button>
        {msg}
      </div>
    </div>
  );
}

export default CheckoutPage;
