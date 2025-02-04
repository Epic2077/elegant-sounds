// lib/auth.ts
import jwt from "jsonwebtoken";

export async function verifyToken(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    // Verify token with secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Add database check here
    // const isValid = await checkTokenInDB(token);
    // if (!isValid) throw new Error("Token revoked");

    console.log("Token:", token);
    console.log("Secret:", process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error; // Rethrow for proper error handling
  }
}
