import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function validateToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value.toString();
  const refreshToken = cookieStore.get("refreshToken")?.value.toString();

  try {
    const res = await fetch(`${apiUrl}/user/product-list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.statusCode === 500) {
      try {
        const res = await fetch(`${apiUrl}/auth/refresh`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return data.accessToken;
      } catch (e) {
        console.log(e);
        return "";
      }
    }
    return accessToken;
  } catch (error) {
    console.error("Validate token error:", error);
    return "";
  }
}
