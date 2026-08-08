import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// post user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // If user already exists, return a 409 Conflict response
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 },
      );
    }
    // If user does not exist, create a new user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(body)
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        imageUrl: body.imageUrl,
      },
    });

    // Return a success response with the newly created user
    return Response.json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message: "Failed to create user",
      },
      { status: 500 },
    );
  }
}
