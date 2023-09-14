import { getAuthSession } from "@/lib/auth";
import { ProfileColor } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { colorSchema } from "@/lib/schemas";



export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const payload = colorSchema.safeParse(req.body);

  if (!payload.success) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        profileColor: payload.data.color,
      },
    });

    return new Response(
      `Fargen har blitt oppdatert for ${
        session.user.email || session.user.name || session.user.id
      }`,
      { status: 200 }
    );
  } catch (e) {
    return new Response("Noe gikk galt", { status: 500 });
  }
};
