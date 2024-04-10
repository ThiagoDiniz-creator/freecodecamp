import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(response: NextResponse) {
  const { email, password } = (await response.json()) as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Please fill in all fields" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const jwt = JsonWebToken.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const res = NextResponse.json({ success: true, user }, { status: 200 });

  res.cookies.set("token", jwt, {
    httpOnly: true,
  });

  return res;
}
