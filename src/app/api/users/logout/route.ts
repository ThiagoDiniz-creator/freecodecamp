import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      { message: "Logged out", success: true },
      { status: 200 }
    );

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
