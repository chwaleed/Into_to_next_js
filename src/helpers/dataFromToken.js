import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const dataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.messsage);
  }
};
