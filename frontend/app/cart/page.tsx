"use client";
import { useContext } from "react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { CartContext } from "@/components/providers/cart-provider";
import Image from "next/image";

function CartPage() {
  const { cartItems, incrementCart, decrementCart, removeItem, getCartTotalPrice } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-2xl font-semibold">Your Cart is Empty</h2>
        <Link href="/">
          <div className="text-blue-500 hover:text-blue-600">Continue Shopping</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-semibold">Your Cart</h2>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.item._id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <Link href={`/${cartItem.item._id}`} className="flex">
              <Image src={cartItem.item.imgUrl} alt={cartItem.item.name} height="100" width="100" />
              <h3 className="ml-2 text-lg font-medium">{cartItem.item.name}</h3>
            </Link>
            <p className="text-md mr-2">{formatPrice(cartItem.item.price)}</p>
            <div className="flex items-center">
              <button
                onClick={() => decrementCart(cartItem.item)}
                className="rounded border border-gray-300 px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="mx-2">{cartItem.quantity}</span>
              <button
                onClick={() => incrementCart(cartItem.item)}
                className="rounded border border-gray-300 px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button onClick={() => removeItem(cartItem.item)} className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Total: {formatPrice(getCartTotalPrice())}</h3>
      </div>
      <Link href="/checkout">
        <div className="mt-4 inline-block rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">Proceed to Checkout</div>
      </Link>
    </div>
  );
}

export default CartPage;
