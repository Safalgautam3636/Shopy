"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function CheckoutPage() {
  const [msg, setMsg] = useState("");
  return (
    <div className="flex justify-center">
      <div>
        <Button onClick={() => setMsg("Purchased")}>TEMPORARY - Confirm checkout and remove from database</Button>
        {msg}
      </div>
    </div>
  );
}

export default CheckoutPage;
