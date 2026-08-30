import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,

      images: {
        select: {
          url: true,
        },
        take: 1,
      },
    },
  });

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
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,

      images: true,
      colors: true,
      features: true,

      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      },
    },
  });

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