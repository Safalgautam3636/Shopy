"use client";
import { getProductById, updateProduct } from "@/api/product";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditProductPage() {
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const { authToken, isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (productId) {
      getProductById(productId)
        .then((res) => {
          const productData = res.data.product;
          if (productData) {
            setImgUrl(productData.imgUrl);
            setName(productData.name);
            setPrice(productData.price);
            setQuantity(productData.stockQuantity);
            setCategory(productData.category);
            setRatings(productData.ratings);
            setReviews(productData.reviews);
          } else {
            throw new Error("Product Not Found");
          }
        })
        .catch((err) => {
          console.log("Error fetching product:", err);
          setError(err.message || "An error occurred while fetching product data");
        });
    }
  }, [productId]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mb-4">You must be logged in to view this page.</p>
      </div>
    );
  }

  if (!user?.user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mb-4">You must be an admin to view this page.</p>
      </div>
    );
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

    const productData: Product = {
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
      const response = await updateProduct(productId, productData, authToken).then((res) => res.data);
      console.log(response);
      if (response.status === true) {
        router.push(`/product/${productId}`);
      } else if (response.message === "You have to be an admin for this operation!") {
        setError("Error: must be admin to perform update");
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
        <h2 className="text-center text-2xl font-bold">Update Product</h2>
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
              onChange={(e) => setImgUrl(e.target.value)}
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
              value={price.toString()}
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
              value={quantity.toString()}
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
              value={ratings.toString()}
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
              value={reviews.toString()}
              onChange={(e) => setReviews(e.target.value === "" ? 0 : Number(e.target.value))}
              onFocus={handleFocus}
              required
              className="mt-1"
              disabled={isSubmitting}
            />
          </label>
          <Button className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600" disabled={isSubmitting}>
            Update Product
          </Button>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default EditProductPage;
