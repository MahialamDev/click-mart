import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // payload
    const {productId, quantity=1 } = await request.json();

    // validate cart and productid
    if (!productId) {
      return Response.json({
        success: false,
        message: "cartItem or ProductId Require",
      });
    }

    // if not user return
    const user = await getCurrentUser();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 401 },
      );
    }
    const userId = user?.id;

    // find users cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // if user have not cart then create new cart
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // find existing item
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    let result;

    if (existingItem) {
      result = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },

        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      result = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    // Final success response
    return Response.json(
      {
        success: true,
        message: "Product added to cart successfully",
        data: result,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message: "Failed to add product to cart",
      },
      {
        status: 500,
      },
    );
  }
}




// ==============================
// GET USER CART
// GET /api/cart
// ==============================



export async function GET() {
  try {
    // বর্তমান logged-in user
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // শুধু Cart page-এর প্রয়োজনীয় data
    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },

      select: {
        id: true,

        items: {
          select: {
            id: true,
            quantity: true,

            product: {
              select: {
                id: true,
                title: true,
                price: true,
                originalPrice: true,
                sku: true,

                images: {
                  select: {
                    url: true,
                  },

                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    // Cart না থাকলে
    if (!cart) {
      return Response.json({
        success: true,
        message: "Cart is empty",
        data: {
          items: [],
        },
      });
    }

    return Response.json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch cart",
      },
      {
        status: 500,
      },
    );
  }
}