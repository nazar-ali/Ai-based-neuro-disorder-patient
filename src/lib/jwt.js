import jwt from "jsonwebtoken";
import { getAccessTokenFromHeaders } from "./helpers.ts";

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  if (!token || !JWT_SECRET) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};


export const getToken = (req) => {
  const token = getAccessTokenFromHeaders(req);
  return verifyToken(token);
};