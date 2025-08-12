"use client";

import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const ProductImg = ({product,isLoading}) => {
	const [selectedImage, setSelectedImage] = React.useState(null);

	return (
		<>
			<div className="flex flex-col gap-y-2 justify-center items-center w-full md:w-1/2">
				{/**Main image */}
				{isLoading ? (
					<Skeleton className="w-[350px] h-[300px]" />
				) : (
					<div className="bg-[#f5f5f5] w-full flex justify-center">
						<Image
							src={!selectedImage ? product?.images[0] : selectedImage}
							alt={product?.title}
							width={300}
							height={300}
							className="w-100"
						/>
					</div>
				)}
				{/**images */}
				<div className="flex flex-wrap gap-2.5 justify-between items-center">
					{isLoading
						? Array.from({ length: 4 }).map((_, idx) => (
								<Skeleton className="w-[80px] h-[80px]" key={idx} />
						  ))
						: product?.images?.map((img, idx) => {
								return (
									<button key={idx} onClick={() => setSelectedImage(img)}>
										<Image
											src={img}
											alt={`${product.title}'s thumbnail`}
											width={80}
											height={80}
											className="cursor-pointer bg-[#f5f5f5] rounded-lg w-full"
										/>
									</button>
								);
						  })}
				</div>
			</div>
		</>
	);
};

export default ProductImg;
