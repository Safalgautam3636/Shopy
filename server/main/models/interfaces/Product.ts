interface Product{
    imgUrl:string,
    name: string; //title
    description?: string;
    price: number;
    stockQuantity: number;
    category: string;
    brand?: string;
    ratings: number;
    reviews: number;
}

export default Product;