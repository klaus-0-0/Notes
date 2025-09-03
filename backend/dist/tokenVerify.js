// utils/auth.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const getUserIdFromToken = (authHeader) => {
    console.log("suthheader", authHeader);
    const token = authHeader?.split(" ")[1]?.replace(/^"|"$/g, "");
    console.log("token = ", token);
    if (!token)
        return { userId: null, error: "Token missing" };
    try {
        const decoded = jwt.decode(token);
        if (decoded) {
            console.log("Decoded JWT payload:", decoded);
        }
        else {
            console.log("Failed to decode token");
        }
        const secret = process.env.TOKEN;
        console.log("secret = ", secret);
        if (!secret)
            return { userId: null, error: "JWT secret missing" };
        const payload = jwt.verify(token, secret);
        const userId = payload && typeof payload === "object" ? payload.userId : undefined;
        if (!userId)
            return { userId: null, error: "User ID not found in token" };
        return { userId };
    }
    catch {
        return { userId: null, error: "Invalid or expired token" };
    }
};
