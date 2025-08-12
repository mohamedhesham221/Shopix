"use client";
import * as React from "react";
import { useFetchSingleProduct } from "@/hooks/useFetchSingleProduct";
import ProductImg from "./ProductImg";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";


const SingleProduct = ({ id }) => {
	const { product, isLoading } = useFetchSingleProduct(id);
	return (
		<>
			<div className="flex flex-col md:flex-row justify-evenly items-start gap-10 p-5 md:px-20">
				<ProductImg product={product} isLoading={isLoading}/>
				<ProductDetails product={product} isLoading={isLoading} />
			</div>
			<h3 className="w-fit relative text-xl font-bold font-inter text-red  mx-auto my-10 border-b-3 border-red">
				Reviews
			</h3>
				<ProductReviews product={product} isLoading={isLoading}/>
				<h3 className="w-fit relative text-xl font-bold font-inter text-red  mx-auto my-10 border-b-3 border-red">
				Related Products
			</h3>
			<RelatedProducts product={product} isLoading={isLoading}/>
		</>
	);
};

export default SingleProduct;
