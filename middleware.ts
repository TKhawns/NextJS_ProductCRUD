import {NextResponse} from 'next/server'
import { validateToken } from './app/database/validate_token';

export async function middleware() {
    const response = NextResponse.next()
    const newtoken = await validateToken();
    let cookie = response.cookies.set('accessToken', newtoken);
    console.log("New token", newtoken, cookie) 
    return response
}
export const config = {
    matcher: '/home/product',
}