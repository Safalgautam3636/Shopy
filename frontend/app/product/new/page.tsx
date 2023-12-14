"use client";
import { createProduct } from "@/api/product";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { time } from "console";
import { useRouter } from "next/navigation";
import { resolve } from "path";
import React, { useState } from "react";

function NewProductPage() {
  const [imgUrl, setImgIrl] = useState("https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authContext = useAuthContext();
  if (!authContext) {
    return null;
  }
  const { authToken, isAuthenticated, user } = authContext;

  if (!isAuthenticated) {
    return <div>Login Required</div>;
  }

  if (!user?.user?.isAdmin) {
    return <div>Admin only</div>;
  }

  const handleFocus = (e: any) => e.target.select();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      new URL(imgUrl);
    } catch (error) {
      setError("Invalid Image URL");
      return;
    }

    console.log(authToken);

    console.log(typeof category);
    const product: Product = {
      imgUrl,
      name,
      price,
      stockQuantity: quantity,
      category,
      ratings,
      reviews,
    };
    if (!authToken) {
      setError("Auth token not found");
      return;
    }
    try {
      const response = await createProduct(product, authToken).then((res) => res.data);
      console.log(response);
      if (response.message === "Sucess") {
        setError("Added");
        await sleep(2000);
        sleep(1);
        router.push("/");
      } else if (response.error?.details[0].message) {
        if (response.error?.details[0].message === '"name" length must be at least 4 characters long') {
          setError("Name must be at least 4 characters long");
        } else if (response.error?.details[0].message === '"category" length must be at least 3 characters long') {
          setError("Category must be at least 3 characters long");
        } else {
          setError(response.error?.details[0].message);
        }
      } else {
        setError("An unknown error occurred");
      }
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  }
  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label className="flex flex-col">
            Name
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Image URL
            <Input
              type="text"
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgIrl(e.target.value)}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Price
            <Input
              type="number"
              placeholder="Price"
              value={price === 0 ? "" : price.toString()}
              onChange={(e) => setPrice(e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Quantity
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity === 0 ? "" : quantity.toString()}
              onChange={(e) => setQuantity(e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Category
            <Input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Ratings
            <Input
              type="number"
              placeholder="Ratings"
              value={ratings === 0 ? "" : ratings.toString()}
              onChange={(e) => setRatings(e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <label className="flex flex-col">
            Reviews
            <Input
              type="number"
              placeholder="Reviews"
              value={reviews === 0 ? "" : reviews.toString()}
              onChange={(e) => setReviews(e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <Button className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600" disabled={isSubmitting}>
            Add Product
          </Button>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default NewProductPage;
