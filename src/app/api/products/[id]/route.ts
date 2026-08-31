import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

// get single product
export async function GET(
  request: Request,
  { params }: Props
) {
  try {
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

        take: 1,
      },
    },
    });

    // Product পাওয়া যায়নি
    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: product,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET SINGLE PRODUCT ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}