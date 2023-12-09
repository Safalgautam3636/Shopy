"use client";
import { createProduct } from "@/api/product";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { resolve } from "path";
import { useState } from "react";

function NewProductPage() {
  const [imgUrl, setImgIrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [error, setError] = useState("");
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

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(authToken);
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
    const response = await createProduct(product, authToken).then((res) => res.data);
    console.log(response);
    if (response.message === "Sucess") {
      setError("Added");
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div>Add Product</div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              Name
              <Input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              Image URL
              <Input type="text" placeholder="image url" value={imgUrl} onChange={(e) => setImgIrl(e.target.value)} required />
            </div>
            <div>
              Price
              <Input type="number" placeholder="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
            </div>
            <div>
              Quantity
              <Input type="number" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
            </div>
            <div>
              Category
              <Input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
              Ratings
              <Input type="number" placeholder="ratings" value={ratings} onChange={(e) => setRatings(Number(e.target.value))} required />
            </div>
            <div>
              Reviews
              <Input type="number" placeholder="reviews" value={reviews} onChange={(e) => setReviews(Number(e.target.value))} required />
            </div>
            <Button>Add Product</Button>
          </form>
          {error}
        </div>
      </div>
    </div>
  );
}

export default NewProductPage;
