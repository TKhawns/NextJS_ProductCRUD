import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const temp = await req.json();

    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: temp.email,
        password: temp.password,
      }),
    });

    const data = await res.json();

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("ERROR");
  }
}
