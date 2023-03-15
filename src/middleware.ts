import { NextRequest, NextResponse } from 'next/server';
import { setThemeCookie } from './utils/setThemeCookieMiddleware';

export default async function middleware(
  req: NextRequest,
): Promise<NextResponse | never> {
  try {
    const rawResponse = NextResponse.next();

    const responseWithThemeCookie = await setThemeCookie(req, rawResponse);

    return responseWithThemeCookie;
  } catch (e) {
    console.log('MiddleWare Error ', e);
    throw new Error('MiddleWare Error');
  }
}
