import prisma from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      brand,
      categoryId,
      costPrice,
      price,
      originalPrice,
      discount,
      description,
      sku,
      stock,
      images,
      colors,
      features,
      addedById,
    } = body;

    // Required field validation
    if (
      !title ||
      !price ||
      !sku ||
      !description ||
      !addedById ||
      !categoryId
    ) {
      return Response.json(
        {
          success: false,
          message: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    // Check SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku,
      },
    });

    if (existingProduct) {
      return Response.json(
        {
          success: false,
          message: "Product with this SKU already exists.",
        },
        { status: 409 }
      );
    }

    // Check user exists
    const user = await prisma.user.findUnique({
      where: {
        id: addedById,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Check categories exist

    const id = createId();

    // slug generate
    function slugify(text: string) {
    return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
    const slug = `${slugify(title)}-${id}`;

    // Create product
    const product = await prisma.product.create({
      data: {
        id,
        title,
        slug,
        brand,
        costPrice,
        price,
        originalPrice,
        discount,
        description,
        sku,
        stock: stock ?? 0,

        // Product → Category relation
          category: {
              connect: {
                id: categoryId
              },
          },

        // Product → User relation
        addedBy: {
          connect: {
            id: addedById,
          },
        },

        // Product Images
        images: {
          create:
            images?.map(
              (
                image: {
                  url: string;
                  alt?: string;
                  sortOrder?: number;
                },
                index: number
              ) => ({
                url: image.url,
                alt: image.alt,
                sortOrder: image.sortOrder ?? index,
              })
            ) ?? [],
        },

        // Product Colors
        colors: {
          create:
            colors?.map(
              (color: {
                name: string;
                className?: string;
              }) => ({
                name: color.name,
                className: color.className,
              })
            ) ?? [],
        },

        // Product Features
        features: {
  create:
    features?.map(
      (
        feature: {
          title: string;
        },
        index: number
      ) => ({
        title: feature.title,
        sortOrder: index,
      })
    ) ?? [],
},
      },

      // Return created relations
      include: {
        category: true,
        images: true,
        colors: true,
        features: true,
        addedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json(
      {
        success: true,
        message: "Product created successfully.",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}

// get 


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const categoryId = searchParams.get("categoryId") || "";

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    // ================================
    // WHERE CONDITION
    // ================================

    const where = {
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                brand: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                sku: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),

      ...(categoryId
        ? {
            categoryId,
          }
        : {}),
    };

    // ================================
    // GET PRODUCTS + TOTAL COUNT
    // ================================

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,

        include: {
          category: true,

          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          colors: true,

          features: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          addedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.product.count({
        where,
      }),
    ]);

    // ================================
    // PAGINATION
    // ================================

    const totalPages = Math.ceil(totalProducts / limit);

    return Response.json(
      {
        success: true,
        message: "Products fetched successfully.",
        data: products,

        pagination: {
          currentPage: page,
          limit,
          totalProducts,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}