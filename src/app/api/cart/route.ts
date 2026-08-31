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
