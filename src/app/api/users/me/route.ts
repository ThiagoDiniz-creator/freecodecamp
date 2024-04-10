import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = getDataFromToken(request);
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
