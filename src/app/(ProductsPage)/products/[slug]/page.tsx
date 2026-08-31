import axiosInstance from "@/Hooks/axiosInstance";
import prisma from "@/lib/prisma";
import { Product } from "@/types/product";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // rahat-basic-i8l7252yulxc8krq99eu6cde
  const id = slug.split("-").pop();

  const response = await axiosInstance.get(`/products/${id}`);

  const product: Product = response?.data?.data;

  if (!product) {
    return {
      title: "Product Not Found | ClickMart",
    };
  }

  const description =
    product.description.length > 160
      ? product.description.slice(0, 157) + "..."
      : product.description;

  return {
    title: `${product.title} | ClickMart`,
    description,

    openGraph: {
      title: product.title,
      description,

      images: product.images[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.title,
            },
          ]
        : [],
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  // rahat-basic-i8l7252yulxc8krq99eu6cde
  const id = slug.split("-").pop();

  const response = await axiosInstance.get(`/products/${id}`);

  const product: Product = response?.data?.data;

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.title}</h1>

      <p>{product.description}</p>

      <p>Price: ৳ {product.price}</p>
    </div>
  );
};

export default ProductPage;
