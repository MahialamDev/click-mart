import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json({
    success: true,
    data: users,
  });
}

// post user
export async function POST(request: Request) {
    try {
    const body = await request.json();
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
        }
      
    });

      return Response.json({
          success: true,
            data: newUser
      })

  } catch (err) {
    console.log(err);
  }
}
