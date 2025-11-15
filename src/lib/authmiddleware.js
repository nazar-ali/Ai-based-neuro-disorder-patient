import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function authMiddleware(handler) {
  return async (req) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];

      if (!token) {
        return new Response("Unauthorized", { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      return handler(req);
    } catch (err) {
      return new Response("Invalid Token", { status: 403 });
    }
  };
}



