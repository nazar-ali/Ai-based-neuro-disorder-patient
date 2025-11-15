import { authMiddleware } from "@/lib/authMiddleware";
import { allowRoles } from "@/lib/roleMiddleware";

async function POST_Handler() {
  return Response.json({ message: "Admin access OK" });
}

export const POST = authMiddleware(allowRoles(["admin"])(POST_Handler));
