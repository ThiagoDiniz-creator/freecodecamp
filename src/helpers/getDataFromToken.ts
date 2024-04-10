import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = verify(
      token,
      process.env.JWT_SECRET as string
    );
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err);
  }
};
