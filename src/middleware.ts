import { NextRequest, NextResponse } from 'next/server';
import { setThemeCookie } from './utils/setThemeCookie.middleware';

export default async function middleware(
  req: NextRequest,
): Promise<NextResponse | never> {
  const rawResponse = NextResponse.next();

  const responseWithThemeCookie = setThemeCookie(req, rawResponse);
  try {
    return responseWithThemeCookie;
  } catch (e) {
    console.log('MiddleWare Error ', e);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
