import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string } >}) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })


    if (!user) {
        return Response.json({
            success: false,
            message: "User not found"
        }, { status: 404 })
    }
    
    return Response.json({
        success: true,
        data: user
    })
}


