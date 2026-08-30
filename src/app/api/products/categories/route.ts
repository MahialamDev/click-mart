import prisma from "@/lib/prisma";



// ==========================================
// GET CATEGORIES
// ==========================================

export async function GET() {
  try {


    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        name: "asc",
      },
    });

    return Response.json(
      {
        success: true,
        message: "Categories fetched successfully.",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// POST CATEGORY
// ==========================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      image,
      isActive = true,
    } = body;

    // ==============================
    // VALIDATION
    // ==============================

    if (!name || !slug) {
      return Response.json(
        {
          success: false,
          message: "Name and slug are required.",
        },
        { status: 400 }
      );
    }

    // ==============================
    // CHECK EXISTING
    // ==============================

    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            slug,
          },
        ],
      },
    });

    if (existingCategory) {
      return Response.json(
        {
          success: false,
          message: "Category with this name or slug already exists.",
        },
        { status: 409 }
      );
    }

    // ==============================
    // CREATE
    // ==============================

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null,
        isActive,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create category.",
      },
      { status: 500 }
    );
  }
}